import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../images/delete-icon.svg";
import { ReactComponent as EditIcon } from "../images/edit-icon.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { decryptData } from "../secure";

const ListForm = ({
  data,
  type,
  deleteListHandler,
  editListHandler,
  expandBtnHandler,
}) => {
  const { id, details } = data;
  const { name, url, userName, theDetail } = details;
  const outputDetail = type === "account" ? decryptData(theDetail) : theDetail;
  const [clickedCopy, setClickedCopy] = useState(false);
  const [clickedCopyUn, setClickedCopyUn] = useState(false);

  return (
    <ListStyled
      type={type}
      clickedCopy={clickedCopy}
      clickedCopyUn={clickedCopyUn}
    >
      <div className="list_container">
        <div className="side_line">
          <div className="block_line"></div>
        </div>
        <div className="main_part">
          <div className="icons">
            <EditIcon onClick={() => editListHandler(id)} />
            <DeleteIcon onClick={() => deleteListHandler(id)} />
          </div>
          <div className="top_part">
            <div className="list_name">
              <p>{name}</p>
            </div>
            {type === "account" && (
              <div className="list_url">
                <p>{url}</p>
              </div>
            )}
          </div>
          <div className="bot_part">
            {type === "account" && (
              <CopyToClipboard
                text={userName}
                onCopy={() => setClickedCopyUn(!clickedCopyUn)}
              >
                <p
                  className="list_username"
                  onClick={setTimeout(() => setClickedCopyUn(false), 2000)}
                >
                  {!clickedCopyUn ? userName : "COPIED!"}
                </p>
              </CopyToClipboard>
            )}
            <CopyToClipboard
              text={outputDetail}
              onCopy={() => setClickedCopy(!clickedCopy)}
            >
              {type !== "note" ? (
                <input
                  type={
                    type === "account" && clickedCopy === false
                      ? "password"
                      : "text"
                  }
                  className=" detail_style input_detail"
                  value={!clickedCopy ? outputDetail : "COPIED!"}
                  onClick={setTimeout(() => setClickedCopy(false), 2000)}
                  readOnly
                />
              ) : (
                <button
                  onClick={() => expandBtnHandler(id)}
                  className="detail_style btn_detail"
                >
                  +expand
                </button>
              )}
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </ListStyled>
  );
};

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  .list_container {
    display: flex;
    flex-direction: row;
    width: 350px;
    height: auto;
    border-radius: 6px 20px 20px 6px;
    .side_line {
      flex: 0.1;
      background: #13ae47;
      border-radius: 6px 0 0 6px;
    }
    .main_part {
      flex: 10;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      position: relative;
      .icons {
        position: absolute;
        right: 0;
        margin: 7px;
        > svg {
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .top_part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 3rem;
        background: rgb(29, 29, 29, 0.7);
        border-radius: 0 6px 0 0;
        padding: 0.5rem;
        .list_name {
          width: 70%;
          p {
            color: #c6c6c6;
            font-weight: 700;
            font-size: 1.1rem;
            text-align: center;
          }
        }
        .list_url {
          color: #8b8b8b;
          font-weight: 600;
          font-size: 0.8rem;
        }
      }
      .bot_part {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 1rem;
        background: rgb(82, 82, 82);
        background: linear-gradient(
          90deg,
          rgba(82, 82, 82, 0.2) 0%,
          rgba(65, 65, 65, 0.2) 100%
        );
        border-radius: 0 0 6px 0;
        .list_username {
          font-size: 1rem;
          font-weight: 600;
          color: ${({ clickedCopyUn }) =>
            !clickedCopyUn ? `#c6c6c6` : `#13ae47`};
          margin-top: 0.3rem;
          cursor: pointer;
        }
        .input_detail {
          padding: 1rem;
          font-size: ${({ type, clickedCopy }) =>
            type === "account" && !clickedCopy ? `1.2rem` : `0.9rem`};
          font-weight: ${({ clickedCopy }) =>
            !clickedCopy ? `normal` : `700`};
          height: 1.7rem;
          width: 85%;
          margin: ${({ type }) =>
            type === "account" ? `0.5rem 0 1rem 0` : `1rem`};
          color: ${({ clickedCopy }) => (!clickedCopy ? `#a9a9a9` : `#13ae47`)};
        }
        .btn_detail {
          font-weight: 700;
          font-size: 1rem;
          height: 2rem;
          width: 40%;
          margin: 0.7rem;
          color: #a9a9a9;
        }
        .detail_style {
          text-align: center;
          background: #3b3b3b;
          font-family: "Nunito";
          border: 2px solid #383838;
          border-radius: 30px;
          cursor: pointer;
        }
      }
    }
  }
`;

export default ListForm;
