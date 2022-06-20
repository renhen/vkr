import React, {useEffect} from 'react'
import jQuery from 'jquery'
import GraphItem from '../GraphItem';

//Рендерит график количества аварий от вины водителей
export default function AccidentTopDriverViolations() {
    //Данные из запроса
    const [datas, setData] = React.useState([]);

    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/driver/violations/top?count=5")
        .then(response => response.json())
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
                title={'Диаграмма вины водителей'}
            />
        </div>
    )
}