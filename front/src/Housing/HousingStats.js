import React from 'react'
import HousingAlarmChart from './HousingAlarmChart'
import HousingAvgCareSingleLabel from './HousingAvgCareSingleLabel'
import HousingNumberTable from './HousingNumberTable'
import HousingRepairChart from './HousingRepairChart'
import HousingTopFloors from './HousingTopFloors'
import HousingYearBuildingChart from './HousingYearBuildingChart'


//Главный элемент вкладки жилья, рендерит все графики, используется из Body
export default function HousingStats() {
    
    return(
        <div>
        <div className='chartTable'>
            <HousingAlarmChart />
            <HousingRepairChart />
            <HousingAvgCareSingleLabel />
            <HousingNumberTable />
            <HousingTopFloors />
            <HousingYearBuildingChart />
        </div>
            
           
        </div>
    ) 
}

  