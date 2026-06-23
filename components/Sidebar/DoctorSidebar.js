import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaPlus, FaUser, FaUsers, FaBell, FaNotesMedical, FaHome, FaCog, FaList, FaArrowLeft } from 'react-icons/fa';

export default function DoctorSidebar({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(prev => !prev);

  const menuItems = [
    {
      href: '/doctor/add',
      title: 'Add Patient',
      icon: <FaPlus size={28}/>,
    },
    {
      href: '/doctor/patients',
      title: 'Patients',
      icon: <FaUsers size={28}/>,
    },
    {
      href: '/doctor/notifications',
      title: 'Notifications',
      icon: <FaBell size={28}/>,
    },
    {
      href: '/doctor/reports',
      title: 'Reports',
      icon: <FaNotesMedical size={28}/>,
    },
  ];

  return (
    <div className=" flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          
          <button
            onClick={toggleSidebar}
            className='absolute text-white md:hidden px-4 py-2 bg-green-600 z-50 focus:outline-none focus:ring-2 focus:ring-green-500'
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isOpen}
          >
            <FaList size={18}/>
          </button>

          <nav className={` md:flex md:w-60 w-16 h-full transition ease-in-out duration-300 bg-gray2 dark:bg-gray6 ${isOpen ? " absolute": "hidden"}`}>
            <ul className="w-full flex flex-col mx-auto px-2 py-2 pt-20">
              {/* Static Sidebar Icons */}
               <li className='px-2 md:hidden'>
                <button
                  onClick={toggleSidebar}
                  className='focus:outline-none focus:ring-2 focus:ring-red-400 rounded'
                  aria-label="Close sidebar"
                >
                  <FaArrowLeft className='text-red-400' size={20}/>
                </button>
               </li>

              <li key={'Dashboard'}>
              <div className="mt-4 md:mt-8"></div>
              <Link href="dashboard">
                <div
                  className={`sidebar-icon group ${router.asPath === "/doctor" && "dark:bg-blue-500 bg-blue-500 text-white"}`}
                >
                  <FaHome size={28} />
                  <span className="sidebar-tooltip group-hover:scale-100">
                    Dashboard
                  </span>
                </div>
              </Link>
              </li>
              <li key={'Divider'}>
              <Divider />
              </li>

              {/* Dynamic Sidebar Icons */}
              {menuItems.map(({ href, title, icon }) => (
                <li key={title}>
                <Link href={href}>
                  <div
                    className={`sidebar-icon group ${
                      router.asPath === href && "dark:bg-blue-500 bg-blue-500 text-white"
                    }`}
                  >
                    {icon}
                    <span className="sidebar-tooltip group-hover:scale-100">
                      {title}
                    </span>
                  </div>
                </Link>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex flex-col w-full bg-gray-100 dark:bg-gray-900 overflow-x-hidden overflow-y-auto mb-14 pt-20">
            <div className="flex flex-col w-full mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const Divider = () => <hr className="sidebar-hr my-2" />;