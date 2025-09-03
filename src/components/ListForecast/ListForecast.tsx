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
                            <p>{new Date(day.dt*1000).toLocaleDateString("es-Es", {weekday: "long"})}</p>
                        </div>

                        <div className={style.containerData}>
                            
                            {/* despejado */}
                            {day.weather[0].description.includes('claro') && 
                                <div className={style.sun}></div>
                            }

                            {/* nublado */}
                            {(day.weather[0].description.includes('nubes') || day.weather[0].description.includes('nuboso')) &&
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">partly_cloudy_day</span>
                                </div>
                            }

                            {/* lluvioso */}
                            {day.weather[0].description.includes('lluvia') && 
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">rainy_heavy</span>
                                </div>
                            }

                            {/* Niebla */}
                            {(day.weather[0].description.includes('niebla') || day.weather[0].description.includes('neblina')) && 
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">foggy</span>
                                </div>
                            }

                            {/* Tormenta */}
                            {day.weather[0].description.includes('tormenta') && 
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">rainy</span>
                                </div>
                            }

                            {/* Nieve */}
                            {day.weather[0].description.includes('nieve') &&
                                <div className={style.icon}>
                                    <span className="material-symbols-outlined">ac_unit</span>
                                </div>
                            }


                            
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