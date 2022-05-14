import React from 'react'
import TableCellNumber from './TableCellNumber'

//Таблица цифровых данных
export default function TableNumberStats(props){
    return (
        <div>
        <h3>{props.title}</h3>
        <div className='table'>
            {
                props.numberData.map(data => { 
                    //Для каждого элемента массива создает ячейку и заполняет ее
                    return <TableCellNumber data={data}/>
                })
            }
        </div>
        </div>
    )
}