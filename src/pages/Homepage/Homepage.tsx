/* eslint-disable react-hooks/exhaustive-deps */
import DashboardCards from '../../components/DashboardCard/DashboardCard';
import DashboardEDC from '../../components/DashboardEDC/DashboardEDC';
import DashboardTasks from '../../components/DashboardTasks/DashboardTasks';
import './Homepage.css'
export default function Homepage() {

  return (
    <div className='homepage'>
      <DashboardCards />
      <DashboardEDC />
      <DashboardTasks />
    </div>
  )
}
