import React, { useState, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { ReactComponent as TwitterLogo } from "../images/twitter-brands.svg";
import { ReactComponent as LinkedInLogo } from "../images/linkedin.svg";
import { ReactComponent as GithubLogo } from "../images/github.svg";
import { ReactComponent as SearchLogo } from "../images/search.svg";
import CreateList from "./CreateList";
import { MainContext } from "../App";

const modalStyle = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  content: {
    position: "absolute",
    top: "8%",
    left: "15%",
    right: "45%",
    bottom: "auto",
    borderRadius: "0 20px 20px 20px",
    padding: 0,
    margin: 0,
    backgroundColor: "#333333",
    border: "none",
    color: "#eee",
  },
};

Modal.setAppElement("#root");
function NavBar() {
  const mainContext = useContext(MainContext);
  const { searchQuery } = mainContext.dataState;
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const handleModalIsClosed = (e) => {
    setModalIsOpened(false);
  };

  const searchChangeHandle = (e) => {
    mainContext.dataDispatch({ type: "SEARCH_LIST", payload: e.target.value });
  };
  return (
    <NavBarStyled>
      {/* LOGO */}
      <div className="left-part">
        <div className="logo-box">
          <p className="text-logo">urList</p>
        </div>
      </div>
      <div className="right-part">
        {/* CREATE BAR */}
        <div className="create-bar">
          <button
            className="create-button"
            onClick={() => setModalIsOpened(true)}
          >
            Create List
          </button>
          <Modal
            isOpen={modalIsOpened}
            onRequestClose={() => setModalIsOpened(false)}
            style={modalStyle}
          >
            <CreateList
              handleModalIsOpen={handleModalIsClosed}
              createListType="new"
            />
          </Modal>
          <button className="select-button">
            <div className="select-triangle"></div>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="search-bar">
          <div className="search-box">
            {/* 1. Search icon */}
            {/* 2. Line beside icon (use border) */}
            <div className="search-icon">
              <SearchLogo />
            </div>
            {/* 3. Box for searching */}
            <input
              type="text"
              className="search-field"
              placeholder="Search"
              value={searchQuery}
              onChange={searchChangeHandle}
            ></input>
          </div>
        </div>

        {/* MENU BAR */}
        <div className="nav-menu">
          <ul>
            <li>
              <a
                className="sosmed-logo"
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/Cok_Yoga"
              >
                <TwitterLogo className="sosmed-logo" />
              </a>
              <a
                className="sosmed-logo"
                rel="noreferrer"
                target="_blank"
                href="www.linkedin.com/in/sedanayoga"
              >
                <LinkedInLogo className="sosmed-logo" />
              </a>
              <a
                className="sosmed-logo"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/SedanaYoga"
              >
                <GithubLogo className="sosmed-logo" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </NavBarStyled>
  );
}

const NavBarStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10vh;
  background: #000;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  .left-part {
    display: flex;
    justify-content: center;
    flex: 0.3;
    color: #000;
    /* background: blue; */
    font-weight: 700;
    font-size: 1.5rem;
    .logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 10vh;
      background-color: #fff;
      background-image: linear-gradient(#ddd 2px, transparent 2px),
        linear-gradient(90deg, #ddd 2px, transparent 2px),
        linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
      background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
      background-size: 100px 60px;
      border-top: 5px solid #000;
    }
  }

  .right-part {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1.7;
    .create-bar {
      display: flex;
      flex: 0.35;
      justify-content: flex-start;
      .create-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 150px;
        height: 55px;
        font-size: 1.4rem;
        font-family: "Nunito", "Open Sans";
        font-weight: 700;
        color: white;
        background: #13ae47;
        border-radius: 7px 0 0 7px;
        border: none;
        border-right: 2px solid #0e8d39;
        transition-duration: 0.2s;
        outline: none;
        :hover {
          background-color: #0e8d39; /* Green */
          color: #d8d8d8;
        }
      }
      .select-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        border-radius: 0 7px 7px 0;
        cursor: not-allowed;
        background: #13ae47;
        border: none;
        transition-duration: 0.2s;
        outline: none;
        .select-triangle {
          width: 0;
          height: 0;
          border-left: 0.4rem solid transparent;
          border-right: 0.4rem solid transparent;
          border-top: 0.4rem solid #fff;
        }
        :hover {
          background-color: #0e8d39; /* Green */
          color: #d8d8d8;
        }
      }
    }
    .search-bar {
      display: flex;
      flex: 0.4;
      /* background: red; */
      .search-box {
        height: 40px;
        width: 500px;
        background: #f4f4f9;
        border-radius: 20px;
        border: 2px solid #606060;
        display: flex;
        align-items: center;
        .search-icon {
          display: flex;
          width: 50px;
          height: 80%;
          position: relative;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #d2d2d2;
        }
        .search-field {
          width: 85%;
          height: 35px;
          border: none;
          padding-left: 10px;
          font-weight: 700;
          font-family: "Nunito";
          font-size: 1rem;
          color: #606060;
          background: #f4f4f9;
        }
      }
    }
    .nav-menu {
      flex: 1;
      /* background: green; */
      ul {
        display: flex;
        justify-content: flex-end;
        padding-right: 15%;

        li {
          display: flex;
          align-items: center;
          margin-left: 140px;
          list-style-type: none;
          a {
            text-decoration: none;
            color: #fff;
          }
          .sosmed-logo {
            top: 10px;
            margin-left: 50px;
            height: 25px;
            width: 25px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default NavBar;
