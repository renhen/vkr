import React, {useEffect} from 'react'
import jQuery from 'jquery'
import SingleTextLabel from '../RootItems/SingleTextLabel';

//Рендерит одиночное окно cо средней площадью на человека
export default function HousingAvgCareSingleLabel() {
    //Данные из запроса
    const [data, setData] = React.useState([]);
    
    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/building/stats/housing_availability/avg")
        .then(responce => responce.json())
        //Сохранение в данные json
        .then(result => setData(result))
    }, []);

    return(
        <div>
            <SingleTextLabel title={'Средняя обеспеченность в городе, 1кв.м. на 1 человека'} 
            number={data} />
        </div>
    )
}