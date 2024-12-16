'use client'

import { ReactNode, useState } from 'react'
import { FaHome, FaList, FaBox, FaBars } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Button for small screens */}
      <button onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-green-700 text-white md:hidden"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-4 font-bold">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard"
              className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 $pathname === '/dashboard' ? 'bg-green-400 text-white': ''}`}>
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
                href="/dashboard/products"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                pathname === '/dashboard/products' ? 'bg-green-400 text-white' : ''
                }`}
              >
                <FaBox />
                <div className="px-2">
                  Products
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  )
}
