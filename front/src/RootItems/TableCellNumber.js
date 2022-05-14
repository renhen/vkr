import React from 'react'

//Ячейка таблицы TableNumberStats, выводит информацию в текстовые поля
export default function TableCellNumber({data}){
    return (
        <div className='tableCell'>
            <h3>{data.descr}</h3>
            <h1>{data.num}</h1>
            <h4>{data.postfix}</h4>
        </div>
    )

}