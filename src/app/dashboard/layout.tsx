'use client'

import { ReactNode, useState } from 'react'
import { FaHome, FaList, FaBox, FaBars, FaTimes } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen">
      {/* Button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-50 p-2 bg-green-700 text-white rounded md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full min-h-screen  bg-green-700 text-white p-4 font-bold transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard"
              className={`flex items-center space-x-2 p-2 rounded  hover:bg-green-400 $pathname === '/dashboard' ? 'bg-green-400 text-white': ''}`}>
                <FaHome />
                <div className="px-2">
                  Home
                </div>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/departments"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                pathname === '/dashboard/departments' ? 'bg-green-400 text-white' : ''
                }`}
              >
                <FaList />
                <div className="px-2">
                  Departments
                </div>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/suppliers"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                pathname === '/dashboard/suppliers' ? 'bg-green-400 text-white' : ''
                }`}
              >
                <FaBox />
                <div className="px-2">
                  Suppliers
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {children}
      </main>
    </div>
  )
}
