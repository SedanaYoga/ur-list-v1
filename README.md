## urList

<h1 align="center">
  <img src="https://github.com/SedanaYoga/ur-list/blob/main/src/images/logo.png" alt="logo" width="320">
</h1>

urList, which stands for **ur**gent **list**, is a project that was intended to simplify my work. As a test analyst, I had to memorize a lot of accounts, commandline, notes from seniors, etc. So, I created this to make it easier to see/retrieve my data. I know, don't judge me, I don't care, can't wait for the final result 🎉🎉🎉

## Motivation

I'm too lazy to copy paste my note from notepad or other useless app.

## Screenshot

- Overall UI
<h1 align="center">
  <img src="https://github.com/SedanaYoga/ur-list/blob/main/src/images/mainPage.png" alt="logo" >
</h1>

- Creating list with variant types
<h1 align="center">
  <img src="https://github.com/SedanaYoga/ur-list/blob/main/src/images/createList.png" alt="logo">
</h1>

- Search function for filtering based on all string data
<h1 align="center">
  <img src="https://github.com/SedanaYoga/ur-list/blob/main/src/images/searchFunction.png" alt="logo">
</h1>

## Tech/framework used

<b>Built with</b>

- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [JSON Server](https://github.com/typicode/json-server)

## Features

- Create a list with variants type
- Project-Management like UI
- Encrypted and decrypted password
- Functionality of CRUD (Create, Update, and Delete) from json-server

## Installation

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To retrieve a data, you might want to fetch to json server api with this object example:

```json
{
  "type": "account",
  "details": {
    "name": "Test",
    "url": "<optional>",
    "userName": "TestUserName",
    "theDetail": "TesttheDetail"
  },
  "id": "h-2yi1y"
}
```

MIT © [Sedana Yoga]()
