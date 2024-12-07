import './globals.css'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><a href="/dashboard">Inicio</a></li>
              <li><a href="/dashboard/reports">Reportes</a></li>
              <li><a href="/dashboard/settings">Configuraciones</a></li>
            </ul>
          </nav>
        </aside>
        <main className="content">
          {children}
        </main>
      </div>
    )
}
