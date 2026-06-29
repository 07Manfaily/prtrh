import { Outlet } from 'react-router-dom'
import AdminHeader  from '../components/layout/AdminHeader'
import AdminSidebar from '../components/layout/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="flex h-screen flex-col">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-white p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
