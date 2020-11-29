import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
//import { Button } from "react-bootstrap";
import "./CreateRoom.css";
import { useMainContext } from "../libs/contextLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";

export default function CreateRoom() {
  const { state, reducer } = useMainContext();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return values.name.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("values=", values);

    setIsLoading(true);
    const newRoom = {
      owner: state.auth.userId,
      roomId: values.name,
      roomDesc: values.description,
      memberList: [state.auth.userId],
    };
    console.log("newRoom=", newRoom);
    try {
      const res = await createRoom(newRoom);
      reducer({ type: "addRoom", payload: newRoom });
      console.log("handleSubmit res=", res);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createRoom(newRoom) {
    return API.post("room", "/room", {
      body: newRoom,
    });
  }

  return (
    <div className="CreateRoom">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Room Name</ControlLabel>
          <FormControl autoFocus value={values.name} onChange={handleChange("name")} />
        </FormGroup>
        <FormGroup controlId="description">
          <ControlLabel>Room Description</ControlLabel>
          <FormControl
            style={{ height: "120px" }}
            componentClass="textarea"
            value={values.description}
            onChange={handleChange("description")}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
