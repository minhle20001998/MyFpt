/* eslint-disable react-hooks/exhaustive-deps */
import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react'
import EDCModals from '../../../../components/Modals/EDCModals/EDCModals';
import { useData } from '../../../../context/DataContext';
import './DashboardEDC.css'
import { EDCType } from './DashboardEDC.type';

export const DELAY = 200;
export default function DashboardEDC() {
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editID, setEditID] = useState<number | null>(null);
  const data = useData()?.data;
  const updateData = useData()?.updateData;
  const edc = data?.edc;


  const handleAddEDC = async (item: string) => {
    if (item.trim() === "" || !updateData) {
      return;
    }
    let currentEDC: EDCType[] = [];
    if (edc) {
      currentEDC = cloneDeep(edc);
    }
    currentEDC.push({ item })
    handleCloseModal();
    try {
      setIsLoading(true);
      await updateData({ edc: currentEDC })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const handleEditEDC = async (item: string) => {
    if (item.trim() === "" || !edc || !updateData) {
      return;
    }
    let currentEDC = [...edc];
    currentEDC = currentEDC.map((edc: EDCType, index: number) => {
      if (index === editID) {
        return { item };
      }
      return edc;
    })
    handleCloseModal();
    try {
      setIsLoading(true);
      await updateData({ edc: currentEDC })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setModalShow(false)
  }

  const handleDeleteEDC = (id: number) => {
    if (!edc || !updateData) {
      return;
    }
    return async () => {
      let currentEDC = [...edc];
      currentEDC.splice(id, 1);
      try {
        setIsLoading(true);
        await updateData({ edc: currentEDC });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    }
  }

  const getEDCFromID = () => {
    return edc?.find((el: EDCType, id: number) => id === editID)
  }

  return (
    <>
      <EDCModals
        show={modalShow}
        handleCloseModal={handleCloseModal}
        handleAddEDC={handleAddEDC}
        handleEditEDC={handleEditEDC}
        editEDC={getEDCFromID()}
      />
      <div className='dashboard-edc'>
        <div className='d-flex flex-row justify-content-between align-items-baseline'>
          <div className='d-flex align-items-baseline'>
            <p className='title'>EVERYDAY CARRY</p>
            <span className='loading ms-4'>{isLoading && 'Loading...'}</span>
          </div>
          <button className='add-btn' onClick={() => { setModalShow(true) }}>Add</button>
        </div>
        <div className='edc-grid'>
          {Array.isArray(edc) && edc.map((el: EDCType, id: number) => {
            return <div className='edc-item d-flex flex-row justify-content-between ' key={id}>
              <span>{el.item}</span>
              <div>
                <button onClick={() => {
                  setEditID(id);
                  setModalShow(true);
                }}>Edit</button>
                <button onClick={handleDeleteEDC(id)}>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}
