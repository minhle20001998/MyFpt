import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

interface BasicPaginationProps {
  itemsPerPage?: number,
  itemsSize: number | undefined,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function BasicPagination(props: BasicPaginationProps) {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (props.itemsPerPage !== undefined) {
      setItemsPerPage(props.itemsPerPage)
    }
  }, [props.itemsPerPage])

  const generatePagination = () => {
    if (!props.itemsSize) {
      return <></>
    }
    //
    if (props.itemsSize <= itemsPerPage) {
      return <>
        <Pagination.First disabled />
        <Pagination.Prev disabled />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next disabled />
        <Pagination.Last disabled />
      </>
    }
    //
    return <>
      <Pagination.First disabled />
      <Pagination.Prev disabled />
      {Array.from(Array(Math.ceil(props.itemsSize / itemsPerPage)).keys()).map((_: any, index: number) => {
        const currentIndex = index + 1;
        return <Pagination.Item
          key={index}
          active={currentIndex === props.currentPage}
          onClick={() => { props.setCurrentPage(index + 1) }}
        >
          {currentIndex}
        </Pagination.Item>
      })}
      <Pagination.Next disabled />
      <Pagination.Last disabled />
    </>
  }

  return (
    <div className='w-100 d-flex justify-content-center mt-2'>
      <Pagination>
        {generatePagination()}
      </Pagination>
    </div>
  )
}
