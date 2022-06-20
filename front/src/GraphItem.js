import React from "react"
import {Bar} from 'react-chartjs-2'

//Рендерит график по заданным данным
export default function GraphItem({
                                      data, //Данные
                                      type,   //Тип графика
                                      labels, //Поля (Ox)
                                      label,  //Поле, если Ox одинаковые
                                      title,
                                      index = '',
                                      legends = false,
                                  }) //Заголовок
{
    return (<div className='chartDIV'>
        <h2>{title}</h2>
        <div className='chartLabel'>
            <Bar

                data={{
                    datasets: [{
                        label: label,
                        type: type,
                        hoverOffset: 20,
                        data: data,
                        indexAxis: index,

                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,

                    }],

                    labels: labels
                }}
                height={800}
                width={1200}

                options={{maintainAspectRatio: false, skipNull: true ,plugins: {legend: legends}}}
            /></div>
    </div>)
}