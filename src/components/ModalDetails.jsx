import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CreateListContext } from "./CreateList";
import { UpdateListContext } from "./UpdateList";
import Modal from "react-modal";
import ExpandedNote from "./ExpandedNote";

const ModalDetails = ({ type, actionType }) => {
  const detailContext = useContext(CreateListContext);
  const updateContext = useContext(UpdateListContext);
  const [isExpandNote, setIsExpandNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  const modalStyleNote = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      top: "2%",
      left: "10%",
      right: "10%",
      bottom: "10%",
      borderRadius: "20px",
      padding: "2rem 3rem",
      margin: 0,
      backgroundColor: "#333333",
      border: "none",
      color: "#eee",
    },
  };

  const userNameChange = (e) => {
    detailContext.listDispatch({
      type: "ADD_USERNAME",
      payload: e.target.value,
    });
  };
  const theDetailsUpdate = (e) => {
    updateContext.setListState({
      ...updateContext.listState,
      details: {
        ...updateContext.listState.details,
        theDetail: e.target.value,
      },
    });
  };

  const userNameUpdate = (e) => {
    updateContext.setListState({
      ...updateContext.listState,
      details: {
        ...updateContext.listState.details,
        userName: e.target.value,
      },
    });
  };

  const theDetailsChange = (e) => {
    if (type === "note") {
      setNoteValue(e.target.value);
    }
    detailContext.listDispatch({
      type: "ADD_THEDETAILS",
      payload: e.target.value,
    });
  };

  const getMarkdownText = (theText) => {
    setNoteValue(theText);
    setIsExpandNote(false);
    if (actionType === "create") {
      detailContext.listDispatch({
        type: "ADD_THEDETAILS",
        payload: theText,
      });
    } else {
      updateContext.setListState({
        ...updateContext.listState,
        details: {
          ...updateContext.listState.details,
          theDetail: theText,
        },
      });
    }
  };

  return (
    <ModalDetailStyled type={type}>
      {type === "account" ? (
        <div className="group-account">
          <p>User Name</p>
          {actionType === "create" ? (
            <input
              type="text"
              className="username-account"
              onChange={userNameChange}
            />
          ) : (
            <input
              type="text"
              className="username-account"
              value={updateContext.listState.details.userName}
              onChange={userNameUpdate}
            />
          )}
          <p>Password</p>
          {actionType === "create" ? (
            <input
              type="password"
              className="password-account"
              onChange={theDetailsChange}
            />
          ) : (
            <input
              type="password"
              className="password-account"
              value={updateContext.listState.details.theDetail}
              onChange={theDetailsUpdate}
            />
          )}
        </div>
      ) : type === "commandLine" ? (
        <div className="group-command">
          <p>Command</p>
          {actionType === "create" ? (
            <input
              type="text"
              className="line-command"
              onChange={theDetailsChange}
            />
          ) : (
            <input
              type="text"
              className="line-command"
              value={updateContext.listState.details.theDetail}
              onChange={theDetailsUpdate}
            />
          )}
        </div>
      ) : type === "note" ? (
        <div className="group-note">
          <div className="title-note">
            <p>Note</p>
            <div className="expand-note" onClick={() => setIsExpandNote(true)}>
              +expand
            </div>
            <Modal
              isOpen={isExpandNote}
              onRequestClose={() => setIsExpandNote(false)}
              style={modalStyleNote}
            >
              <ExpandedNote
                actionType={actionType}
                getMarkdownText={getMarkdownText}
              />
            </Modal>
          </div>
          {actionType === "create" ? (
            <textarea
              name="note-textarea"
              id="note-textarea"
              onChange={theDetailsChange}
              value={noteValue}
            ></textarea>
          ) : (
            <textarea
              name="note-textarea"
              id="note-textarea"
              onChange={theDetailsUpdate}
              value={updateContext.listState.details.theDetail}
            ></textarea>
          )}
        </div>
      ) : type === "bookmark" ? (
        <div className="group-bookmark">
          <p>Bookmark</p>
          {actionType === "create" ? (
            <input
              type="text"
              className="link-bookmark"
              onChange={theDetailsChange}
            />
          ) : (
            <input
              type="text"
              className="link-bookmark"
              value={updateContext.listState.details.theDetail}
              onChange={theDetailsUpdate}
            />
          )}
        </div>
      ) : null}
    </ModalDetailStyled>
  );
};

const ModalDetailStyled = styled.div`
  width: 100%;
  padding: 0rem 3rem 2rem;
  ${({ type }) =>
    type === "account" &&
    `display: flex;
  justify-content: center;
  align-items: center;`}

  .group-account {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    width: 80%;
    height: auto;
    border: 1px solid #444;
    p {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      color: #d0d0d0;
    }
    .username-account,
    .password-account {
      text-align: center;
      width: 70%;
      background: #444444;
      color: #d0d0d0;
      font-size: 1rem;
      border-radius: 10px;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      border: 0.5px solid #777;
      margin-bottom: 1rem;
    }
  }
  .group-command {
    font-size: 1.2rem;
    font-weight: bold;
    color: #d0d0d0;
    p {
      margin-bottom: 0.5rem;
    }
    .line-command {
      width: 100%;
      background: #444444;
      color: #d0d0d0;
      font-size: 1rem;
      border-radius: 10px;
      padding: 1rem;
      border: 0.5px solid #777;
    }
  }
  .group-note {
    font-size: 1.2rem;
    font-weight: bold;
    color: #d0d0d0;
    .title-note {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 0.5rem;
      p {
      }
      .expand-note {
        margin-left: 0.3rem;
        margin-top: 0.1rem;
        font-size: 1rem;
        color: #13ae47;
        cursor: pointer;
      }
    }
    textarea {
      width: 100%;
      background: #444444;
      color: #d0d0d0;
      height: 15rem;
      font-size: 1rem;
      border-radius: 10px;
      padding: 1rem;
      border: 0.5px solid #777;
    }
  }
  .group-bookmark {
    font-size: 1.2rem;
    font-weight: bold;
    color: #d0d0d0;
    p {
      margin-bottom: 0.5rem;
    }
    .link-bookmark {
      width: 100%;
      background: #444444;
      color: #d0d0d0;
      font-size: 1rem;
      border-radius: 10px;
      padding: 1rem;
      border: 0.5px solid #777;
    }
  }
`;

export default ModalDetails;
