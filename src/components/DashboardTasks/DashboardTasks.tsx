/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useData } from '../../context/DataContext';
import cloneDeep from 'lodash.clonedeep';
import TaskModals from '../Modals/TaskModals/TaskModals';
import './DashboardTasks.css'
import { TaskType } from '../Modals/TaskModals/TaskModal.type';
export default function DashboardTasks() {
  const [isLoading, setIsLoading] = useState(false);
  const [editID, setEditID] = useState<number | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const data = useData()?.data;
  const updateData = useData()?.updateData;
  const tasks = data?.tasks;

  const handleCloseModal = () => {
    setModalShow(false)
    setEditID(null);
  }

  const getTaskByID = () => {
    if (!tasks) {
      return null;
    }

    return tasks.find((_: TaskType, index: number) => { return index === editID });
  }

  const handleAddTask = async (item: TaskType) => {
    if (!validateTaskToAdd(item) || !tasks || !updateData) {
      return;
    }
    let currentTasks = cloneDeep(tasks);
    if (!Array.isArray(currentTasks)) {
      currentTasks = []
    }
    currentTasks.push({ ...item })
    handleCloseModal();
    try {
      setIsLoading(true);
      await updateData({ tasks: currentTasks })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const handleEditTask = async (item: TaskType) => {
    if (!validateTaskToAdd(item) || !tasks || !updateData) {
      return;
    }
    let currentTasks = cloneDeep(tasks);
    currentTasks = currentTasks.map((task: TaskType, index: number) => {
      if (index === editID) {
        return item;
      }
      return task;
    })
    handleCloseModal();
    try {
      setIsLoading(true);
      await updateData({ tasks: currentTasks })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const validateTaskToAdd = (item: TaskType) => {
    if (item.name.trim() === '' || item.deadline.trim() === '') {
      return false;
    }
    return true;
  }

  const handleDeleteTask = (id: number) => {
    if (!tasks || !updateData) return;
    return async () => {
      let currentTasks = [...tasks];
      currentTasks.splice(id, 1);
      try {
        setIsLoading(true);
        await updateData({ tasks: currentTasks });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    }
  }

  return (
    <>
      <TaskModals
        show={modalShow}
        onHide={handleCloseModal}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        editTask={getTaskByID()}
      />
      <div className='dashboard-tasks'>
        <div className='d-flex flex-row justify-content-between align-items-baseline'>
          <div className='d-flex align-items-baseline'>
            <p className='title'>DAILY TASKS</p>
            <span className='loading ms-4'>{isLoading && 'Loading...'}</span>
          </div>
          <button className='add-btn' onClick={() => { setModalShow(true) }}>Add</button>
        </div>
        <div className='d-flex flex-column' style={{ gap: '1rem' }}>
          {Array.isArray(tasks) && tasks.length > 0 && tasks.map((el: TaskType, id: number) => {
            return <TaskItem
              item={el}
              key={id}
              setEditID={setEditID}
              handleDeleteTask={handleDeleteTask}
              id={id}
              openModal={() => { setModalShow(true) }}
            />
          })}
          {Array.isArray(tasks) && tasks.length === 0 &&
            <div className='task-empty'>No task :(</div>}
        </div>
      </div>
    </>
  )
}

interface TaskItemPropsType {
  item: TaskType,
  id: number,
  openModal: () => void,
  setEditID: React.Dispatch<React.SetStateAction<number | null>>,
  handleDeleteTask: (id: number) => (() => Promise<void>) | undefined
}

function TaskItem(props: TaskItemPropsType) {
  return <div className='dashboard-tasks-item'>
    <div className='d-flex flex-row justify-content-between'>
      <span className='task-title'>{props.item.name}</span>
      <div>
        <button onClick={() => { props.openModal(); props.setEditID(props.id) }}>Edit</button>
        <button onClick={props.handleDeleteTask(props.id)}>Delete</button>
      </div>
    </div>
    <div className='d-flex flex-column'>
      <span className='task-property'>Deadline: <span className='task-data'>{props.item.deadline}</span></span>
      <span className='task-property'>Notes: <span className='task-data'>{props.item.notes}</span></span>
      <span className='task-property'>Difficulty: <span className='task-data'>{props.item.difficulty}</span></span>
    </div>
  </div>
}
