import React, {useEffect} from 'react'
import GraphItem from '../GraphItem'
import jQuery from 'jquery'

//Рендерит график типов работ с жильем
export default function HousingRepairChart() {
    //Данные с запроса
    const [datas, setData] = React.useState([]);

    //Запрос к API
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/building/repair_work/count")
            .then(responce => responce.json())
            .then(result => setData(result))
    }, []);


    return (
        <GraphItem data={
            jQuery.map(datas, function (n, i) {
                //Oy - count
                if (n.count > 10) {
                    return n.count;
                }
            })} type={'bar'}
                   index='y'
                   labels={
                       jQuery.map(datas, function (n, i) {
                           //Ox - name
                           if (n.count > 10) {

                               return n.name
                           }
                       })}
                   title={"Распределение типов работ"}
                   legends={false}/>);
}

