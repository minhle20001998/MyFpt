import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { ExpenditureType } from './ExpenditureModals.type';


interface PropsType {
  onHide: () => void,
  handleEditExpenditure: (item: any) => void,
  handleAddExpenditure: (item: any) => void,
  editExpenditure: ExpenditureType | undefined | null,
  [index: string]: any
}

const DEFAULT_VALUE: ExpenditureType = {
  productName: "",
  quantity: 1,
  date: new Date(),
  price: 0
}

export default function ExpenditureModals(props: PropsType) {
  const [productName, setProductName] = useState(DEFAULT_VALUE.productName);
  const [quantity, setQuantity] = useState(DEFAULT_VALUE.quantity);
  const [date, setDate] = useState(DEFAULT_VALUE.date);
  const [price, setPrice] = useState(DEFAULT_VALUE.price);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    onHide: propsHandleCloseModal,
    handleEditExpenditure: propsHandleEditExpenditure,
    handleAddExpenditure: propsHandleAddExpenditure,
    editExpenditure: propsEditExpenditure,
    ...otherProps
  } = props;

  useEffect(() => {
    inputRef.current?.focus();
  }, [props.show])

  useEffect(() => {
    if (propsEditExpenditure) {
      setProductName(propsEditExpenditure.productName);
      setQuantity(propsEditExpenditure.quantity);
      setDate(new Date(propsEditExpenditure.date.seconds * 1000));
      setPrice(propsEditExpenditure.price);
    }
  }, [propsEditExpenditure])

  const handleCloseModal = () => {
    setProductName(DEFAULT_VALUE.productName);
    setQuantity(DEFAULT_VALUE.quantity);
    setDate(DEFAULT_VALUE.date);
    setPrice(DEFAULT_VALUE.price);
    propsHandleCloseModal();
  }

  const mapStateToObject = (): ExpenditureType => {
    return {
      productName,
      quantity,
      date,
      price
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!propsEditExpenditure) {
      propsHandleAddExpenditure(mapStateToObject());
    } else {
      propsHandleEditExpenditure(mapStateToObject());
    }
  }

  return (
    <Modal
      {...otherProps}
      onHide={handleCloseModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
          Add Task
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="py-4">
          <Form.Label htmlFor="product-name">Product Name</Form.Label>
          <Form.Control
            id="product-name"
            placeholder="Product name"
            aria-label="name"
            ref={inputRef}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="product-quantity">Quantity</Form.Label>
          <Form.Control
            type="number"
            id="product-quantity"
            placeholder="Quantity"
            aria-label="quantity"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
          <br />
          <Form.Label htmlFor="date">Date</Form.Label>
          <Form.Control
            id="date"
            type="date"
            placeholder="Date"
            aria-label="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <br />
          <InputGroup className='d-flex flex-column'>
            <Form.Label htmlFor="price">Price</Form.Label>
            <div className='d-flex flex-row'>
              <Form.Control
                id="price"
                type="number"
                placeholder="Price"
                aria-label="price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
              <InputGroup.Text>₫</InputGroup.Text>
            </div>
          </InputGroup>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-positive-btn" type='submit'>Submit</Button>
          <Button className="modal-negative-btn" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
