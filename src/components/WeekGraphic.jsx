import { useMemo, useContext } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";
import { AppContext } from "../context/AppContext";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const options = {
    responsive: true,
    fill: true,
}

export default function WeekGraphic({scores, labels}) {
    const { minutesPerHourNight } = useContext( AppContext )
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Horas de uso por día",
                    data: minutesPerHourNight,
                    tension: 0.4,
                    borderColor: "blue",
                    pointRadius: 5,
                },
                
            ],
            labels
        };
    }, [scores]);

    return <Line data={data} options={options} />
}