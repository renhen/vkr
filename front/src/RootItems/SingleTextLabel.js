import React, {useEffect} from 'react'
import jQuery from 'jquery'

//Рендерит таблицу с одиночным цифровым окном
export default function SingleTextLabel({
    title, //Заголовок
    number}) {   //Соотв. ему число
    return(
        <div className='singleTextLabel'>
            <h2>{title}</h2>
            <h3>{number}</h3>
        </div>
    )
}