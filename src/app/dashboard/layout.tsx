import '../globals.css';

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-200 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="block p-2 rounded hover:bg-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard/reports" className="block p-2 rounded hover:bg-gray-300">
                Reports
              </a>
            </li>
            <li>
              <a href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-300">
                Configurations
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  )
}
