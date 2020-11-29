import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Button,
} from "react-bootstrap";
import { useMainContext } from "../libs/contextLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";

import "./UpdateRoom.css";

export default function UpdateRoom() {
  const { state, reducer } = useMainContext();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [room, setRoom] = useState(null);
  const [values, setValues] = useState({
    description: "",
    newMember: "",
  });
  useEffect(() => {
    console.log("UpdateRoom useEffect id=", id);
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const curRoom = await loadRoom();
      console.log("curRoom=", curRoom);
      setRoom(curRoom);
      setValues({
        name: curRoom.roomId,
        description: curRoom.roomDesc,
      });
    } catch (e) {
      onError(e);
    }
  }

  function loadRoom() {
    console.log("loadRoom id=", id);
    return API.get("room", `/room/${id}`);
  }

  function validateForm() {
    return values.description.length > 0 || values.newMember.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function updateRoom(updRoom) {
    console.log("updRoom=", updRoom);
    return API.put("room", `/room/${id}`, {
      body: updRoom,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("values=", values);
    setIsLoading(true);

    let newMem;
    if (values.newMember) {
      if (!room.memberList.includes(values.newMember)) {
        newMem = values.newMember;
      } else {
        alert(`Member ${values.newMember} already exist!`);
      }
    }

    const updRoom = {
      roomId: room.roomId,
      roomDesc: values.description || room.roomDesc,
      memberList: newMem ? [...room.memberList, newMem] : room.memberList,
    };
    try {
      const resUpdRoom = await updateRoom(updRoom);
      console.log("handleSubmit resUpdRoom=", resUpdRoom);
      setRoom(updRoom);
      //history.push(`/room/${id}`);
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  function deleteRoom() {
    console.log("deleteRoom id=", id);
    return API.del("room", `/room/${id}`);
  }
  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this Room?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteRoom();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  const deleteMember = (mem) => (event) => {
    if (mem === room.owner) {
      // ignore delete for owner member
      alert("You can't delete Owner!");
      return;
    }
    console.log("deleteMember mem=", mem);
    const newMembers = [...room.memberList];
    const ind = newMembers.indexOf(mem);
    newMembers.splice(ind, 1);
    const newRoom = { ...room, memberList: newMembers };
    setRoom(newRoom);
    console.log("deleteMember newRoom=", newRoom);
  };

  return (
    <div className="UpdateRoom">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <div class="col-sm-2">
            <ControlLabel align="center" style={{ marginTop: "10px" }}>
              Room Name
            </ControlLabel>
          </div>
          <div class="col-sm-10">
            <FormControl style={{ marginBottom: "5px" }} value={values.name} disabled />
          </div>
        </FormGroup>
        <FormGroup controlId="description">
          <FormControl
            style={{ height: "120px" }}
            componentClass="textarea"
            value={values.description}
            onChange={handleChange("description")}
          />
        </FormGroup>
        <ListGroup striped bordered hover size="sm">
          {room &&
            room.memberList.map((mem) => (
              <ListGroupItem onClick={deleteMember(mem)}>
                <span>
                  <Glyphicon glyph="trash" style={{ marginRight: "20px" }} />
                  {mem}
                </span>
              </ListGroupItem>
            ))}
        </ListGroup>
        <FormGroup controlId="newMember" bsSize="large">
          <div class="col-sm-2">
            <ControlLabel align="center" style={{ marginTop: "10px" }}>
              New Member
            </ControlLabel>
          </div>
          <div class="col-sm-10">
            <FormControl
              style={{ marginBottom: "5px" }}
              value={values.newMember}
              onChange={handleChange("newMember")}
            />
          </div>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Update
        </LoaderButton>
        <LoaderButton block bsSize="large" bsStyle="danger" onClick={handleDelete}>
          Delete
        </LoaderButton>
      </Form>
    </div>
  );
}
