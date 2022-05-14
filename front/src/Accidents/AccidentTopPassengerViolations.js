import React, {useEffect} from 'react'
import jQuery from 'jquery'
import GraphItem from '../GraphItem';

//Рендерит график вины пешеходов
export default function AccidentTopPassengerViolations() {
    //Данные из запроса
    const [datas, setData] = React.useState([]);

    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/passenger/violations/top?count=5")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);

    return(
        <div>
            <GraphItem 
                data={//Ox - количество
                    jQuery.map(datas, function(n, i) {
                        return n.count;
                    })}
                labels={//Oy - описание вины
                    jQuery.map(datas, function(n, i) {
                        return n.name;
                    })}
                    type={'bar'} index='y'
                title={'Диаграмма вины пешеходов'}
            />
        </div>
    )
}