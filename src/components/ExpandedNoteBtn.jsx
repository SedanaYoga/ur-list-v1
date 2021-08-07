import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { MainContext } from '../App.js'

const ExpandedNoteBtn = ({ noteExpandedID }) => {
  const mainContext = useContext(MainContext)
  const { data } = mainContext.dataState
  const noteData = data.filter((data) => data.id === noteExpandedID)
  return (
    <ExpandedNoteBtnStyled>
      <div className="converted-text">
        <p className="title">{noteData[0].details.name}</p>
        <div className="converted-container">
          <ReactMarkdown
            className="converted-field"
            children={noteData[0].details.theDetail}
          />
        </div>
      </div>
    </ExpandedNoteBtnStyled>
  )
}

const ExpandedNoteBtnStyled = styled.div`
  .converted-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #eee;
      text-align: center;
      padding: 0.5rem 3rem;
      border: 0.5px solid #13ae47;
      border-radius: 30px;
      margin-bottom: 1rem;
    }
    .converted-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 310px;
      padding: 1rem 2rem;
      max-height: 60vh;
      font-size: 1.2rem;
      color: #ccc;
      overflow: auto;
      margin-bottom: 1.5rem;
      position: relative;
      border-left: 1px solid #555;
      pre {
        padding: 0 1rem;
        position: absolute;
        overflow-x: auto;
        /* white-space: pre-wrap; */
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
      }
    }
  }
`

export default ExpandedNoteBtn
