import { ReactNode } from 'react'
import { FaHome, FaList, FaBox } from 'react-icons/fa'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-200 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
                <FaHome />
                <div className="px-2">
                  Home
                </div>
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaList />
              <a href="/dashboard/departments" className="block p-2 rounded hover:bg-gray-300">
                Departments
              </a>
            </li>
            <li>
              <a href="/dashboard/products" className="block p-2 rounded hover:bg-gray-300">
                Products
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  )
}
