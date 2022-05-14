import React, {useEffect} from 'react'
import jQuery from 'jquery'
import GraphItem from '../GraphItem';

//Рендерит график количества аварий при разных погодных условиях
export default function AccidentsTopWeatherCount() {
    //Данные из запроса
    const [datas, setData] = React.useState([]);

    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/weather/count")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);

    return(
        <div>
            <GraphItem 
                data={ //Ox - количество
                    jQuery.map(datas, function(n, i) {
                        return n.count;
                    })}
                labels={ //Oy - описание погодного условия
                    jQuery.map(datas, function(n, i) {
                        return n.name;
                    })}
                type={'bar'}
                index='y'
                title={'Количество аварий при различных погодных условиях'}
            />
        </div>
    )
}