import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const options = {
    responsive: true,
    fill: true,
}

export default function WeekGraphic({scores, labels}) {
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Horas de uso  por día",
                    data: scores,
                    tension: 0.4,
                    borderColor: "cornFlowerBlue",
                    pointRadius: 5,
                },
            ],
            labels
        };
    }, []);

    //si la grafica no carga, borrar el parametro data y poner scores, para luego volver a poner data
    return <Line data={data} options={options} />
}