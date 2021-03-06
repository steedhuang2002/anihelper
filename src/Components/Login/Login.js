import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { toggleLoginOn, toggleLoginOff, updateName } from "../../Redux/Actions";

function Login(props) {
  // ref to username input
  const textInput = useRef(null);

  // updates username
  const handleLogin = () => {
    if (textInput.current.value.trim() !== "") {
      props.onUpdateName(textInput.current.value.trim());
    }
  };

  return (
    <>
      <Modal show={props.login} onHide={props.onToggleLoginOff} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter MAL Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl ref={textInput} />
            <InputGroup.Append>
              <Button disabled={props.loading} variant="primary" onClick={() => handleLogin()}>
                {props.loading ? <Spinner as="span" animation="border" size="sm" /> : "Confirm"}
              </Button>
            </InputGroup.Append>
          </InputGroup>

          {props.error ? <Alert variant="danger">Username not found!</Alert> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    login: state.login.show,
    loading: state.name.loading,
    error: state.name.error,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleLoginOn: () => dispatch(toggleLoginOn()),
    onToggleLoginOff: () => dispatch(toggleLoginOff()),
    onUpdateName: (value) => dispatch(updateName(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
