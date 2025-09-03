import type { FC } from 'react'
import style from './ListForecast.module.css'


interface IListForecast {
    forecast : any[]
}


export const ListForecast : FC<IListForecast> = ({forecast}) => {


    return (
        <div className={style.containerPrincipal}>
            <div className={style.title}>
                <h3>Próximos días</h3>
            </div>

            <div className={style.containerForecast}>
                {forecast.map((day, index) => (
                    <div key={index} className={style.forecast}>
                        <div className={style.containerDay}>
                            <p>{new Date(day.dt*1000).toLocaleDateString("es-Es", {weekday: "long"})}</p>
                        </div>

                        <div className={style.containerData}>
                            
                            <p>{day.weather[0].description}</p>
                            <p>{Math.round(day.main.temp)}°</p>
                        </div>

                        <div className={style.containerHour}>
                            <p>12:00hs</p>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}