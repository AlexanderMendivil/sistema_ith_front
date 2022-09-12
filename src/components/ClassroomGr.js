import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler );

const options = {
    responsive: false,
    fill: true,
}

export default function ClassroomGr({scores, labels}) {
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Horas de uso  por aula (semanal)",
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
    return <Bar data={data} options={options} />;
}