import { useState, useEffect, useMemo, useRef } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@lib/firebase";
import dynamic from "next/dynamic";
import Image from "next/image";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

// Hoist static pulse waveform offsets to prevent re-allocation on every interval tick.
const PULSE_WAVEFORM_OFFSETS = [
  { dt: 0, y: 64 }, { dt: 5, y: 168 }, { dt: 10, y: 220 }, { dt: 15, y: 350 },
  { dt: 20, y: 550 }, { dt: 25, y: 880 }, { dt: 30, y: 520 }, { dt: 35, y: 320 },
  { dt: 40, y: 150 }, { dt: 45, y: 80 }, { dt: 50, y: 50 }, { dt: 55, y: 20 },
  { dt: 60, y: 10 }, { dt: 65, y: 15 }, { dt: 70, y: 10 }, { dt: 75, y: -10 },
  { dt: 80, y: -50 }, { dt: 85, y: -150 }, { dt: 90, y: -350 }, { dt: 95, y: -750 },
  { dt: 100, y: -1150 }, { dt: 105, y: -1520 }, { dt: 110, y: -1150 }, { dt: 115, y: -650 },
  { dt: 120, y: -350 }, { dt: 125, y: -150 }, { dt: 130, y: -80 }, { dt: 135, y: -50 },
  { dt: 140, y: -20 }, { dt: 145, y: -30 }, { dt: 150, y: -20 }, { dt: 155, y: -40 },
  { dt: 160, y: -30 }, { dt: 165, y: -40 },
];

export default function ECGMonitor() {
  // Consolidate device data into a single state to minimize re-renders during Firestore updates.
  const [device, setDevice] = useState({ data: {}, status: false });
  const [ecgData, setECGData] = useState([{ x: Date.now(), y: 0 }]);

  // Use ref to track pulse without triggering interval resets
  const pulseRef = useRef(0);

  useEffect(() => {
    const docRef = doc(db, "devices", "0001");

    // Get real-time updates (onSnapshot handles initial data too)
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const docData = doc.data();
        setDevice({ data: docData, status: docData.status });
        pulseRef.current = docData.pulse;
      } else {
        console.log("No such document!");
      }
    });
    return () => unsubscribe();
  }, []);

  const options = useMemo(() => ({
    chart: {
      id: "realtime",
      height: 450,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      range: 60 * 60,
      labels: { show: true },
      categories: [""],
    },
    yaxis: { max: 1000, min: -1600, tickAmount: 25 },
    legend: { show: false },
    stroke: { curve: "smooth" },
    markers: { size: 0 },
  }), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const pulse = pulseRef.current;
      const now = Date.now(); // Call Date.now() once per interval for efficiency

      setECGData((prevECGData) => {
        let newECGData;

        if (pulse >= -300 && pulse <= 300) {
          newECGData = [...prevECGData, { x: now, y: 0 }];
        } else if (pulse > 600) {
          // Use pre-calculated waveform offsets to avoid array and object re-creation overhead.
          const pulseArray = PULSE_WAVEFORM_OFFSETS.map(offset => ({
            x: now + offset.dt,
            y: offset.y
          }));
          newECGData = [...prevECGData, ...pulseArray];
        } else {
          return prevECGData;
        }

        // Keep buffer size limited to prevent memory bloat and slow renders.
        if (newECGData.length > 1000) {
          return newECGData.slice(-1000);
        }
        return newECGData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []); // Stable interval, no churn

  return (
    <>
      <div className="px-8">
        <p>
          Device status:{" "}
          <span className="text-green-500">
            {device.status ? "Online" : "Offline"}
          </span>
        </p>
      </div>

      {!device.status && (
        <div className="fixed flex md:p-0 p-2 flex-col insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 md:mx-auto flex justify-between items-center flex-col w-auto md:w-1/4 h-auto rounded-lg shadow-xl p-2 bg-gray1 dark:bg-gray6">
            <h1 className="text-base mt-2 mx-4 text-gray7 font-semibold text-center">
              Device is offline
            </h1>
            <p className="mx-4 pb-8">
              Please make sure your device is connected to WiFi.
            </p>
            <Image
              src="/offline.gif"
              alt="Device offline animation"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      <div className="w-full h-full py-2">
        <div className="flex flex-col md:flex-row gap-4 mx-2 md:mx-8 text-gray6 dark:text-gray1">
          <div className="basis-3/4 flex flex-col w-full overflow-hidden rounded-lg shadow-xs bg-white dark:bg-gray-800">
            <div className="basis-1/12">
              <h2 className="basis-1/4 p-2">
                Heart Rhythm <span>{"( - )"}</span>
              </h2>
            </div>
            <div className="basis-11/12">
              {!device.status ? (
                <div className="h-400"></div>
              ) : (
                <ApexCharts
                  options={options}
                  series={[{ data: ecgData }]}
                  type="line"
                  height={450}
                />
              )}
            </div>
          </div>
          <div className="basis-1/4 flex flex-col gap-4">
            {/* Your BPM, SPO2, and Temperature cards here, unchanged */}
          </div>
        </div>
      </div>
    </>
  );
}
