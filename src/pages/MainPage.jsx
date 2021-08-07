import React, { useContext, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { MainContext } from "../App";
import ListForm from "../components/ListForm";
import NumOfList from "../components/NumOfList";
import Modal from "react-modal";
import api from "../api/data";
import UpdateList from "../components/UpdateList";
import ExpandedNoteBtn from "../components/ExpandedNoteBtn";

Modal.setAppElement("#root");

function MainPage() {
  const mainContext = useContext(MainContext);
  const prevChecked = useRef([]);
  const { data, checkedCheckbox, searchQuery } = mainContext.dataState;
  const uniqueList = [...new Set(data.map((list) => list.type))];
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [noteModalIsExpanded, setNoteModalIsExpanded] = useState(false);
  const [editID, setEditID] = useState("");
  const [noteExpandedID, setNoteExpandedID] = useState("");

  useEffect(() => {
    prevChecked.current = checkedCheckbox;
  }, [checkedCheckbox]);

  const catAlias = {
    account: "Account",
    commandLine: "Command",
    note: "Note",
    bookmark: "Bookmark",
  };

  const deleteListHandler = async (id) => {
    await api.delete(`/data/${id}`);
    const newData = data.filter((list) => {
      return list.id !== id;
    });
    mainContext.dataDispatch({ type: "ADD_LIST", payload: newData });
  };

  const editListHandler = (id) => {
    setEditModalIsOpen(true);
    setEditID(id);
  };

  const expandBtnHandler = (id) => {
    setNoteModalIsExpanded(true);
    setNoteExpandedID(id);
  };

  const search = (data) => {
    const detailKey = data[0].details && Object.keys(data[0].details);
    return data.filter((list) =>
      detailKey.some(
        (key) =>
          list.details[key]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) > -1
      )
    );
  };
  return (
    <MainContainerStyled>
      <div className="left-bar">
        <div className="profile">
          <div className="photo-profile">
            <img
              src="https://lh3.googleusercontent.com/ba4Z2iXCeVEk95RwVy2x6JZIMIfXGwS54b1OrtywDlTEdWkYy7CRL8B5eCiCBBFEZWWtXyLDy8ISgJkZTQGuntDrFxswOq6JzsRMC7f5bJTl6dMlvasFGUxQRTknrBfBofYyhqrz=s250-p-k"
              alt="foto"
            />
          </div>
          <div className="detail-profile">
            <div>
              <p className="name">Sedana Yoga</p>
              <p className="job-title">TEST ANALYST</p>
            </div>
          </div>
        </div>
        <div className="filter">
          <div className="filter-title">
            <p>filters!!!</p>
          </div>
          <CheckboxStyled>
            {uniqueList.map((filterName, index) => (
              <label className="checkbox-container" key={index}>
                {"#" + catAlias[filterName].toLowerCase()}
                <input
                  key={index}
                  type="checkbox"
                  checked={checkedCheckbox.includes(filterName)}
                  onChange={(e) => {
                    const checked = checkedCheckbox.includes(filterName);
                    mainContext.dataDispatch({
                      type: "SELECT_CHECKBOX",
                      payload: checked
                        ? prevChecked.current.filter(
                            (alreadyChecked) => alreadyChecked !== filterName
                          )
                        : [...prevChecked.current, filterName],
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </CheckboxStyled>
        </div>
      </div>
      <div className="content">
        <div className="content-title">
          {checkedCheckbox.map((catName, index) => (
            <span key={index}>
              {catAlias[catName][0].toUpperCase() +
                catAlias[catName].substring(1)}
              <NumOfList
                number={data.filter((list) => list.type === catName).length}
              />
            </span>
          ))}
        </div>
        <ContentListStyled>
          {checkedCheckbox.map((type, index) => (
            <div key={index}>
              {search(data)
                // Divide list based on type
                .filter((list) => list.type === type)
                // Map the list to table
                .map((list) => (
                  <ListForm
                    key={list.id}
                    deleteListHandler={deleteListHandler}
                    editListHandler={editListHandler}
                    expandBtnHandler={expandBtnHandler}
                    data={list}
                    type={type}
                  />
                ))}
              <Modal
                isOpen={editModalIsOpen}
                onRequestClose={() => setEditModalIsOpen(false)}
                style={modalStyle}
              >
                <UpdateList
                  handleModalIsOpen={() => setEditModalIsOpen(false)}
                  editID={editID}
                />
              </Modal>
              <Modal
                isOpen={noteModalIsExpanded}
                onRequestClose={() => setNoteModalIsExpanded(false)}
                style={modalStyleExpand}
              >
                <ExpandedNoteBtn noteExpandedID={noteExpandedID} />
              </Modal>
            </div>
          ))}
        </ContentListStyled>
      </div>
    </MainContainerStyled>
  );
}

const modalStyle = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
  content: {
    position: "absolute",
    top: "10%",
    left: "30%",
    right: "30%",
    bottom: "auto",
    borderRadius: "20px",
    padding: "1rem 1rem",
    margin: 0,
    backgroundColor: "#333333",
    color: "#eee",
    border: "1px solid #ccc",
  },
};
const modalStyleExpand = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
  content: {
    position: "absolute",
    top: "10%",
    left: "25%",
    right: "25%",
    bottom: "auto",
    borderRadius: "30px",
    border: "1px solid #ccc",
    padding: "2rem 3rem 1rem 3rem",
    margin: 0,
    backgroundColor: "#333333",
    // border: "none",
  },
};

const ContentListStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 83vh;
  > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: auto;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    /* padding-top: 20px; */
  }
`;

const MainContainerStyled = styled.div`
  display: flex;
  height: 90vh;
  .left-bar {
    flex: 0.3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    background: #121212;
    .profile {
      width: 156px;
      height: 280px;
      .photo-profile {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 170px;
        background: #c30b4e;
        border-radius: 8px 8px 0 0;
      }
      .detail-profile {
        display: flex;
        justify-content: center;
        background: #fff;
        height: 100%;
        div {
          margin-top: 0.7rem;
          p {
            width: 5rem;
            margin-right: 1rem;
            font-size: 1.1rem;
            font-weight: bold;
          }
          .job-title {
            margin-top: 8px;
            font-size: 0.6rem;
            color: #de2520;
          }
        }
      }
    }
    .filter {
      background: #121212;
      height: 30vh;
      width: 100%;
      .filter-title {
        background: #1f1f1f;
        height: 6vh;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 1.5rem;
          color: #9a9a9a;
          font-weight: bold;
          font-style: italic;
        }
      }
    }
  }
  .content {
    flex: 1.7;
    background-image: url(https://lh3.googleusercontent.com/65sZfaQqI01LEsewjEHtfgIif1oi3wjJ6nYArQkS29uIW0U9q1gjI8zuFq7ondmLLF7yXh5RR2U75ann_lQsZWQIBUHF_oiMkaDLqOMx2NO6BcwiR9AZJ0sFm68EU5wwk7b1rz0=w2400);
    background-repeat: repeat;
    height: 90vh;
    .content-title {
      width: 100%;
      height: 6vh;
      background: #1f1f1f;
      border-top: 2px solid #13ae47;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #bcbcbc;
      border-bottom: 2px solid #171717;
      margin-bottom: 1vh;
      span {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-top: -8px;
        font-weight: 600;
        font-size: 1.1rem;
        width: 100%;
        height: 100%;
        padding: 5px 0 0 20px;
      }
    }
  }
`;

const CheckboxStyled = styled.div`
  margin-top: 1rem;
  margin-left: 4.2rem;
  .checkbox-container {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1.3rem;
    color: #a7a7a7;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 8px;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #eee;
    border-radius: 20%;
  }

  /* On mouse-over, add a grey background color */
  .checkbox-container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .checkbox-container input:checked ~ .checkmark {
    background-color: #13ae47;
  }
`;

export default MainPage;
