import { Outlet } from 'react-router-dom'
import SalarieHeader from '../components/layout/SalarieHeader'

export default function SalarieLayout() {
  return (
    <div className="min-h-screen bg-white">
      <SalarieHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
