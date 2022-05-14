import React, {useEffect} from 'react'
import jQuery from 'jquery'
import GraphItem from '../GraphItem';

//Рендерит график зависимости постройки домов от года 
export default function HousingYearBuildingChart() {
    //Данные из запроса
    const [data, setData] = React.useState([]);
    
    //Запрос к API в json
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/building/built_year/count")
        .then(responce => responce.json())
        .then(result => setData(result))
    }, []);


    return(
        <div>
        {
            data.length > 0 && //Достаем все не null данные, отправляем в график
            <GraphItem data = {jQuery.map(data, function(n, i) { if(n.built_year != null) return n.count;})}
                    type = {'line'}
                    labels = {jQuery.map(data, function(n, i) { if(n.built_year != null) return n.built_year;})}
                    title= {'Распределение количества построек по годам'}
            />
        }
        </div>
    );
}