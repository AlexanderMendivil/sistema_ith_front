import React from 'react';
import WeekGraphic from "./WeekGraphic";

function WeekStatistic({chartData}) {

    //          l  m  mi j  v  s
    var days = [0, 0, 0, 0, 0, 0];
    for(let x = 0; x < chartData.length; x++) {
        if(chartData[x]?.Lunes!=null) {
            days[0] += parseInt(chartData[x]?.Lunes.substring(7,8)) - parseInt(chartData[x]?.Lunes.substring(0,1));
        }
        if(chartData[x]?.Martes!=null) {
            days[1] += parseInt(chartData[x]?.Martes.substring(7,8)) - parseInt(chartData[x]?.Martes.substring(0,1));
        }
        if(chartData[x]?.Miercoles!=null) {
            days[2] += parseInt(chartData[x]?.Miercoles.substring(7,8)) - parseInt(chartData[x]?.Miercoles.substring(0,1));
        }
        if(chartData[x]?.Jueves!=null) {
            days[3] += parseInt(chartData[x]?.Jueves.substring(7,8)) - parseInt(chartData[x]?.Jueves.substring(0,1));
        }
        if(chartData[x]?.Viernes!=null) {
            days[4] += parseInt(chartData[x]?.Viernes.substring(7,8)) - parseInt(chartData[x]?.Viernes.substring(0,1));
        }
        if(chartData[x]?.Sabado!=null) {
            days[5] += parseInt(chartData[x]?.Sabado.substring(7,8)) - parseInt(chartData[x]?.Sabado.substring(0,1));
        }
        //VESPERTINO
        if(chartData[x]?.Lunes_vesp!=null) {
            days[0] += parseInt(chartData[x]?.Lunes_vesp.substring(7,8)) - parseInt(chartData[x]?.Lunes_vesp.substring(0,1));
        }
        if(chartData[x]?.Martes_vesp!=null) {
            days[1] += parseInt(chartData[x]?.Martes_vesp.substring(7,8)) - parseInt(chartData[x]?.Martes_vesp.substring(0,1));
        }
        if(chartData[x]?.Miercoles_vesp!=null) {
            days[2] += parseInt(chartData[x]?.Miercoles_vesp.substring(7,8)) - parseInt(chartData[x]?.Miercoles_vesp.substring(0,1));
        }
        if(chartData[x]?.Jueves_vesp!=null) {
            days[3] += parseInt(chartData[x]?.Jueves_vesp.substring(7,8)) - parseInt(chartData[x]?.Jueves_vesp.substring(0,1));
        }
        if(chartData[x]?.Viernes_vesp!=null) {
            days[4] += parseInt(chartData[x]?.Viernes_vesp.substring(7,8)) - parseInt(chartData[x]?.Viernes_vesp.substring(0,1));
        }
        if(chartData[x]?.Sabado_vesp!=null) {
            days[5] += parseInt(chartData[x]?.Sabado_vesp.substring(7,8)) - parseInt(chartData[x]?.Sabado_vesp.substring(0,1));
        }
    }

    var labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return <>
    <h1>Horas de uso del equipo por día:</h1>
    <h3>Lunes: {days[0]} | Martes: {days[1]} | Miércoles: {days[2]} | Jueves: {days[3]} | Viernes: {days[4]} | Sábado: {days[5]}</h3>
    <WeekGraphic scores={days} labels={labels}/>
    <br />
    </>
}

export default WeekStatistic;