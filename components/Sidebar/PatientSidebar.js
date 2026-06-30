

import Link from 'next/link';

import { useRouter } from 'next/router';

import { useState } from 'react';

import { FaFileAlt, FaBell, FaNotesMedical, FaHome, FaCog, FaList, FaArrowLeft, FaUserMd } from 'react-icons/fa';



export default function PatientSidebar({ children }) {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  

  function SetOpen(){

    if(isOpen){

      setIsOpen(false)

    }else{

      setIsOpen(true)

    }

    console.log(isOpen)

  }



  const menuItems = [

    {

        href: '/patient/notifications',

        title: 'Notifications',

        icon: <FaBell size={28}/>,

      },

    {

      href: '/patient/find-doctors',

      title: 'Find Doctors',

      icon: <FaUserMd size={28}/>,

    },

    {

      href: '/patient/reports',

      title: 'Your Reports',

      icon: <FaFileAlt size={28}/>,

    },

  ];



  return (

    <div className=" flex h-screen bg-gray-100 dark:bg-gray-900 pt-20">

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex h-full">

          {!isOpen && (
            <button
              onClick={SetOpen}
              className='absolute text-white md:hidden px-4 py-2 bg-green-600 z-[1001]'
              aria-label="Open sidebar"
              aria-expanded={isOpen}
            >
              <FaList size={18}/>
            </button>
          )}

          <nav className={` md:flex md:w-60 w-16 h-full transition ease-in-out duration-300 bg-gray2 dark:bg-gray6 ${isOpen ? " absolute": "hidden"}`}>

            <ul className="w-full flex flex-col mx-auto px-2 py-2">

              {/* Static Sidebar Icons */}

               <li className='px-2 md:hidden'>
                 <button
                   onClick={SetOpen}
                   aria-label="Close sidebar"
                   aria-expanded={isOpen}
                   className="flex items-center justify-center"
                 >
                   <FaArrowLeft className='text-red-400' size={20}/>
                 </button>
               </li>



              <li key={'Dashboard'}>

              <div className="mt-8 md:mt-16"></div>

              <Link href="/patient">

                <div

                  className={`sidebar-icon group ${router.asPath === "/patient" && "dark:bg-blue-500 bg-blue-500 text-white"}`}

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



          <main className="flex flex-col w-full bg-gray-100 dark:bg-gray-900 overflow-x-hidden overflow-y-auto mb-14">

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