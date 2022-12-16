import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import WeekGraphic from "./WeekGraphic";

export const MorningStatistic = () => {
  const { minutesPerHourNight } = useContext( AppContext )

  var labelsDay = ["7:00 am - 8:00 am", "8:00 am - 9:00 am", "9:00 am - 11:00 am", "11:00 am - 12:00 am", "12:00 am - 1:00 pm"];
  var labelsNight = ["1:00 pm - 2:00 pm", "2:00 pm - 3:00 pm", "3:00 pm - 4:00 pm", "4:00 pm - 5:00 pm", "5:00 pm - 6:00 pm", "6:00 pm - 7:00 pm", "7:00 pm - 8:00 pm", "8:00 pm - 9:00 pm"];

  return (
    <div>
      <h1>Horas de uso del equipo en horario vespertino:</h1>
      <WeekGraphic scores={minutesPerHourNight} labels={labelsNight} />
      <br />
    </div>
  );
}
