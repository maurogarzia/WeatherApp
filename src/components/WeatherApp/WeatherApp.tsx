import { useEffect, useState } from 'react'
import style from './WeatherApp.module.css'
import { formatLocalDate, formatLocalTime } from '../../utils/getLocalTime'

export const WeatherApp = () => {

    const apiKey = import.meta.env.VITE_API_KEY // clave de la api
    const [city, setCity] = useState<string>('') // Input de la ciudad
    const [weather, setWeather] = useState<any>(null) // Objeto weather


    // Estado que controlara el fondo de la aplicacion
    const [temp, setTemp] = useState<string>('day')

    
    useEffect(() => {

        if (!weather) return 

        const isDay = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset
        setTemp(isDay ? 'day' : 'night')

    },[weather])

    // Funcion para que el texto devuelva la primer letra en mayuscula
    const capitalize = (text : string) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
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
            
        } catch (error : any) {
            
            console.log("Ocurrio un error en encontrar la ciudad");
            alert("Ocurrio un error al buscar la ciudad")
            
        }
    }
    
    return (
        <div className={temp === 'day' ? style.containerPrincipalDay : style.containerPrincipalNight}>
            <header className={style.header}>
                <input type="text" name="city" value={city} placeholder='Ingrese ciudad...' onChange={(e) => setCity(e.target.value)}/>

                <span onClick={fetched} className="material-symbols-outlined">
                    search
                </span>
                
            </header>

            {weather ? 

                <div className={style.existWeather}>

                    <div style={{"width" : "100%", "display" : "flex", "gap" : "10px", "flexDirection" : "column", "justifyContent" : "center", "alignItems" : 'center'}}>
                        <div className={style.title}>
                            <h2>{weather.name} ({weather.sys.country})</h2>
                        </div>
                        {temp === 'day' ? 
                            <div className={style.sun}>
                                {/* Sol que se refleja */}
                            </div>

                            : 

                            <div className={style.moon}>
                                {/* Luna que se refleja */}
                                <span className="material-symbols-outlined">
                                    moon_stars
                                </span>
                            </div>
                        
                        }
                    </div>

                    <div className={style.data}>

                        <div className={style.actuallyTemp}>
                            <p>{weather.main.temp}°</p>
                            <p>{capitalize(weather.weather[0].description)}</p>
                            <p>{formatLocalDate(weather.dt, weather.timezone)} | {formatLocalTime(weather.dt, weather.timezone)}hs</p>
                        </div>

                        <div className={style.datum}>
                            
                            <p>Sensación térmica: {weather.main.feels_like}°</p>
                            <p>Mínima: {weather.main.temp_min}°</p>
                            <p>Máxima: {weather.main.temp_max}°</p>
                            <p>Humedad: {weather.main.humidity}%</p>
                            <p>Presión atmosférica: {weather.main.pressure}</p>
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