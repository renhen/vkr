import React from 'react'


//Вкладка коммуникаций
export default function CommunicationStats({active}) {
    const classes = []
    if(!active){    //Активна /не активна вкладка
        classes.push("deactive")
    }
    return(
        <div className={classes.join(' ')}>
            communications
        </div>
    )
}