import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import { createGlobalStyle } from "styled-components";
import React, { useEffect, useReducer } from "react";
import axios from "axios";

export const MainContext = React.createContext();

const initialState = {
  data: [],
  checkedCheckbox: [],
  searchQuery: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return { ...state, data: action.payload };
    case "SELECT_CHECKBOX":
      return { ...state, checkedCheckbox: action.payload };
    case "EDIT_CHECKBOX":
      return { ...state, checkedCheckbox: action.payload };
    case "POST_A_LIST":
      return { ...state, data: [...state.data, action.payload] };
    case "SEARCH_LIST":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

function App() {
  const [dataState, dispatch] = useReducer(reducer, initialState);
  const fetchData = () => {
    axios
      .get("http://localhost:3005/data")
      .then((response) => {
        const allData = response.data;
        if (allData !== null) {
          dispatch({ type: "ADD_LIST", payload: allData });
          dispatch({
            type: "SELECT_CHECKBOX",
            payload: [...new Set(allData.map((list) => list.type))],
          });
        }
      })
      .catch((error) => console.error(`HMM APA NII: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <GlobalComponent />
      <MainContext.Provider
        value={{ dataState: dataState, dataDispatch: dispatch }}
      >
        <NavBar />
        <MainPage />
      </MainContext.Provider>
    </div>
  );
}

const GlobalComponent = createGlobalStyle`
*,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
select:focus,
input:focus,
textarea:focus {
  outline: none;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2f2f2f;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #3f3f3f;
}

body {
  background: #1f1f1f;
  font-family: "Nunito", "Open Sans", sans-serif;
}

`;

export default App;
