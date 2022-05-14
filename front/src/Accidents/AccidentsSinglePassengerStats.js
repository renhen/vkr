import { data } from 'jquery';
import React, {useEffect} from 'react'
import SingleTextLabel from '../RootItems/SingleTextLabel';

//Рендерит числовое поле количества дтп по вине пешехода
export default function AccidentsSinglePassengerStats() {
    //Данные из запроса 
    const [datas, setData] = React.useState([]);

    //Запрос к API в json
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/dtp/stat/passenger/violations/count")
        .then(responce => responce.json())
        .then(result =>setData(result))
    }, []);

    return(
        
        <div>
        {
            datas != null &&    //Рендерим числовое поле
            <SingleTextLabel title={'Количество дтп по вине пешехода'} number={datas}/>
        }
            
        </div>
    )
}