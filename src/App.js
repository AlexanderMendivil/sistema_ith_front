import { useEffect, useState } from 'react';
import { getAllUsers } from './api_calls/users';
import { ButtonAppBar } from './components/organisms/AppBar/AppBar';

function App() {

  const [ data, setData ] = useState([]);
  
  useEffect(()=>{
    getAllUsers().then(data => setData(data)).catch( e => console.log(e) );

  },[]);

  return (
    <>
    <ButtonAppBar/>
    <p>{JSON.stringify(data, null, 2)}</p>
    </>
  );
}

export default App;
