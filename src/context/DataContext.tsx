import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { firebase_db } from '../helpers/Firebase';
import { DataContextType, DataType, PropsType } from './DataContext.type';

const DataContext = createContext<DataContextType | null>(null);

const defaultValueData: DataType = {
  edc: [],
  paidDate: 0,
  tasks: [],
  username: 'Username',
  expenditure: []
}

export default function DataProvider(props: PropsType) {
  const dbCollection = "users"
  const [rawData, setRawData] = useState<any>({});
  const [data, setData] = useState<DataType>(defaultValueData);
  useEffect(() => { getData() }, [])

  const getData = async () => {
    const querySnapshot = await getDocs(collection(firebase_db, dbCollection));
    let rawData: any = {};
    querySnapshot.forEach((doc) => {
      rawData = doc
    });
    if (rawData.data) {
      setRawData(rawData);
      setData(rawData.data());
    }
  }

  const updateData = async (data: any) => {
    if (!rawData.ref) {
      return;
    }
    try {
      await updateDoc(doc(firebase_db, rawData.ref.path), data)
      await getData();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DataContext.Provider value={{ rawData, data, getData, updateData }}>{props.children}</DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}

