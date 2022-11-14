import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { GroupGraphic } from './GroupGraphic';

export const GroupStatistic = ({ chartData }) => {
    
    const { hoursWeeklyGroupDay, handleHoursWeeklyGroup, handleNameWeeklyGroup } = useContext(AppContext);

    var classrooms = {};
    var grupos = {};
    var cadena = "";
    const [titulo, setTitulo ] = useState('');
    const [grupo, setGrupo ] = useState({});

    useEffect(()=>{
        for(let x = 0; x < chartData.length; x++) {
            if(classrooms.hasOwnProperty(chartData[x]?.grupo)) {
                classrooms[chartData[x]?.grupo] += 0;
            } else {
                classrooms[chartData[x]?.grupo] = 0;
            }
        }
         grupos = Object.keys(classrooms);
         
        for(let x = 0; x < grupos.length; x++) {
            for(let y = 0; y < chartData.length; y++) {
                if(grupos[x] === chartData[y].grupo) {
                    if(classrooms[grupos[x]] != 0) {
                        var total = classrooms[grupos[x]];
                    } else {
                        total = 0;
                    }
                    if(chartData[y]?.Lunes != null) {
                        total += parseInt(chartData[y]?.Lunes.substring(7,8)) - parseInt(chartData[y]?.Lunes.substring(0,1));
                    }
                    if(chartData[y]?.Martes != null) {
                        total += parseInt(chartData[y]?.Martes.substring(7,8)) - parseInt(chartData[y]?.Martes.substring(0,1));
                    }
                    if(chartData[y]?.Miercoles != null) {
                        total += parseInt(chartData[y]?.Miercoles.substring(7,8)) - parseInt(chartData[y]?.Miercoles.substring(0,1));
                    }
                    if(chartData[y]?.Jueves != null) {
                        total += parseInt(chartData[y]?.Jueves.substring(7,8)) - parseInt(chartData[y]?.Jueves.substring(0,1));
                    }
                    if(chartData[y]?.Viernes != null) {
                        total += parseInt(chartData[y]?.Viernes.substring(7,8)) - parseInt(chartData[y]?.Viernes.substring(0,1));
                    }
                    if(chartData[y]?.Sabado != null) {
                        total += parseInt(chartData[y]?.Sabado.substring(7,8)) - parseInt(chartData[y]?.Sabado.substring(0,1));
                    }
                    if(chartData[y]?.Lunes_vesp != null) {
                        total += parseInt(chartData[y]?.Lunes_vesp.substring(7,8)) - parseInt(chartData[y]?.Lunes_vesp.substring(0,1));
                    }
                    if(chartData[y]?.Martes_vesp != null) {
                        total += parseInt(chartData[y]?.Martes_vesp.substring(7,8)) - parseInt(chartData[y]?.Martes_vesp.substring(0,1));
                    }
                    if(chartData[y]?.Miercoles_vesp != null) {
                        total += parseInt(chartData[y]?.Miercoles_vesp.substring(7,8)) - parseInt(chartData[y]?.Miercoles_vesp.substring(0,1));
                    }
                    if(chartData[y]?.Jueves_vesp != null) {
                        total += parseInt(chartData[y]?.Jueves_vesp.substring(7,8)) - parseInt(chartData[y]?.Jueves_vesp.substring(0,1));
                    }
                    if(chartData[y]?.Viernes_vesp != null) {
                        total += parseInt(chartData[y]?.Viernes_vesp.substring(7,8)) - parseInt(chartData[y]?.Viernes_vesp.substring(0,1));
                    }
                    if(chartData[y]?.Sabado_vesp != null) {
                        total += parseInt(chartData[y]?.Sabado_vesp.substring(7,8)) - parseInt(chartData[y]?.Sabado_vesp.substring(0,1));
                    }
                    classrooms[grupos[x]] = total;
                }
            }
        }

        handleHoursWeeklyGroup(Object.values(classrooms))

        for(let x = 0; x < grupos.length; x++) {
            cadena += grupos[x] + ": " + hoursWeeklyGroupDay[x] + " horas | ";
        }
        setTitulo(cadena)
        setGrupo(grupos)
        handleNameWeeklyGroup(grupos)
    },  [chartData])

  return (<div>
  <h1>Horas de uso por grupo (por semana):</h1>
  <h3>{titulo}</h3>
  <GroupGraphic scores={hoursWeeklyGroupDay} labels={grupo}/>
  </div>)

}
