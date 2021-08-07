import React, { useState, useContext } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { UpdateListContext } from "./UpdateList";

const ExpandedNote = ({ getMarkdownText, actionType }) => {
  const updateContext = useContext(UpdateListContext);
  const [markdownText, setMarkdownText] = useState(
    actionType === "create" ? "" : updateContext.listState.details.theDetail
  );
  const handleMarkdownChange = (e) => {
    e.preventDefault();
    setMarkdownText(e.target.value);
  };
  return (
    <ExpandedNoteStyled>
      <div className="container">
        <div className="markdown-text">
          <p className="title">Markdown Text</p>

          <textarea
            name="markdown-field"
            id="markdown-field"
            className="markdown-field"
            value={markdownText}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
        <div className="converted-text">
          <p className="title">Converted Text</p>
          <div className="converted-container">
            <ReactMarkdown
              className="converted-field"
              children={markdownText}
            />
          </div>
        </div>
      </div>
      <div className="button-box">
        <button
          className="submit-button"
          onClick={() => getMarkdownText(markdownText)}
        >
          Submit Note
        </button>
      </div>
    </ExpandedNoteStyled>
  );
};

export default ExpandedNote;

const ExpandedNoteStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .container {
    display: flex;
    width: 100%;
    height: 90%;
    border-radius: 20px;
    border: 1px solid #555;
    object-fit: cover;
    .title {
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 1rem;
      border-bottom: 1px solid #555;
    }
    > div {
      width: 100%;
    }
    .markdown-text {
      border-right: 1px solid #555;
    }
    textarea {
      width: 100%;
      height: 91%;
      background: #202020;
      border: none;
      resize: none;
      border-radius: 0 0 0 20px;
      padding: 1rem 2rem;
      color: #ddd;
      font-size: 1.2rem;
    }
  }
  .converted-container {
    width: 100%;
    height: 91%;
    background: #202020;
    border: none;
    resize: none;
    border-radius: 0 0 20px 0;
    padding: 1rem 2rem;
    color: #ddd;
    font-size: 1.2rem;
    overflow: auto;
  }
  .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    .submit-button {
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
