import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api_calls/users';
import { ButtonAppBar } from '../../../components/organisms/AppBar/AppBar';
import WeekStatistic from '../../../components/WeekStatistic';
import ClassroomSt from '../../../components/ClassroomSt';

export const Home = () => {
    const [ data, setData ] = useState([]);
  
    useEffect(()=>{
      getAllUsers().then(data => setData(data)).catch( e => console.log(e) );
    },[]);

  return (
    <>
    <ButtonAppBar/>
    <WeekStatistic chartData={data}/>
    <ClassroomSt chartData={data} />
    <p>{JSON.stringify(data, null, 2)}</p>
    </>
  )
}
