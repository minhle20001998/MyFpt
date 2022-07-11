import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { EDCType } from '../../DashboardEDC/DashboardEDC.type';
import './EDCModals.css'

interface EDCModalsPropsType {
  handleCloseModal: () => void,
  handleAddEDC: (item: string) => void,
  handleEditEDC: (item: string) => void,
  editEDC: EDCType | undefined,
  [index: string]: any
}

export default function EDCModals(props: EDCModalsPropsType) {
  const [newEDC, setNewEDC] = useState("");
  const {
    handleAddEDC: propsHandleAddEDC,
    handleEditEDC: propsHandleEditEDC,
    editEDC: propsEditEDC,
    handleCloseModal: propsHandleCloseModal,
    ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewEDC(propsEditEDC?.item ? propsEditEDC?.item : '')
    inputRef.current?.focus();
  }, [props.show, propsEditEDC])

  const onHide = () => {
    setNewEDC('');
    propsHandleCloseModal();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (propsEditEDC) {
      propsHandleEditEDC(newEDC);
    } else {
      propsHandleAddEDC(newEDC);
    }
  }

  return (
    <Modal
      onHide={onHide}
      {...otherProps}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
          Add EDC
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="py-4">
          <Form.Control
            placeholder="EDC"
            aria-label="edc"
            ref={inputRef}
            defaultValue={newEDC}
            onChange={(e) => setNewEDC(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-positive-btn" type='submit'>Submit</Button>
          <Button className="modal-negative-btn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
