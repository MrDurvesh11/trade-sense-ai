"use client";

import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [username, setUsername] = useState();
  const router = useRouter();

  const navigation = ["Home", "", "About Us"];
 
    useEffect(() => {
      if (localStorage.getItem("name")){
      setUsername(localStorage.getItem("name").split(" ")[0]);
      }
    }, []);
  
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
                    <span>
                      <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        class="h-8 me-3"
                        alt="FlowBite Logo"
                      />
                    </span>
                    <span className="self-center text-4xl font-bold  whitespace-nowrap ">
                      TradeSense Ai
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none "
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((menu, index) => (
                      <li className="mr-3 nav__item" key={index}>
                        <Link
                          href={
                            menu === "Home"
                              ? "/user"
                              : `/user/${menu.toLowerCase().replace(" ", "-")}`
                          }
                          onClick={() => {
                            // check if the user is logged in else just redirect to login page
                            if (menu === "Services") {
                              if (localStorage.getItem("name")) {
                                router.push("/Services");
                              } else {
                                router.push("/Services");
                              }
                            }
                          }}
                          className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
                        >
                          {menu}
                        </Link>
                      </li>
                    ))}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            <li className="mr-3 nav__item">
              <Link
                href={`/`}
                className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
              >
                Home
              </Link>
            </li>

            <li className="mr-3 nav__item">
              <Link
                href={`/services`}
                className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
              >
                Services
              </Link>
            </li>
            <li className="mr-3 nav__item">
              <Link
                href={`/about`}
                className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {username !== undefined ? (
            <div className="hidden mr-3 space-x-4 lg:flex nav__item">
              <div className="flex items-center space-x-4">
                <p className="text-gray-900 dark:text-white">
                  Welcome {username}!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("name");
                    router.push("/");
                    window.location.reload();
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
