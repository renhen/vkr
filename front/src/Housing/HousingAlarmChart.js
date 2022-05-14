import React, {useEffect} from 'react'
import GraphItem from '../GraphItem'
import jQuery from 'jquery'

//Рендерит график аварийного жилья
export default function HousingAlarmChart() {
  //Полученные данные из запроса
  const [datas, setData] = React.useState([]);
  //Запрос к API
  useEffect(() => {
      fetch("http://localhost:8000/api/v1/building/emergency/count")
      //В json формате
      .then(responce => responce.json()) 
      .then(result =>setData(result))
  }, []);
    

  //Рендерим круговой график, по количеству тех или иных объектов
  return(
  <GraphItem data={
      jQuery.map(datas, function(n, i) {
          return n.count;
  })} type={'bar'} index='y' labels={['Не является аварийным', 'Аварийное жилое имущество']} 
  title={"Распределение количества аварийных домов"} />);
}