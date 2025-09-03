import { useEffect, useState } from 'react'
import style from './WeatherApp.module.css'
import { formatLocalDate, formatLocalTime } from '../../utils/getLocalTime'
import { setTime } from '../../utils/setTime'
import { capitalize } from '../../utils/capitalize'
import { ListForecast } from '../ListForecast/ListForecast'

export const WeatherApp = () => {

    const apiKey = import.meta.env.VITE_API_KEY // clave de la api
    const [city, setCity] = useState<string>('') // Input de la ciudad
    const [weather, setWeather] = useState<any>(null) // Objeto weather
    const [forecast, setForecast] = useState<any[]>([]) 

    // Estado que controlara el fondo de la aplicacion
    const [temp, setTemp] = useState<string>('day')

    useEffect(() => {

        if (!weather) return 

        const isDay = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset // Calculo horario del amanecer y anochecer
        setTemp(isDay ? 'day' : 'night')

    },[weather])

    const fetchForecast = async() => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`)
            const data = await response.json()

            if (data.cod != 200){
                alert('No se pudo obtener el pronóstico')
                console.log("error al obtener el pronostico");
            }

            const listForecast = data.list.filter((item : any) => item.dt_txt.includes("12:00:00"))
            
            setForecast(listForecast)
        } catch (error) {
            console.log("Ocurrió un error al ver el pronostico");
            alert("Ocurrió un error al ver el pronostico")
        }
    }
    
    const fetched = async() => {
        if (!city) return
        console.log(city);
        
        try {
            const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`) 
            const data = await response.json()
            
            if (data.cod !== 200) {
                setWeather(null)
                alert('Ciudad no encontrada')    
                return
            }

            setWeather(data)
            fetchForecast() // Llamo al endpoint del pronostico
            
        } catch (error : any) {
            
            console.log("Ocurrio un error en encontrar la ciudad");
            alert("Ocurrio un error al buscar la ciudad")
            
        }
    }

    const {backgroundColor, climate} = weather ? setTime(weather.weather[0].description, temp) : {backgroundColor: '#00d5ff', climate: ''}
    
    
    return (
        <div className={style.containerPrincipal}  
        style={{ backgroundColor}}>

            <header className={style.header}>
                <input type="text" name="city" value={city} placeholder='Ingrese ciudad...' onChange={(e) => setCity(e.target.value)}/>

                <span onClick={fetched} className="material-symbols-outlined">
                    search
                </span>
                
            </header>

            {weather ? 

                <div className={style.existWeather}>

                    <div style={{"width" : "100%", "display" : "flex", "gap" : "10px", "flexDirection" : "column", "justifyContent" : "center", "alignItems" : 'center'}}>
                        
                        
                        <h2 className={style.title}>
                            {weather.name}
                            ({weather.sys.country})
                            
                            <a className={style.location} href={`https://www.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}`} target='blank'>
                                <span className="material-symbols-outlined">location_on</span>
                            </a>
                        </h2>
                        

                    {/* Despejado */}
                    {climate === 'diaDespejado' && <div className={style.sun}></div>}
                    {climate === 'nocheDespejada' && 
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">moon_stars</span>
                        </div>
                    }

                    {/* NUblado */}
                    {climate === 'diaNublado' && 
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">partly_cloudy_day</span>
                        </div>
                    }
                    {climate === 'nocheNublada' && 
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">partly_cloudy_night</span>
                        </div>
                    }

                    {/* Lluvioso */}
                    {climate === 'lluvioso' && 
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">rainy_heavy</span>
                        </div>
                    }

                    {/* Niebla */}
                    {climate === 'niebla' && 
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">foggy</span>
                        </div>
                    }

                    {/* Nieve */}
                    {climate === 'nieve'}
                        {/* <div className={style.moon}>
                            <span className="material-symbols-outlined">ac_unit</span>
                        </div> */}
                    </div>

                    {/* Tormenta */}
                    {climate === 'tormenta' &&
                        <div className={style.moon}>
                            <span className="material-symbols-outlined">rainy</span>
                        </div>
                    }

                    <div className={style.data}>

                        <div className={style.actuallyTemp}>
                            <p>{weather.main.temp}°</p>
                            <p>{capitalize(weather.weather[0].description)}</p>
                            <p>{formatLocalDate(weather.dt, weather.timezone)} | {formatLocalTime(weather.dt, weather.timezone)}hs</p>
                        </div>

                        {forecast.length > 0 ? 
                            <ListForecast forecast={forecast}/>
                            : 
                            null
                        }

                        <div className={style.datum}>
                            
                            <div className={style.containerData}>
                                <span className="material-symbols-outlined">thermometer</span>
                                <p>Sensación térmica</p>
                                <p>{weather.main.feels_like}°</p>
                            </div>

                            <hr />

                            <div className={style.containerData}>  
                                <span className="material-symbols-outlined">thermometer_minus</span>
                                <p>Mínima</p>                              
                                <p>{weather.main.temp_min}°</p>
                            </div>

                            <hr />

                            <div className={style.containerData}>
                                <span className="material-symbols-outlined">thermometer_add</span>
                                <p>Máxima</p>
                                <p>{weather.main.temp_max}°</p>
                            </div>

                            <hr />

                            <div className={style.containerData}>
                                <span className="material-symbols-outlined">humidity_low</span>
                                <p>Humedad</p>
                                <p>{weather.main.humidity}%</p>
                            </div>

                            <hr />

                            <div className={style.containerData}>
                                <span className="material-symbols-outlined">compress</span>
                                <p>Presión atmosférica</p>
                                <p>{weather.main.pressure} mb</p>
                            </div>

                            <hr />

                            <div className={style.containerData}>
                                <span className="material-symbols-outlined">air</span>
                                <p>Viento</p>
                                <p>{weather.wind.speed} m/s</p>
                            </div>
                        </div>
                    </div>    
                </div>


            : 
            <div className={style.datum}>
                <p>No hay ninguna ciudad seleccionada</p>
            </div>
        }
        </div>
    )
}