import React, { useContext, useState, useReducer } from "react";
import { MainContext } from "../App";
import styled from "styled-components";
import ModalDetails from "./ModalDetails";
import Modal from "react-modal";
import AddUrl from "./AddUrl";
import { v4 as uuidv4 } from "uuid";
import api from "../api/data";
import { encryptData } from "../secure.js";

const initialState = {
  type: "account",
  details: {
    name: "",
    url: "",
    userName: "",
    theDetail: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TYPE":
      return { ...state, type: action.payload };
    case "ADD_NAME":
      return { ...state, details: { ...state.details, name: action.payload } };
    case "ADD_URL":
      return { ...state, details: { ...state.details, url: action.payload } };
    case "ADD_USERNAME":
      return {
        ...state,
        details: { ...state.details, userName: action.payload },
      };
    case "ADD_THEDETAILS":
      return {
        ...state,
        details: { ...state.details, theDetail: action.payload },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const CreateListContext = React.createContext();

Modal.setAppElement("#root");

const CreateList = ({ handleModalIsOpen, createListType }) => {
  const [listObject, dispatch] = useReducer(reducer, initialState);
  const mainContext = useContext(MainContext);
  const catAlias = {
    account: "Account",
    commandLine: "Command",
    note: "Note",
    bookmark: "Bookmark",
  };

  const data = mainContext.dataState.data;
  const uniqueList = [...new Set(data.map((list) => list.type))];
  const [listName, setListName] = useState("");
  const [addUrlModal, setAddUrlModal] = useState(false);

  const typeChange = (e) => {
    dispatch({ type: "ADD_TYPE", payload: e.target.value });
  };
  const nameChange = (e) => {
    setListName(e.target.value);
    dispatch({ type: "ADD_NAME", payload: e.target.value });
  };

  const handleModalUrl = () => {
    setAddUrlModal(false);
  };

  const createListPush = async () => {
    let postedObject = [];
    if (listObject.details.name && listObject.details.theDetail) {
      if (listObject.type === "account") {
        postedObject = {
          ...listObject,
          details: {
            ...listObject.details,
            theDetail: encryptData(listObject.details.theDetail),
          },
        };
      } else {
        postedObject = listObject;
      }
      const response = await api.post("/data", postedObject);
      dispatch({ type: "RESET" });
      mainContext.dataDispatch({
        type: "POST_A_LIST",
        payload: { id: uuidv4(), ...response.data },
      });
      handleModalIsOpen();
    } else {
      alert("Please Input the name and theDetail");
    }
  };
  return (
    <CreateListContext.Provider
      value={{ listObjectState: listObject, listDispatch: dispatch }}
    >
      <CreateListStyled>
        <div className="default-box">
          <div className="select-type-box">
            <div className="type-title">Type</div>
            <select
              className="select-type"
              value={listObject.type}
              onChange={typeChange}
            >
              {uniqueList.map((option, index) => (
                <option key={index} value={option}>
                  {catAlias[option]}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div className="detail-box">
            <div className="detail-title">Details</div>
            <div className="list-name-label">
              List Name
              {listObject.type === "account" && (
                <div className="add-url" onClick={() => setAddUrlModal(true)}>
                  +addURL
                </div>
              )}
              <Modal
                isOpen={addUrlModal}
                onRequestClose={() => setAddUrlModal(false)}
                style={modalStyle}
              >
                <AddUrl actionType="create" handleModalUrl={handleModalUrl} />
              </Modal>
            </div>
            <input
              type="text"
              className="input-field-name"
              onChange={nameChange}
              value={listName}
            />
          </div>
        </div>
        <ModalDetails actionType="create" type={listObject.type} />
        <div className="button-box">
          <button className="create-button" onClick={createListPush}>
            Create
          </button>
        </div>
      </CreateListStyled>
    </CreateListContext.Provider>
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
      background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='40' viewBox='0 0 24 24' width='40' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
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
    padding-bottom: 2rem;
    .create-button {
      cursor: pointer;
      width: 10vw;
      height: 5vh;
      font-size: 1.4rem;
      font-family: "Nunito", "Open Sans";
      font-weight: 700;
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

export default CreateList;
