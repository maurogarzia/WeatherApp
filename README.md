# ⛅ WeatherApp

Aplicación web hecha con **React + Vite + TypeScript** que consume la API de [OpenWeatherMap](https://openweathermap.org/) para mostrar el clima actual y el pronóstico de los próximos días en cualquier ciudad del mundo.  

## 🚀 Características

- Buscar el clima por ciudad.
- Mostrar datos principales:
  - 🌡️ Temperatura actual, mínima y máxima.  
  - 🤒 Sensación térmica.  
  - 💧 Humedad.  
  - 📊 Presión atmosférica.  
  - 🌬️ Velocidad y dirección del viento.  
- Diferencia entre **día y noche** con colores de fondo y formas (sol/luna).  
- Pronóstico de los próximos días.  
- Interfaz en español gracias al parámetro `lang=es` de la API.  

---

## 🛠️ Tecnologías utilizadas

- **React** con **Vite** ⚡
- **TypeScript**
- **CSS Modules** para los estilos
- **OpenWeatherMap API**
- **Material Symbols** para íconos

---

## 📦 Instalación y uso

1. Cloná el repositorio:

```bash
git clone https://github.com/tuusuario/weatherapp.git
cd weatherapp
```

2.Instalá las dependencias:

```bash
npm install
```

3.Creá un archivo .env en la raíz del proyecto con tu API key de OpenWeatherMap:

```bash
VITE_API_KEY=tu_api_key_aqui
```
4. Levantá el proyecto en modo desarrollo:

```bash
npm run dev
```

5.Generá la build de producción:

```bash
npm run build
```

Vercel: http://weather-app-ivory-nine-68.vercel.app

