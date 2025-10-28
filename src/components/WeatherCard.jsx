import React from 'react'

export default function WeatherCard({ weather }) {
    return (
        <div className="transition-all duration-500 ease-in-out transform bg-white/10 backdrop-blur-md text-white rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto text-center mt-10">
            <h2 className='text-2xl font-semibold mb-2'>{weather.city || "City"}</h2>
            <p className=' text-lg opacity-80'>{weather.conditions || "Weather condition"}</p>
            <img
                src={weather.icon || "https://openweathermap.org/img/wn/01d.png"}
                alt='Weathe png'
                className='w-24 mx-auto my-4' />
            <h1 className='text-5xl font-bold'>
                {weather.temp || "25"}°C
            </h1>
            <div className='flex justify-between mt-4 text-sm opacity-90'>
                <p>Humidity: {weather.humidity || "65"}%</p>
                <p>Wind: {weather.wind || "5"}Km/h</p>
            </div>
        </div>
    )
}
