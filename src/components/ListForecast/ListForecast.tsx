import { type FC } from 'react'
import style from './ListForecast.module.css'



interface IListForecast {
    forecast : any[],
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
                            <p>{new Date(day.date).toLocaleDateString("es-ES", { weekday: "long" })}</p>
                        </div>

                        <div className={style.containerData}>
                            
                             {/* despejado */}
                            {day.weather?.description.includes("claro") && 
                                <div className={style.sun}></div>
                            }

                            {/* nublado */}
                            {(day.weather?.description.includes('nubes') || day.weather?.description.includes('nuboso')) &&
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">partly_cloudy_day</span>
                                </div>
                            }

                            {/* lluvioso */}
                            {day.weather?.description.includes('lluvia') && 
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">rainy_heavy</span>
                                </div>
                            }

                            {/* niebla */}
                            {(day.weather?.description.includes('niebla') || day.weather?.description.includes('neblina')) && 
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">foggy</span>
                                </div>
                            }


                            
                            <p>Min: {Math.round(day.min)}°</p>
                            <p>Max: {Math.round(day.max)}°</p>
                        </div>

                    </div>
                ))}
                
            </div>
        </div>
    )
}