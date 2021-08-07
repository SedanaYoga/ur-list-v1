import React, { useContext } from "react";
import styled from "styled-components";
import { CreateListContext } from "./CreateList";
import { UpdateListContext } from "./UpdateList";

const AddUrl = ({ handleModalUrl, actionType }) => {
  const detailContext = useContext(CreateListContext);
  const updateContext = useContext(UpdateListContext);

  return (
    <AddUrlStyled>
      <div className="detail-title">Input your URL</div>
      {actionType === "create" ? (
        <input
          type="text"
          className="url-field"
          onChange={(e) =>
            detailContext.listDispatch({
              type: "ADD_URL",
              payload: e.target.value,
            })
          }
        />
      ) : (
        <input
          type="text"
          className="url-field"
          value={updateContext.listState.details.url}
          onChange={(e) =>
            updateContext.setListState({
              ...updateContext.listState,
              details: {
                ...updateContext.listState.details,
                url: e.target.value,
              },
            })
          }
        />
      )}
      <button type="submit" className="submit-button" onClick={handleModalUrl}>
        Submit
      </button>
    </AddUrlStyled>
  );
};

const AddUrlStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  .detail-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: auto;
    font-size: 1.7rem;
    font-weight: bold;
    color: #8d8d8d;
    padding: 10px;
    border: 2px solid #424242;
    border-radius: 7px;
    margin-bottom: 1rem;
  }
  .url-field {
    width: 100%;
    background: #444444;
    color: #d0d0d0;
    font-size: 1rem;
    border-radius: 10px;
    padding: 1rem;
    border: 0.5px solid #777;
  }
  .submit-button {
    width: 10vw;
    height: 5vh;
    font-size: 1.4rem;
    font-family: Open Sans;
    font-weight: bold;
    color: white;
    background: #13ae47;
    border-radius: 10px;
    border: none;
    transition-duration: 0.2s;
    margin-top: 1rem;
    :hover {
      background-color: #0e8d39; /* Green */
      color: #d8d8d8;
    }
  }
`;
export default AddUrl;
