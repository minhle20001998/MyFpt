/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Textfit } from 'react-textfit';
import { useData } from '../../../../context/DataContext';
import { MoneyFormat } from '../../../../helpers/AllFormat';
import { ExpenditureType } from '../../../../components/Modals/ExpenditureModals/ExpenditureModals.type';
import './DashboardCard.css'

export default function DashboardCards() {
  const [dayInFpt, setDayInFpt] = useState<number | string>(0);
  const [minuteRedundant, setMinuteReduntdant] = useState<number | string>(0);
  const [paidDay, setPaidDay] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);

  const data = useData()?.data;
  const updateData = useData()?.updateData;
  const paidDate = data?.paidDate;
  const expenditure = data?.expenditure
  const tasks = data?.tasks;

  const cardItems = [
    { title: 'DAYS IN FPT', data: dayInFpt, subData: minuteRedundant, suffix: 'days', subSuffix: 'hours' },
    { title: 'PAYDAY IN', data: paidDay, suffix: 'days' },
    { title: 'NUMBER OF TASKS', data: tasks?.length, suffix: 'tasks' },
    { title: 'MONEY SPENT', data: MoneyFormat(moneySpent, true), suffix: 'VND' }
  ]

  useEffect(() => {
    caculatePaidDay();
    caculateMoneySpent();
    caculateDayInFpt();
  }, [data])

  const caculateDayInFpt = () => {
    const startDay = new Date(2022, 6, 23).getTime();
    const today = new Date().getTime();
    //
    const days = Math.round((today - startDay) / 8.64e+7);
    const minute = Math.abs(((today - startDay) - (days * 8.64e+7)) / 3.6e+6).toFixed(2);
    setMinuteReduntdant(minute);
    setDayInFpt(Math.round((today - startDay) / 8.64e+7))
  }

  const caculatePaidDay = () => {
    if (!updateData) {
      return;
    }
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear()
    const thisPaidDate = new Date(thisYear + ((thisMonth === 11) ? 1 : 0), thisMonth + 1, 19).getTime();;
    const today = new Date().getTime();
    if (!paidDate || paidDate < today) {
      updateData({ paidDate: thisPaidDate });
    } else {
      setPaidDay(Math.round((paidDate - today) / 8.64e+7))
    }
  }

  const caculateMoneySpent = () => {
    if (!expenditure) {
      return;
    }
    const total = expenditure?.reduce((acc: number, value: ExpenditureType) => {
      return acc + value.price
    }, 0)
    setMoneySpent(total);
  }

  return <div className="homepage-cards" >
    {cardItems && cardItems.map((item) => {
      return <DashboardOneCard item={item} key={item.title} />
    })
    }
  </div>
}

interface DashboardOneCardPropsType {
  item: {
    title: string,
    data: number | string | undefined,
    subData?: number | string | undefined,
    subSuffix?: string,
    suffix: string
  }
}

export function DashboardOneCard(props: DashboardOneCardPropsType) {
  return (
    <div className='dashboard-card'>
      <p className="dashboard-card-title m-0">{props.item.title}</p>
      <Textfit
        className='dashboard-card-days-number'
        mode="single"
        max={50}
      >
        <div className="d-flex align-items-baseline h-100">
          <div>{props.item.data}</div>
          <div className='dashboard-card-suffix '>{props.item.suffix}</div>
          {props.item.subData && <>
            <span className='dashboard-card-suffix sub'>(&nbsp;</span>
            <div className='sub'> {props.item.subData}</div>
            <div className='dashboard-card-suffix sub'>{props.item.subSuffix} )</div>
          </>
          }
        </div>
      </Textfit>
    </div>
  )
}
