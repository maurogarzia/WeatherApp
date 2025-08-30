import { useState } from 'react'
import style from './WeatherApp.module.css'

export const WeatherApp = () => {

    const apiKey = import.meta.env.VITE_API_KEY // clave de la api
    const [city, setCity] = useState<string>('') // Input de la ciudad
    const [weather, setWeather] = useState<any>(null) // Objeto weather


    const fetched = async() => {
        if (!city) return
        console.log(city);
        

        try {
            const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`) 
            const data = await response.json()
            console.log(data);
            
            setWeather(data)

        } catch (error : any) {

            console.log("Ocurrio un error en encontrar la ciudad");
            alert("Ocurrio un error al buscar la ciudad")
        }
    }

    console.log(weather);
    

    return (
        <div className={style.containerPrincipal}>
            <header className={style.header}>
                <input type="text" name="city" value={city} placeholder='Ingrese ciudad...' onChange={(e) => setCity(e.target.value)}/>

                <span onClick={fetched} className="material-symbols-outlined">
                    search
                </span>
                
            </header>

            {weather ? 
            <div className={style.data}>
                <div className={style.title}>
                    <h2>{weather.name} ({weather.sys.country})</h2>
                </div>

                <div className={style.actuallyTemp}>
                    <p>{weather.main.temp}°</p>
                    <p>{weather.weather[0].main}</p>
                </div>

                <div className={style.datum}>

                    
                    <p>Sensación térmica: {weather.main.feels_like}°</p>
                    <p>Mínima: {weather.main.temp_min}°</p>
                    <p>Máxima: {weather.main.temp_max}°</p>
                    <p>Humedad: {weather.main.humidity}%</p>
                    <p>Presión atmosférica: {weather.main.pressure}</p>
                </div>
            </div>    

            : 
            <div className={style.data}>
                <p>No hay ninguna ciudad seleccionada</p>
            </div>
        }
        </div>
    )
}