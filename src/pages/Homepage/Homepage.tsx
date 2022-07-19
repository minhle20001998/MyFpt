/* eslint-disable react-hooks/exhaustive-deps */
import DashboardCards from '../Dashboard/components/DashboardCard/DashboardCard'
import DashboardEDC from '../Dashboard/components/DashboardEDC/DashboardEDC'
import DashboardExpenditure from '../Dashboard/components/DashboardExpenditure/DashboardExpenditure'
import DashboardTasks from '../Dashboard/components/DashboardTasks/DashboardTasks'
import './Homepage.css'
export default function Homepage() {

  return (
    <div className='homepage'>
      <DashboardCards />
      <DashboardEDC />
      <DashboardTasks />
      <DashboardExpenditure />
    </div>
  )
}
