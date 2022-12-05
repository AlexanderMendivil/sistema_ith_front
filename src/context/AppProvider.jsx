import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ({ children }) => {
    
    const [ hoursPerDay, setHoursPerDay ] = useState([])
    const [ hoursWeeklyGroupDay, setHoursWeeklyGroupDay ] = useState([])
    const [ nameWeeklyGroup, setNameWeeklyGroupDay ] = useState([])
    const [ realHours, setRealHours ] = useState(0)

    const handleHoursPerDay = (hours) => {
        setHoursPerDay(hours)
    }

    const handleHoursWeeklyGroup = (hours) => {
        setHoursWeeklyGroupDay(hours)
    }
    const handleNameWeeklyGroup = (groups) => {
        setNameWeeklyGroupDay(groups)
    }
    const calculateHours = ( data ) =>{
        let minutes = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].entrada.Tiempo.substring(11,13) === data[i].salida.Tiempo.substring(11,13)){
                
                minutes += +data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)
            }else{
                minutes +=  (60 - +data[i].entrada.Tiempo.substring(14,16)) + +data[i].salida.Tiempo.substring(14,16)
            }
        }

        setRealHours(minutes/60)
    }

    return (
    <AppContext.Provider value={{ hoursPerDay, handleHoursPerDay, hoursWeeklyGroupDay, handleHoursWeeklyGroup, handleNameWeeklyGroup, nameWeeklyGroup, calculateHours, realHours }}>
        { children }
    </AppContext.Provider>
  )
}
