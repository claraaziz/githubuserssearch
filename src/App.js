import './App.css';
import { useState } from 'react';
import { useMorph } from 'react-morph';
import axios from 'axios';

const App = () => {

  const[query, setQuery] = useState("");
  const[results, setResults] = useState([]);
  const api = "https://api.github.com";
  const [users, setUsers] = useState([]);
  const morph = useMorph();

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
    console.log(results)
  }

  return (
    <div {...morph} className="justify-center items-center flex flex-col min-h-screen bg-slate-950">
      <h1 className="text-slate-100 mt-20 text-4xl font-bold font-mono mb-5">Search for github users</h1>
      <form onSubmit={onSearchSubmit}>
        <input type='text' value={query} placeholder="Write a username.." onChange={updateQuery} className="transition ease-in-out h-12 w-80 rounded-md pl-5 text-lg font-mono bg-slate-300 focus:bg-slate-200 outline-0"/>
        <input type='submit' className='transition ease-in-out bg-slate-600 text-slate-100 ml-5 h-12 w-24 text-lg font-semibold rounded-md font-mono cursor-pointer hover:bg-slate-500 active:bg-slate-400'/>
      </form>
      <div className='mt-5 mb-20'>
        {
          results ? results.map(user=><div {...morph} className='bg-slate-800 rounded-lg flex flex-row mb-3 pt-3 pb-3 pl-5 pr-5'>
            <img src={user.avatar_url} alt="userimg" className='rounded-full w-2/12 mr-5'/>
            <div className='flex flex-col justify-center'>
              <p className='text-slate-300 font-mono font-bold text-2xl'>{user.login}</p>
              <div>
                <button className='transition ease-in-out text-slate-900 font-mono font-semibold bg-cyan-500 pb-1 pt-1 pl-2 pr-2 rounded-md mt-2 hover:bg-cyan-400 active:bg-cyan-300 '><a href={user.html_url} target="_blank" rel="noreferrer">Visit Profile</a></button>
              </div>
            </div>
          </div>) : " "
        }
      </div>
    </div>
  );
}

export default App;
