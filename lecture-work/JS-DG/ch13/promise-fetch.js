(() => {
  const getFakePerson = async () => {
    let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
    let { results } = res.json();
    console.log(results);
  };
  getFakePerson();
})()(() => {
  fetch("https://api.randomuser.me/?nat=US&results=1")
    .then((res) => res.json())
    .then((json) => json.results)
    .then(console.log)
    .catch(console.error);
})()(() => {
  const getPeople = (count) =>
    new Promise((resolves, rejects) => {
      const api = `https://api.randomuser.me/?nat=US&results=${count}`;
      const request = new XMLHttpRequest();
      request.open("GET", api);
      request.onload = () =>
        request.status === 200 ? resolves(JSON.parse(request.response).results) : reject(Error(request.statusText));
      request.onerror = (err) => rejects(err);
      request.send();
    });

  getPeople(5)
    .then((members) => console.log(members))
    .catch((error) => console.error(`getPeople failed: ${error.message}`));
})()(() => {
  import React, { useState, useEffect } from "react";
  export function useFetch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!uri) return;
      fetch(uri)
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    }, [uri]);
    return {
      loading,
      data,
      error,
    };
  }
})()(() => {
  function GitHubUser({ login }) {
    const { loading, data, error } = useFetch(`https://api.github.com/users/${login}`);
    if (loading) return <h1>loading...</h1>;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    return (
      <div className="githubUser">
        <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
        <div>
          <h1>{data.login}</h1>
          {data.name && <p>{data.name}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </div>
    );
  }
})()(() => {
  function Fetch({
    uri,
    renderSuccess,
    loadingFallback = <p>loading...</p>,
    renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  }) {
    const { loading, data, error } = useFetch(uri);
    if (loading) return loadingFallback;
    if (error) return renderError(error);
    if (data) return renderSuccess({ data });
  }
  import React from "react";
  import Fetch from "./Fetch";
  export default function GitHubUser({ login }) {
    return <Fetch uri={`https://api.github.com/users/${login}`} renderSuccess={UserDetails} />;
  }
  function UserDetails({ data }) {
    return (
      <div className="githubUser">
        <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
        <div>
          <h1>{data.login}</h1>
          {data.name && <p>{data.name}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </div>
    );
  }
})();
