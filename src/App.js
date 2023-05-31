import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const[query, setQuery] = useState("");
  const[results, setResults] = useState([]);
  const api = "https://api.github.com";
  const [users, setUsers] = useState([]);

const getUsers = async (query) => {
  try{
    await axios.get(`${api}/search/users?q=${query}`).then(res=>setUsers(res.data));
    return users;
  }catch(err){
    throw new Error(err);
  }
}

  const updateQuery = (event) => {
     setQuery(event.target.value);
  }

  const onSearchSubmit = async (event) => {
    event.preventDefault();
    const results = await getUsers(query);
    setResults(results.items);
  }

  return (
    <div className="">
      <h1>Search for github users</h1>
      <form onSubmit={onSearchSubmit}>
        <input type='text' value={query} onChange={updateQuery}/>
        <input type='submit'/>
      </form>
      <div>
        {
          results ? results.map(user=><div>
            <img src={user.avatar_url}/>
            <a href={user.html_url} target="_blank">{user.login}</a>
          </div>) : " "
        }
      </div>
    </div>
  );
}

export default App;
