import React, { useState } from "react";
import "./App.css";

const title = "My Hacker Stories";
const stories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "AWS",
    url: "https://localhost/",
    author: "CS Kim",
    num_comments: 2,
    points: 5,
    objectID: 100,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    console.log(event.target);
    console.log("event.target.value=",event.target.value);
    setSearchTerm(event.target.value);
    console.log("searchTerm=",searchTerm);
  };

  return (
    <div>
      <h1>Hello {title}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" value={searchTerm} type="text" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />
      <List list={stories} dummy={"hello"} />
    </div>
  );
}

const List = (props) => {
  console.log(props);
  return (
    <ol>
      {props.list.map((item) => (
        <li key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
        </li>
      ))}
    </ol>
  );
};

export default App;
