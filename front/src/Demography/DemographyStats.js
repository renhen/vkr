import React from 'react'


export default function DemographyStats({active, numberData}) {
    const classes = []

    if(!active){
        classes.push("deactive")
    }
    return(
        <div className={classes}>
            demography
        </div>
    )
}