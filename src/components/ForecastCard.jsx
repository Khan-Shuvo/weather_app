import React from 'react'

export default function ForecastCard({ forecast }) {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-4 shadow-lg flex flex-col items-center w-full sm:w-1/3 transition-all">
      <h3 className="font-semibold mb-2">{forecast.date}</h3>
      <img src={forecast.icon} alt="Weather" className="w-20 my-2" />
      <p className="text-lg font-bold">{forecast.temp}°C</p>
      <p className="opacity-80">{forecast.conditions}</p>
    </div>
  )
}
