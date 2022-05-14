import React, {useEffect} from 'react'
import jQuery from 'jquery'
import GraphItem from '../GraphItem';

//Рендерит график аварий при разных условиях освещенности
export default function AccidentsTopLightCount() {
    //Полученные данные
    const [datas, setData] = React.useState([]);

    //Запрос к API в json
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/light/count")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);

    return(
        <div>
            <GraphItem 
                data={  //Ox - количество
                    jQuery.map(datas, function(n, i) {
                        return n.count;
                    })}
                labels={//Oy - описание условия
                    jQuery.map(datas, function(n, i) {
                        return n.name;
                    })}
                    type={'bar'}
                index='y'
                title={'Количество аварий при разных условиях освещенности'}
            />
        </div>
    )
}