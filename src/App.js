import Login from './components/login/Login'
import { auth } from './firebase';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/header';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log('currentUser', auth.currentUser);
  }, [])

  return (
    <div className="App">
      <Header setToken={setToken} token={token}/>
      {!token && !localStorage.getItem('token') ?
        <Login setToken={setToken}/>
      : <Dashboard token={token} setToken={setToken}/>}
    </div>
  );
}

export default App;
