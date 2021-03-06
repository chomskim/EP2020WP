import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useMainContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { CONSTANTS } from "../libs/constants";

import "./RoomList.css";

export default function RoomList() {
  const { state, reducer } = useMainContext();
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!state.auth.isAuthenticated) {
      return;
    }
    try {
      //console.log("RoomList email=", state.auth.userId);
      let rooms = await loadroomList();
      //console.log("rooms=", rooms);
      rooms = rooms.map((rm) => {
        if (!Array.isArray(rm.memberList)) {
          return { ...rm, memberList: JSON.parse(rm.memberList) };
        } else return rm;
      });

      //console.log("rooms=", rooms);
      rooms.unshift(CONSTANTS.NO_ROOM);
      reducer({ type: "setRoomList", payload: rooms });
      reducer({ type: "setCurRoom", payload: CONSTANTS.NO_ROOM });
      setRoomList(rooms);
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  function loadroomList() {
    //return API.get("room", `/room/owner/${state.auth.userId}`);
    return API.get("room", `/room/member/${state.auth.userId}`);
  }

  const handleRoomSelect = (rm) => (event) => {
    //console.log("handleRoomSelect rm =", rm);
    reducer({ type: "setCurRoom", payload: rm });
  }

  function renderRoomList(rooms) {
    return rooms.map((room, i) => (
      <ListGroupItem
        key={room.roomId}
        header={room.roomId}
        style={{ display: "flex" }}
        onClick={handleRoomSelect(room)}
      >
        {room.owner && (
          <>
            <span align="center" style={{ position: "absolute", right: 230, top: 15 }}>
              {"Created: " + new Date(room.created).toISOString().substring(0, 10)}
            </span>
            <span align="center" style={{ position: "absolute", right: 60, top: 15 }}>
              {"Updated: " + new Date(room.updated).toISOString().substring(0, 10)}
            </span>
            {state.auth.userId === room.owner && (
              <LinkContainer style={{ position: "absolute", right: 5, top: 10 }} to={`/room/${room.roomId}`}>
                <Button>
                  <Glyphicon glyph="pencil" className="fill" />
                </Button>
              </LinkContainer>
            )}
          </>
        )}
      </ListGroupItem>
    ));
  }

  return <div className="RoomList">{state.auth.isAuthenticated && renderRoomList(roomList)}</div>;
}
