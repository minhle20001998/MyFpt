import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useData } from '../../context/DataContext';
import { DateFormat, MoneyFormat } from '../../helpers/AllFormat';
import ExpenditureModals from '../Modals/ExpenditureModals/ExpenditureModals';
import { ExpenditureType } from '../Modals/ExpenditureModals/ExpenditureModals.type';
import BasicPagination from '../Pagination/BasicPagination';
import './DashboardExpenditure.css'

export const CONTENT_PER_PAGE = 5;

export default function DashboardExpenditure() {
  const [isLoading, setIsLoading] = useState(false);
  const [editID, setEditID] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const data = useData()?.data;
  const updateData = useData()?.updateData;
  const expenditure = data?.expenditure;

  const handleCloseModal = () => {
    setModalShow(false)
    setEditID(null);
  }

  const getExpenditureByID = () => {
    if (!expenditure) {
      return null;
    }
    return expenditure.find((_: ExpenditureType, index: number) => { return index === editID });
  }

  const handleAddExpenditure = async (item: ExpenditureType) => {
    if (!validateExpenditureToAdd(item) || !updateData) {
      return;
    }
    let currentExpenditure: ExpenditureType[] = []
    if (expenditure) {
      currentExpenditure = cloneDeep(expenditure)
    }
    currentExpenditure.push({ ...item })
    handleCloseModal();
    try {
      setIsLoading(true);
      updateData({ expenditure: currentExpenditure })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const handleEditExpenditure = async (item: ExpenditureType) => {
    if (!validateExpenditureToAdd(item) || expenditure === null || !updateData) {
      return;
    }
    let currentExpenditure = cloneDeep(expenditure);
    currentExpenditure = currentExpenditure?.map((task: ExpenditureType, index: number) => {
      if (index === editID) {
        return item;
      }
      return task;
    })
    handleCloseModal();
    try {
      setIsLoading(true);
      updateData({ expenditure: currentExpenditure })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const handleDeleteExpenditure = (id: number) => {
    if (!expenditure || !updateData) return;
    return async () => {
      let currentExpenditure = [...expenditure];
      currentExpenditure.splice(id, 1);
      try {
        setIsLoading(true);
        await updateData({ expenditure: currentExpenditure });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    }
  }

  const validateExpenditureToAdd = (item: ExpenditureType): boolean => {
    if (item.productName.trim() === "" || item.quantity === 0 || item.price === 0) {
      return false;
    }
    return true;
  }

  const caculateExpenditureByPage = () => {
    const result = expenditure?.slice(((currentPage) - 1) * CONTENT_PER_PAGE, ((currentPage) - 1) * CONTENT_PER_PAGE + CONTENT_PER_PAGE)
    return result;
  }

  return (
    <>
      <ExpenditureModals
        show={modalShow}
        onHide={handleCloseModal}
        handleAddExpenditure={handleAddExpenditure}
        handleEditExpenditure={handleEditExpenditure}
        editExpenditure={getExpenditureByID()}
      />
      <div className='dashboard-expenditure'>
        <div className='d-flex flex-row justify-content-between align-items-baseline'>
          <div className='d-flex align-items-baseline'>
            <p className='title'>EXPENDITURE TABLE</p>
            <span className='loading ms-4'>{isLoading && 'Loading...'}</span>
          </div>
          <button className='add-btn' onClick={() => { setModalShow(true) }}>Add</button>
        </div>
        <ExpenditureTable
          expenditure={caculateExpenditureByPage()}
          setEditID={setEditID}
          openModal={() => { setModalShow(true) }}
          handleDeleteExpenditure={handleDeleteExpenditure}
          currentPage={currentPage}
        />
        <BasicPagination itemsSize={expenditure?.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  )
}

const TABLE_HEADER = ["#", "Product Name", "Quantity", "Date", "Price", "Action"];

interface PropsType {
  currentPage: number,
  expenditure: ExpenditureType[] | undefined,
  setEditID: React.Dispatch<React.SetStateAction<number | null>>,
  handleDeleteExpenditure: (id: number) => (() => Promise<void>) | undefined
  openModal: () => void,
}

function ExpenditureTable(props: PropsType) {
  return <Table responsive className='expenditure-table'>
    <thead>
      <tr>
        {TABLE_HEADER.map((e: string) => {
          return <th key={e}>{e}</th>
        })}
      </tr>
    </thead>
    <tbody>
      {props.expenditure && props.expenditure.map((item: ExpenditureType, index: number) => {
        return <tr key={index}>
          <td>{((props.currentPage - 1) * CONTENT_PER_PAGE + index)}</td>
          <td>{item.productName}</td>
          <td>{item.quantity}</td>
          <td>{DateFormat(item.date.seconds * 1000)}</td>
          <td className='item-price'>{MoneyFormat(item.price)}</td>
          <td>
            <button onClick={() => { props.setEditID(index); props.openModal(); }}>Edit</button>
            <button onClick={props.handleDeleteExpenditure(index)}>Delete</button>
          </td>
        </tr>
      })}
    </tbody>
  </Table>
}
