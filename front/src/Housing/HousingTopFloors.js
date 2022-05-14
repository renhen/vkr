import React, {useEffect} from 'react'
import GraphItem from '../GraphItem'
import jQuery, { data } from 'jquery'

//Рендерит график распределения кол-ва построек и их этажность
export default function HousingTopFloors() {
    //Данные из запроса 
    const [datas, setData] = React.useState([]);
    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/building/floor/count")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);


    return(
        <div>
            {
                datas.length > 0 &&
                <GraphItem data={
                    //Сортируем по количеству n-этажных домов
                    //Выбираем первые 6
                    //Выкидываем некорректные значения
                   jQuery.map(datas.sort((a, b) => b.count - a.count)
                   .slice(0, 6)
                   .sort((a, b) => a.floor - b.floor),
                   function(n, i) {
                       return n.count;
                   })
                } 
                    type={'bar'}
                    labels={
                        //Сортируем по количеству n-этажных домов
                        //Выбираем первые 6
                        //Выкидываем некорректные значения
                        jQuery.map(datas.sort((a, b) => b.count - a.count)
                        .slice(0, 6)
                        .sort((a, b) => a.floor - b.floor),
                            function(n, i) {
                                if(n.floor != null) return n.floor + '-х этажный дом';
                   })}
                   title={'Распределение количества домов-многоэтажек'}
                />
            }
        </div>
    );

}