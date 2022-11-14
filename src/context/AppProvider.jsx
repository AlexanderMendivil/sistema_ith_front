import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ({ children }) => {
    
    const [ hoursPerDay, setHoursPerDay ] = useState([])
    const [ hoursWeeklyGroupDay, setHoursWeeklyGroupDay ] = useState([])
    const [ nameWeeklyGroup, setNameWeeklyGroupDay ] = useState([])

    const handleHoursPerDay = (hours) => {
        setHoursPerDay(hours)
    }

    const handleHoursWeeklyGroup = (hours) => {
        setHoursWeeklyGroupDay(hours)
    }
    const handleNameWeeklyGroup = (groups) => {
        setNameWeeklyGroupDay(groups)
    }

    return (
    <AppContext.Provider value={{ hoursPerDay, handleHoursPerDay, hoursWeeklyGroupDay, handleHoursWeeklyGroup, handleNameWeeklyGroup, nameWeeklyGroup }}>
        { children }
    </AppContext.Provider>
  )
}
