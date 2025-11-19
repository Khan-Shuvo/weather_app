export default function WeatherCard({ weather }) {
    return (
        <div className="
            bg-white/10 backdrop-blur-md text-white 
            rounded-2xl p-6 shadow-lg 
            w-full max-w-sm mx-auto text-center mt-10
            transition-all duration-500
        ">
            <h2 className="text-2xl font-semibold mb-1">
                {weather.city}
            </h2>

            <p className="text-lg opacity-80">
                {weather.conditions}
            </p>

            <img
                src={weather.icon}
                alt="Weather"
                className="w-24 mx-auto my-4"
            />

            <h1 className="text-5xl font-bold">
                {weather.temp}°C
            </h1>

            <div className="flex justify-between mt-5 text-sm opacity-90">
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.wind} Km/h</p>
            </div>
        </div>
    )
}
