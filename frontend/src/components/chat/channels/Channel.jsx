import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { channelsActions } from "../../../slices/channelsSlice";

const Channel = ({ channel, showModal }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();

  const setCurrent = (id) => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  if (removable) {
    return (
      <Nav.Item key={id} as="li" className="w-100">
        <Dropdown className="d-flex btn-group">
          <Button
            variant={id === currentChannelId ? "secondary" : "light"}
            className="btn w-100 rounded-0 text-start"
            onClick={() => setCurrent(id)}
          >
            {name}
          </Button>
          <Dropdown.Toggle
            variant={id === currentChannelId ? "secondary" : "light"}
            className="flex-grow-0 dropown-toggle-split"
          >
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal("removeChannel", name, id)}>
              Удалить
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal("renameChannel", name, id)}>
              Переименовать
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <li key={id} className="nav-item w-100">
      <Button
        variant={id === currentChannelId ? "secondary" : "light"}
        className="btn w-100 rounded-0 text-start"
        onClick={() => setCurrent(id)}
      >
        {name}
      </Button>
    </li>
  );
};

export default Channel;
