import { ExpenditureType } from "../components/Modals/ExpenditureModals/ExpenditureModals.type"
import { TaskType } from "../components/Modals/TaskModals/TaskModal.type"
import { EDCType } from "../pages/Dashboard/components/DashboardEDC/DashboardEDC.type"

export interface PropsType {
  children: JSX.Element
}

export interface DataType {
  edc: EDCType[],
  paidDate: number,
  tasks: TaskType[],
  username: string,
  expenditure: ExpenditureType[]
}

export interface DataContextType {
  rawData: any,
  data: DataType,
  getData: () => void,
  updateData: (data: any) => void
}