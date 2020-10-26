import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
function getAsyncStories() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000);
    console.log("After call setTimeout");
  });
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [persons, setPersons] = useState([]);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  };

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        console.log("result=", result);
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });

    /*
    fetch("https://api.randomuser.me/?nat=US&results=3")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((res) => {
        // res is Array
        res.forEach((per) => {
          console.log(per.email, per.cell, per.name);
        });
        setPersons(res);
      })
      .catch(console.error);
    */
    axios
      .get("https://api.randomuser.me/?nat=US&results=3")
      .then((res) => res.data.results)
      .then((res) => {
        // res is Array
        res.forEach((per) => {
          console.log(per.email, per.cell, per.name);
        });
        setPersons(res);
      })
      .catch(console.error);
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
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? <p>Loading ...</p> : <List list={stories} onRemoveItem={handleRemoveStory} />}
      <hr />
      <Table list={persons} />
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

const TableRow = ({ item }) => {
  return (
    <tr>
      <td>{item.email}</td>
      <td>{item.cell}</td>
      <td>{item.name.first}</td>
    </tr>
  );
};
const Table = ({ list }) => (
  <table>
    <thead>
      <td>email</td>
      <td>cell phone</td>
      <td>First name</td>
    </thead>
  <tbody>
    {list.map((item) => <TableRow key={item.objectID} item={item} />)}
  </tbody>
  </table>
);

export default App;
