import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api_calls/users';
import { ButtonAppBar } from '../../../components/organisms/AppBar/AppBar';
import WeekStatistic from '../../../components/WeekStatistic';

export const Home = () => {
    const [ data, setData ] = useState([]);
  
    useEffect(()=>{
      getAllUsers().then(data => setData(data)).catch( e => console.log(e) );
    },[]);

  return (
    <>
    <ButtonAppBar/>
    <WeekStatistic chartData={data}/>
    </>
  )
}
