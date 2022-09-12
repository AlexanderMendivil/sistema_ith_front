import React from 'react'
import { CarreraGraphic } from './CarreraGraphic';

export const CarreraStatics = ({ chartData }) => {
  var classrooms = {};
    for(let x = 0; x < chartData.length; x++) {
      if(classrooms.hasOwnProperty(chartData[x]?.nombre_carrera)) {
          classrooms[chartData[x]?.nombre_carrera] += 0;
      } else {
          classrooms[chartData[x]?.nombre_carrera] = 0;
      }
  }

  var carreras = Object.keys(classrooms);
  for(let x = 0; x < carreras.length; x++) {
      for(let y = 0; y < chartData.length; y++) {
          if(carreras[x] === chartData[y].nombre_carrera) {
              if(classrooms[carreras[x]] != 0) {
                  var total = classrooms[carreras[x]];
              } else {
                  total = 0;
              }
              if(chartData[y]?.Lunes!=null) {
                  total += parseInt(chartData[y]?.Lunes.substring(7,8)) - parseInt(chartData[y]?.Lunes.substring(0,1));
              }
              if(chartData[y]?.Martes!=null) {
                  total += parseInt(chartData[y]?.Martes.substring(7,8)) - parseInt(chartData[y]?.Martes.substring(0,1));
              }
              if(chartData[y]?.Miercoles!=null) {
                  total += parseInt(chartData[y]?.Miercoles.substring(7,8)) - parseInt(chartData[y]?.Miercoles.substring(0,1));
              }
              if(chartData[y]?.Jueves!=null) {
                  total += parseInt(chartData[y]?.Jueves.substring(7,8)) - parseInt(chartData[y]?.Jueves.substring(0,1));
              }
              if(chartData[y]?.Viernes!=null) {
                  total += parseInt(chartData[y]?.Viernes.substring(7,8)) - parseInt(chartData[y]?.Viernes.substring(0,1));
              }
              if(chartData[y]?.Sabado!=null) {
                  total += parseInt(chartData[y]?.Sabado.substring(7,8)) - parseInt(chartData[y]?.Sabado.substring(0,1));
              }
              if(chartData[y]?.Lunes_vesp!=null) {
                  total += parseInt(chartData[y]?.Lunes_vesp.substring(7,8)) - parseInt(chartData[y]?.Lunes_vesp.substring(0,1));
              }
              if(chartData[y]?.Martes_vesp!=null) {
                  total += parseInt(chartData[y]?.Martes_vesp.substring(7,8)) - parseInt(chartData[y]?.Martes_vesp.substring(0,1));
              }
              if(chartData[y]?.Miercoles_vesp!=null) {
                  total += parseInt(chartData[y]?.Miercoles_vesp.substring(7,8)) - parseInt(chartData[y]?.Miercoles_vesp.substring(0,1));
              }
              if(chartData[y]?.Jueves_vesp!=null) {
                  total += parseInt(chartData[y]?.Jueves_vesp.substring(7,8)) - parseInt(chartData[y]?.Jueves_vesp.substring(0,1));
              }
              if(chartData[y]?.Viernes_vesp!=null) {
                  total += parseInt(chartData[y]?.Viernes_vesp.substring(7,8)) - parseInt(chartData[y]?.Viernes_vesp.substring(0,1));
              }
              if(chartData[y]?.Sabado_vesp!=null) {
                  total += parseInt(chartData[y]?.Sabado_vesp.substring(7,8)) - parseInt(chartData[y]?.Sabado_vesp.substring(0,1));
              }
              classrooms[carreras[x]] = total;
          }
      }
  }
  var horas = Object.values(classrooms);

  var cadena = "";
  for(let x = 0; x < carreras.length; x++) {
      cadena += carreras[x] + ": " + horas[x] + " horas | ";
  }

  return <div>
  <h1>Horas de uso por carrera (por semana):</h1>
  <h3>{cadena}</h3>
  <CarreraGraphic scores={horas} labels={carreras}/>
  </div>
}
