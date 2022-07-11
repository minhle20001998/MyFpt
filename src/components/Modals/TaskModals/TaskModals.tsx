import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { DIFFICULTY, DifficultyType, TaskType } from './TaskModal.type';

interface PropsType {
  onHide: () => void,
  handleEditTask: (item: TaskType) => void,
  handleAddTask: (item: TaskType) => void,
  editTask: TaskType | undefined | null,
  [index: string]: any
}

export default function TaskModals(props: PropsType) {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyType | string>(DIFFICULTY.EASY);
  const {
    onHide: propsHandleCloseModal,
    handleEditTask: propsHandleEditTask,
    handleAddTask: propsHandleAddTask,
    editTask: propsEditTask, ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [props.show])

  useEffect(() => {
    if (propsEditTask) {
      setName(propsEditTask.name);
      setDeadline(propsEditTask.deadline);
      setNotes(propsEditTask.notes);
      setDifficulty(propsEditTask.difficulty);
    }
  }, [propsEditTask])


  const mapStateToObject = (): TaskType => {
    return {
      name, deadline, notes, difficulty
    }
  }

  const handleCloseModal = () => {
    setName("");
    setDeadline("");
    setNotes("");
    setDifficulty(DIFFICULTY.EASY);
    propsHandleCloseModal();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!propsEditTask) {
      propsHandleAddTask(mapStateToObject());
    } else {
      propsHandleEditTask(mapStateToObject());
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
          <Form.Label htmlFor="task-name">Task Name</Form.Label>
          <Form.Control
            id="task-name"
            placeholder="Task name"
            aria-label="name"
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="task-deadline">Deadline</Form.Label>
          <Form.Control
            id="task-deadline"
            placeholder="Deadline"
            aria-label="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="task-note">Notes</Form.Label>
          <Form.Control
            style={{ height: '6rem', resize: 'none' }}
            id="task-note"
            as="textarea"
            placeholder="Notes"
            aria-label="note"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="task-difficulty">Difficulty</Form.Label>
          <Form.Select
            id="task-difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Default select difficulty"
            value={difficulty}
          >
            <option value={DIFFICULTY.EASY}>{DIFFICULTY.EASY}</option>
            <option value={DIFFICULTY.MEDIUM}>{DIFFICULTY.MEDIUM}</option>
            <option value={DIFFICULTY.HARD}>{DIFFICULTY.HARD}</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-positive-btn" type='submit'>Submit</Button>
          <Button className="modal-negative-btn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
