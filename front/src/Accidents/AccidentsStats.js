import React from 'react'
import AccidentsSingleDriverStats from './AccidentsSingleDriverStats'
import AccidentsSinglePassengerStats from './AccidentsSinglePassengerStats'
import AccidentTopDriverViolations from './AccidentTopDriverViolations'
import AccidentTopPassengerViolations from './AccidentTopPassengerViolations'
import AccidentsTopWeatherCount from './AccidentsTorWeatherCount'
import AccidentsTopLightCount from './AccidentsTorLightCount'

//Рендерит все графики и поля для вкладки аварий
export default function AccidentsStats({active}) {
    return(
        <div className='chartTable'>
            <AccidentsSingleDriverStats />
            <AccidentsSinglePassengerStats />
            <AccidentTopDriverViolations />
            <AccidentTopPassengerViolations />
            <AccidentsTopWeatherCount />
            <AccidentsTopLightCount />
        </div>
    )
}