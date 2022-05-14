import React from 'react'
import AccidentsStats from './Accidents/AccidentsStats'
import CommunicationStats from './CommunicationStats'
import DemographyStats from './Demography/DemographyStats'
import HousingStats from './Housing/HousingStats'
import { MainMap } from './RootItems/MainMap'

//Основной элемент, рэндерит все вкладки, если они активны
export default function Body(props) {
        return(
        <div className="bodyContent">
           <MainMap />
            {
                props.tabStates.demography && // Вкладка с демографией
                <DemographyStats active={props.tabStates.demography}/> 
            }
            {
                props.tabStates.housing &&  //Вкладка с жильем
                <HousingStats active={props.tabStates.housing}/>
            }
            {
                props.tabStates.communications &&   //Вкладка коммуникаций
                <CommunicationStats active={props.tabStates.communications}/>
            }
            {
                props.tabStates.accidents &&    //Вкладка аварий
                <AccidentsStats active={props.tabStates.accidents}/>
            }
        </div>
    )
}