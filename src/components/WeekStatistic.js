import { alertTitleClasses } from "@mui/material";
import React from "react";
import WeekGraphic from "./WeekGraphic";

function WeekStatistic({ chartData, chartData2 }) {
  //          l  m  mi j  v  s
  var days = [0, 0, 0, 0, 0, 0];
  var arr = ["", "", "", "", "", ""];
  var min = [0, 0, 0, 0, 0, 0];
  var rDays = [0, 0, 0, 0, 0, 0];
  var strRDays = ["", "", "", "", "", ""];
  for (let x = 0; x < chartData.length; x++) {
    if (chartData[x]?.Lunes != null) {
      days[0] +=
        parseInt(chartData[x]?.Lunes.substring(7, 8)) -
        parseInt(chartData[x]?.Lunes.substring(0, 1));
    }
    if (chartData[x]?.Martes != null) {
      days[1] +=
        parseInt(chartData[x]?.Martes.substring(7, 8)) -
        parseInt(chartData[x]?.Martes.substring(0, 1));
    }
    if (chartData[x]?.Miercoles != null) {
      days[2] +=
        parseInt(chartData[x]?.Miercoles.substring(7, 8)) -
        parseInt(chartData[x]?.Miercoles.substring(0, 1));
    }
    if (chartData[x]?.Jueves != null) {
      days[3] +=
        parseInt(chartData[x]?.Jueves.substring(7, 8)) -
        parseInt(chartData[x]?.Jueves.substring(0, 1));
    }
    if (chartData[x]?.Viernes != null) {
      days[4] +=
        parseInt(chartData[x]?.Viernes.substring(7, 8)) -
        parseInt(chartData[x]?.Viernes.substring(0, 1));
    }
    if (chartData[x]?.Sabado != null) {
      days[5] +=
        parseInt(chartData[x]?.Sabado.substring(7, 8)) -
        parseInt(chartData[x]?.Sabado.substring(0, 1));
    }
    //VESPERTINO
    if (chartData[x]?.Lunes_vesp != null) {
      days[0] +=
        parseInt(chartData[x]?.Lunes_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Lunes_vesp.substring(0, 1));
    }
    if (chartData[x]?.Martes_vesp != null) {
      days[1] +=
        parseInt(chartData[x]?.Martes_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Martes_vesp.substring(0, 1));
    }
    if (chartData[x]?.Miercoles_vesp != null) {
      days[2] +=
        parseInt(chartData[x]?.Miercoles_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Miercoles_vesp.substring(0, 1));
    }
    if (chartData[x]?.Jueves_vesp != null) {
      days[3] +=
        parseInt(chartData[x]?.Jueves_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Jueves_vesp.substring(0, 1));
    }
    if (chartData[x]?.Viernes_vesp != null) {
      days[4] +=
        parseInt(chartData[x]?.Viernes_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Viernes_vesp.substring(0, 1));
    }
    if (chartData[x]?.Sabado_vesp != null) {
      days[5] +=
        parseInt(chartData[x]?.Sabado_vesp.substring(7, 8)) -
        parseInt(chartData[x]?.Sabado_vesp.substring(0, 1));
    }
  }

  // ESTADISTICAS DEL REGISTRO DE HUELLA
  var usuariosRegistrados = [];
  for (let x = 0; x < chartData2.length; x++) {
    // SI SENSOR_ID = 1 || 2, EL REGISTRO FUE DE ENTRADA
    if (chartData2[x]?.sensor_id == 1 || chartData2[x]?.sensor_id == 2) {
      usuariosRegistrados.push(chartData2[x]?.no_control);
      usuariosRegistrados.push(chartData2[x]?.hora_registro);
    } else {
      for (let y = 0; y < usuariosRegistrados.length; y + 2) {
        if (usuariosRegistrados[y] == chartData2[x]?.no_control) {
          let entrada = new Date(usuariosRegistrados[y + 1]);
          let salida = new Date(chartData2[x]?.hora_registro);
          usuariosRegistrados = usuariosRegistrados.splice(y, 1);
          usuariosRegistrados = usuariosRegistrados.splice(y + 1, 1);
          // TENEMOS QUE SABER Q DIA DE LA SEMANA ES PARA SACAR LA HORA DE ENTRADA Y SALIDA DEL ALUUMNO
          let day = entrada.getDay();
          let d = "";
          switch (day) {
            case 1:
              d = chartData2[x]?.Lunes;
              break;
            case 2:
              d = chartData2[x]?.Martes;
              break;
            case 3:
              d = chartData2[x]?.Miercoles;
              break;

            case 4:
              d = chartData2[x]?.Jueves;
              break;

            case 5:
              d = chartData2[x]?.Viernes;
              break;

            case 6:
              d = chartData2[x]?.Sabado;
              break;
          }

          CalcularTiempo(entrada, salida, d, chartData2[x]?.hora_registro, day);
        }
      }
    }
  }

  function CalcularTiempo(e, s, d, registro, no_day) {
    let hrEntrada = parseInt(d.substring(0, 1));
    if (hrEntrada >= 1 && hrEntrada <= 6) {
      hrEntrada = hrEntrada + 12;
    }
    let hrSalida = parseInt(d.substring(7, 8));
    if (hrSalida >= 1 && hrSalida <= 7) {
      hrSalida = hrSalida + 12;
    }
    let r = registro.substring(0, 10);
    let [year, month, day] = r.split("-");
    let minutes = "00";
    let seconds = "00";
    let extra = "000";

    const horaEntrada = new Date(
      +year,
      +month - 1,
      +day,
      +hrEntrada,
      +minutes,
      +seconds + extra
    );
    const horaSalida = new Date(
      +year,
      +month - 1,
      +day,
      +hrSalida,
      +minutes,
      +seconds,
      +extra
    );

    let entradaF;
    let salidaF;
    // VERIFICAMOS SI LLEGÓ 20 MINUTOS O MAS ANTES DE EMPEZAR CLASE
    if (e.getTime() < horaEntrada.getTime()) {
      if ((horaEntrada.getTime() - e.getTime()) / 60000 >= 20) {
        entradaF = e;
      } else {
        entradaF = horaEntrada;
      }
    } else {
      entradaF = e;
    }
    // VERIFICAMOS SI SALIÓ 20 MIN O MAS DESPUES DE TERMINADA LA CLASE
    if (s.getTime() >= horaSalida.getTime()) {
      if ((s.getTime() - horaSalida.getTime()) / 60000 >= 20) {
        salidaF = s;
      } else {
        salidaF = horaSalida;
      }
    } else {
      salidaF = s;
    }

    let result = (salidaF.getTime() - entradaF.getTime()) / 60000;

    switch (no_day) {
      case 1:
        rDays[0] += result / 60;
        break;
      case 2:
        rDays[1] += result / 60;
        break;
      case 3:
        rDays[2] += result / 60;
        break;
      case 4:
        rDays[3] += result / 60;
        break;
      case 5:
        rDays[4] += result / 60;
        break;
      case 6:
        rDays[5] += result / 60;
        break;
    }

    let mod = 0;
    for (let x = 0; x < rDays.length; x++) {
        mod = (rDays[x] * 60) % 60;
        if (mod === 0) {
            strRDays[x] = `${rDays[x]}:00`;
        } else {
            let hrs = Math.trunc(rDays[x]);
            strRDays[x] = `${hrs}:${Math.trunc(mod)}`;
        }
    }
  }

  var labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <>
      <h1>Horas de uso del equipo por día:</h1>
      <h3>
        Lunes: {days[0]} | Martes: {days[1]} | Miércoles: {days[2]} | Jueves:{" "}
        {days[3]} | Viernes: {days[4]} | Sábado: {days[5]}
      </h3>
      <h2>Horas reales de uso del equipo por día:</h2>
      <h3>
        Lunes: {strRDays[0]} | Martes: {strRDays[1]} | Miércoles: {strRDays[2]} | Jueves:{" "}
        {strRDays[3]} | Viernes: {strRDays[4]} | Sábado: {strRDays[5]}
      </h3>
      <WeekGraphic scores={days} scores2={rDays} labels={labels} />
      <br />
    </>
  );
}

export default WeekStatistic;
