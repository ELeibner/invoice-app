"use client";

import { navigation, userNavigation } from "@/src/lib/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, UserCircleIcon, XIcon } from "@heroicons/react/outline";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {
          <>
            <div className="min-h-full">
              <Disclosure as="nav">
                {({ open }) => (
                  <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8"
                              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
                              alt="Invoice Application"
                            />
                          </div>
                          <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                              {navigation.map((item) => {
                                const current = pathname === item.href;
                                return (
                                  <button
                                    key={item.name}
                                    onClick={() => router.push(item.href)}
                                    className={classNames(
                                      current
                                        ? "text-black"
                                        : "text-gray-400 hover:text-black"
                                    )}
                                    aria-current={current ? "page" : undefined}
                                  >
                                    {item.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                              <div>
                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-200">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <UserCircleIcon className="h-10 w-10 text-gray-500" />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <button
                                          onClick={() => router.push(item.href)}
                                          className={classNames(
                                            active ? "bg-blue-100" : "",
                                            "px-4 py-2 text-sm text-gray-700 w-full flex"
                                          )}
                                        >
                                          {item.name}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-400 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <MenuIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => {
                          const current = pathname === item.href;
                          return (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={classNames(
                                current
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-600 hover:bg-blue-400 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                              )}
                              aria-current={current ? "page" : undefined}
                            >
                              {item.name}
                            </Disclosure.Button>
                          );
                        })}
                      </div>
                      <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <UserCircleIcon className="h-10 w-10 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium leading-none text-gray">
                              Demo User
                            </div>
                            <div className="text-sm font-medium leading-none text-gray-600">
                              demo@example.com
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {userNavigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-400 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {children}
            </div>
          </>
        }
      </body>
    </html>
  );
}
