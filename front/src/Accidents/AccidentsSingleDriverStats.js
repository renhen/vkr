import { data } from 'jquery';
import React, {useEffect} from 'react'
import SingleTextLabel from '../RootItems/SingleTextLabel';

//Рендерит одиночное числовое поле количества дтп по вине водителя
export default function AccidentsSingleDriverStats() {
    //Данные из запроса
    const [datas, setData] = React.useState([]);

    //Запрос к API и получение в json
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/driver/violations/count")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);

    return(
        
        <div>
        {
            datas != null &&   //Рендерим числовое поле
            <SingleTextLabel title={'Количество дтп по вине водителя'} number={datas}/>
        }
            
        </div>
    )
}