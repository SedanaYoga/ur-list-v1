import React, { useContext, useState } from "react";
import { MainContext } from "../App";
import styled from "styled-components";
import ModalDetails from "./ModalDetails";
import Modal from "react-modal";
import AddUrl from "./AddUrl";
import api from "../api/data";

export const UpdateListContext = React.createContext();

Modal.setAppElement("#root");

const UpdateList = ({ handleModalIsOpen, editID }) => {
  const mainContext = useContext(MainContext);
  const data = mainContext.dataState.data;

  const dataToEdit = data.filter((list) => list.id === editID);
  const listToEdit = dataToEdit[0];
  const [newEditedList, setNewEditedList] = useState(listToEdit);
  const [addUrlModal, setAddUrlModal] = useState(false);

  const nameChange = (e) => {
    setNewEditedList({
      ...newEditedList,
      details: { ...newEditedList.details, name: e.target.value },
    });
  };

  const handleModalUrl = () => {
    setAddUrlModal(false);
  };

  const updateListPush = async () => {
    const response = await api.put(`/data/${newEditedList.id}`, newEditedList);
    const newListMapping = data.map((list) => {
      return list.id === response.data.id ? { ...response.data } : list;
    });
    mainContext.dataDispatch({ type: "ADD_LIST", payload: newListMapping });
    handleModalIsOpen();
  };

  return (
    <UpdateListContext.Provider
      value={{ listState: newEditedList, setListState: setNewEditedList }}
    >
      <CreateListStyled>
        <div className="default-box">
          <div className="select-type-box">
            <div className="type-title">Type</div>
            <select className="select-type" value={listToEdit.type} disabled>
              <option value="account">Account</option>
              <option value="commandLine">Command</option>
              <option value="note">Note</option>
              <option value="bookmark">Bookmark</option>
            </select>
          </div>
          <hr />
          <div className="detail-box">
            <div className="detail-title">Details</div>
            <div className="list-name-label">
              List Name
              {listToEdit.type === "account" && (
                <div className="add-url" onClick={() => setAddUrlModal(true)}>
                  +addURL
                </div>
              )}
              <Modal
                isOpen={addUrlModal}
                onRequestClose={() => setAddUrlModal(false)}
                style={modalStyle}
              >
                <AddUrl actionType="edit" handleModalUrl={handleModalUrl} />
              </Modal>
            </div>
            <input
              type="text"
              className="input-field-name"
              onChange={nameChange}
              value={newEditedList.details.name}
            />
          </div>
        </div>
        <ModalDetails actionType="edit" type={listToEdit.type} />
        <div className="button-box">
          <button className="update-button" onClick={updateListPush}>
            Update
          </button>
        </div>
      </CreateListStyled>
    </UpdateListContext.Provider>
  );
};

const CreateListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  .select-type-box {
    width: 100%;
    padding: 1rem 3rem 1.5rem;
    .type-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      height: auto;
      font-size: 1.7rem;
      font-weight: bold;
      color: #8d8d8d;
      padding: 10px;
      border: 2px solid #424242;
      border-radius: 7px;
      margin-bottom: 1rem;
    }
    .select-type {
      width: 100%;
      height: auto;
      background: #444444;
      color: #8d8d8d;
      font-size: 1.2rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='#444444' height='40' viewBox='0 0 24 24' width='40' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position-x: 99%;
      background-position-y: 50%;
      border-radius: 10px;
      padding: 1rem;
    }
  }
  hr {
    border: 0.5px solid #444;
  }
  .detail-box {
    width: 100%;
    padding: 1.5rem 3rem 1rem;
    .detail-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: auto;
      font-size: 1.7rem;
      font-weight: bold;
      color: #8d8d8d;
      padding: 1rem;
      border: 2px solid #424242;
      border-radius: 7px;
      margin-bottom: 1rem;
    }
  }
  .list-name-label {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #d0d0d0;
    .add-url {
      margin-left: 0.3rem;
      font-size: 1rem;
      color: #13ae47;
      cursor: pointer;
    }
  }
  .input-field-name {
    width: 100%;
    background: #444444;
    color: #d0d0d0;
    font-size: 1rem;
    border-radius: 10px;
    padding: 1rem;
    border: 0.5px solid #777;
  }
  .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-bottom: 1rem; */
    .update-button {
      cursor: pointer;
      width: 10vw;
      height: 5vh;
      font-size: 1.4rem;
      font-family: "Open Sans";
      font-weight: bold;
      color: white;
      background: #13ae47;
      border-radius: 10px;
      border: none;
      transition-duration: 0.2s;
      outline: none;
      :hover {
        background-color: #0e8d39; /* Green */
        color: #d8d8d8;
      }
    }
  }
`;

const modalStyle = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  content: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "20%",
    left: "25%",
    right: "25%",
    bottom: "45%",
    borderRadius: "20px",
    padding: "2rem 3rem",
    margin: 0,
    backgroundColor: "#333333",
    border: "none",
    color: "#eee",
  },
};

export default UpdateList;
