import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ({ children }) => {
    
    const [ hoursPerDay, setHoursPerDay ] = useState([])

    const handleHoursPerDay = (hours) => {
        setHoursPerDay(hours)
    }

    return (
    <AppContext.Provider value={{ hoursPerDay, handleHoursPerDay }}>
        { children }
    </AppContext.Provider>
  )
}
