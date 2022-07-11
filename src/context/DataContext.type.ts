import { EDCType } from "../components/DashboardEDC/DashboardEDC.type"
import { TaskType } from "../components/Modals/TaskModals/TaskModal.type"

export interface PropsType {
  children: JSX.Element
}

export interface DataType {
  edc: EDCType[],
  paidDate: number,
  tasks: TaskType[],
  username: string
}

export interface DataContextType {
  rawData: any,
  data: DataType,
  getData: () => void,
  updateData: (data: any) => void
}