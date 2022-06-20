import React, {useEffect} from 'react'
import TableNumberStats from '../RootItems/TableNumberStats'

//Таблица численных данных для жилья
export default function HousingNumberTable() {
    //Данные из запроса
    const [archData, setArchData] = React.useState([]);
    
    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/building/stats/architectural")
        .then(responce => responce.json())
        .then(result => setArchData(result))
    }, []);

    return (
        <div>
        {
            archData.length > 0 &&  
            <TableNumberStats numberData={[
            {
                descr: 'Общее количество зданий, требующих ремонта',
                num: archData[0].count_all_house
            },
            {
                descr: 'Количество зданий архитектурного наследия',
                num: archData[0].count_architectural_house
            },
            {
                descr: 'Каждое',
                num: Math.floor(archData[0].count_all_house/archData[0].count_architectural_house),
                postfix: 'здание является архитектурным наследием'
            }]}/>
        }
        </div>
    )
}