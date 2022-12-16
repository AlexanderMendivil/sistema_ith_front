import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ClassroomGr from './ClassroomGr';

export const ClassroomSt = () => {
    const { minutesPerHourDay } = useContext(AppContext)
    let labelsDay = ["7:00 am - 8:00 am", "8:00 am - 9:00 am", "9:00 am - 10:00 am", "10:00 am - 11:00 am", "11:00 am - 12:00 am", "12:00 am - 1:00 pm"];
    return (
    <div>
        <h1>Minutos de uso del laboratorio en horario matutino</h1>
        <ClassroomGr scores={minutesPerHourDay} labels={labelsDay}/>
    </div>)
}

export default ClassroomSt;