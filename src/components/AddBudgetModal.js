import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
  //used useRef hook that's great for getting data out of an input field, similar to dataset in JS
  const nameRef = useRef();
  const maxRef = useRef();

  //Here is how we imported addBudget function from BudgetsContext, because of the exported function we wrote there we don't have to type ...= useContext(BudgetsContext)
  const { addBudget } = useBudgets();

  //on every submit this function is invoked and next calues are sent to the addBudget function in BudgetsContext, after we close the Modal.
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    //Modal has these 2 attributes show,onHide that get the job done since they're pretty self explanatory, we pass to them boolean values that will determine what they do or do not do.
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
