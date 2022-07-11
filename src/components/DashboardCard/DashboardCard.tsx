/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext';
import './DashboardCard.css'

export default function DashboardCards() {
  const [dayInFpt, setDayInFpt] = useState(0);
  const [paidDay, setPaidDay] = useState(0);
  const data = useData()?.data;
  const updateData = useData()?.updateData;
  const paidDate = data?.paidDate;
  const tasks = data?.tasks;

  const cardItems = [
    { title: 'DAYS IN FPT', data: dayInFpt, suffix: 'days' },
    { title: 'PAYDAY IN', data: paidDay, suffix: 'days' },
    { title: 'NUMBER OF TASKS', data: tasks?.length, suffix: 'tasks' },
    { title: 'MONEY SPENT', data: 0, suffix: 'VND' }
  ]

  //caculate days in fpt
  //caculate paid day
  useEffect(() => {
    caculateDayInFpt();
    caculatePaidDay();
  }, [data])

  const caculateDayInFpt = () => {
    const startDay = new Date(2022, 6, 21).getTime();
    const today = new Date().getTime();
    setDayInFpt(Math.round((today - startDay) / 8.64e+7))
  }

  const caculatePaidDay = async () => {
    if (!updateData) {
      return;
    }
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear()
    const thisPaidDate = new Date(thisYear + ((thisMonth === 11) ? 1 : 0), thisMonth + 1, 19).getTime();;
    const today = new Date().getTime();
    if (!paidDate || paidDate < today) {
      await updateData({ paidDate: thisPaidDate });
    } else {
      setPaidDay(Math.round((paidDate - today) / 8.64e+7))
    }
  }

  return <div className="homepage-cards" >
    {cardItems && cardItems.map((item) => {
      return <DashboardOneCard title={item.title} data={item.data} suffix={item.suffix} key={item.title} />
    })
    }
  </div>
}

interface DashboardOneCardPropsType {
  title: string,
  data: number | undefined,
  suffix: string
}

export function DashboardOneCard(props: DashboardOneCardPropsType) {
  return (
    <div className='dashboard-card'>
      <p className="dashboard-card-title m-0">{props.title}</p>
      <span className='dashboard-card-days-number'>{props.data}</span>
      <span className='dashboard-card-suffix'>{props.suffix}</span>
    </div>
  )
}
