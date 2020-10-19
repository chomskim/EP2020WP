import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const title = "My Hacker Stories";
const initialStories = [
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
  const [stories, setStories] = useState(initialStories);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  };

  useEffect(() => {
    console.log("start useEffect searchTerm=", searchTerm);
    setSearchTerm(localStorage.getItem("search") || "React");
  }, []);

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleChange = (event) => {
    console.log(event.target);
    console.log("event.target.value=", event.target.value);
    setSearchTerm(event.target.value);
    //localStorage.setItem("search", event.target.value);
    console.log("searchTerm=", searchTerm);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1>Hello {title}</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch} isFocused>
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={stories} onRemoveItem={handleRemoveStory} />
    </>
  );
}

const InputWithLabel = ({ id, value, type = "text", onInputChange, children, isFocused }) => {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input ref={inputRef} id={id} value={value} type={type} onChange={onInputChange} autoFocus={isFocused} />
    </>
  );
};

const Item = ({ item, onRemoveItem }) => {
  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </div>
  );
};

const List = ({ list, onRemoveItem }) =>
  list.map((item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />);

export default App;
