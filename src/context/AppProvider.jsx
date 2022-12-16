import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ({ children }) => {
    
    const [ hoursPerDay, setHoursPerDay ] = useState([])
    const [ hoursWeeklyGroupDay, setHoursWeeklyGroupDay ] = useState([])
    const [ nameWeeklyGroup, setNameWeeklyGroupDay ] = useState([])
    const [ minutesPerHourDay, setMinutesPerHourDay ] = useState([])
    const [ minutesPerHourNight, setMinutesPerHourNight ] = useState([])

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

        console.log(data)
        let dayHours = [7,8,9,10,11,12,1]
        let nightHours = [14,15,16,17,18,19,20,21]
        let sameHour;
        let minutesPerDay = []
        let minutesPerNight = []

        let leftHours = 0;
        let minutesDay = 0;
        let minutesNight = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].entrada.Tiempo.substring(11,13) < 13 ){

                for(let j = 0; j < dayHours.length; j++){

                    if(dayHours[j] === +data[i].entrada.Tiempo.substring(11,13)){
                    
                    if(data[i].entrada.Tiempo.substring(11,13) === data[i].salida.Tiempo.substring(11,13)){
                        if((+data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)) >= 20){
                            minutesDay += +data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)
                            
                        }
                    }else if((+data[i].entrada.Tiempo.substring(11,13)+1) === data[i].salida.Tiempo.substring(11,13)){
                        minutesDay +=  (60 - +data[i].entrada.Tiempo.substring(14,16)) + +data[i].salida.Tiempo.substring(14,16)
                    }else{
                        
                        leftHours = (data[i].salida.Tiempo.substring(11,13) - data[i].entrada.Tiempo.substring(11,13)) - 1
                        minutesDay +=  (60 - +data[i].entrada.Tiempo.substring(14,16))
                        for(let i = 0; i <= leftHours; i++){
                            if(leftHours !== data[i].salida.Tiempo.substring(11,13)){
                                minutesDay += 60
                            }else{
                                minutesDay += (60 - +data[i].entrada.Tiempo.substring(14,16))
                            }
                            
                        }
                        
                    }
                    break
                }
            }
            if(data[i+1]){

                sameHour = +data[i].entrada.Tiempo.substring(11,13) === +data[i+1].entrada.Tiempo.substring(11,13)
            }
                if(!sameHour){
                    minutesPerDay.push(minutesDay)
                    setMinutesPerHourDay(minutesPerDay)
                    minutesDay = 0

                }
            }else if(data[i].entrada.Tiempo.substring(11,13) < 13 && data[i].salida.Tiempo.substring(11,13) > 13){
                if(data[i].entrada.Tiempo.substring(11,13) === data[i].salida.Tiempo.substring(11,13)){
                    if((+data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)) >= 20){
                        minutesNight += +data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)
                        
                    }
                }else if((+data[i].entrada.Tiempo.substring(11,13)+1) === data[i].salida.Tiempo.substring(11,13)){
                    minutesNight +=  (60 - +data[i].entrada.Tiempo.substring(14,16)) + +data[i].salida.Tiempo.substring(14,16)
                }else{
                    
                    leftHours = (data[i].salida.Tiempo.substring(11,13) - data[i].entrada.Tiempo.substring(11,13)) - 1
                    minutesNight +=  (60 - +data[i].entrada.Tiempo.substring(14,16))
                    for(let j = 0; j <= leftHours; j++){
                        if(leftHours !== data[i].salida.Tiempo.substring(11,13)){
                            minutesNight += 60
                        }else{
                            minutesNight += (60 - +data[i].entrada.Tiempo.substring(14,16))
                        }
                    }
                }
            }else if(data[i].entrada.Tiempo.substring(11,13) >= 13){
                for(let j = 0; j < nightHours.length; j++){

                    if(nightHours[j] === +data[i].entrada.Tiempo.substring(11,13)){
                if(data[i].entrada.Tiempo.substring(11,13) === data[i].salida.Tiempo.substring(11,13)){
                    if((+data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)) >= 20){
                        minutesNight += +data[i].salida.Tiempo.substring(14,16) - +data[i].entrada.Tiempo.substring(14,16)
                        
                    }
                }else if((+data[i].entrada.Tiempo.substring(11,13)+1) === data[i].salida.Tiempo.substring(11,13)){
                    minutesNight +=  (60 - +data[i].entrada.Tiempo.substring(14,16)) + +data[i].salida.Tiempo.substring(14,16)
                }else{
                    
                    leftHours = (data[i].salida.Tiempo.substring(11,13) - data[i].entrada.Tiempo.substring(11,13)) - 1
                    minutesNight +=  (60 - +data[i].entrada.Tiempo.substring(14,16))
                    for(let i = 0; i <= leftHours; i++){
                        if(leftHours !== data[i].salida.Tiempo.substring(11,13)){
                            minutesNight += 60
                        }else{
                            minutesNight += (60 - +data[i].entrada.Tiempo.substring(14,16))
                        }
                    }
                }
             }
            }

            if(data[i+1]){
                sameHour = +data[i].entrada.Tiempo.substring(11,13) === +data[i+1].entrada.Tiempo.substring(11,13)
            }
                if(!sameHour){
                    minutesPerNight.push(minutesNight)
                    setMinutesPerHourNight(minutesPerNight)
                    minutesNight = 0

                }
         }
    }

    }

    return (
    <AppContext.Provider value={{ hoursPerDay, handleHoursPerDay, hoursWeeklyGroupDay, handleHoursWeeklyGroup, handleNameWeeklyGroup, nameWeeklyGroup, calculateHours, minutesPerHourDay, minutesPerHourNight }}>
        { children }
    </AppContext.Provider>
  )
}
