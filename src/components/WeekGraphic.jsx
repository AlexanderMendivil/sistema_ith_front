import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const options = {
    responsive: true,
    fill: true,
}

export default function WeekGraphic({scores, scores2, labels}) {
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Horas de uso por día",
                    data: scores,
                    tension: 0.4,
                    borderColor: "blue",
                    pointRadius: 5,
                },
                {
                    label: "Horas de uso reales por día",
                    data: scores2,
                    tension: 0.4,
                    borderColor: "red",
                    pointRadius: 5,
                },
            ],
            labels
        };
    }, [scores, scores2]);

    return <Line data={data} options={options} />
}