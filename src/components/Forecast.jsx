import { Fragment, useContext } from 'react'
import { Context } from '../Context'
import WeatherIcon from './WeatherIcon'
import { splitDateTime, getDayOfWeek, convertTemp, convertTo12Hour } from '../dataManipulation';


const arr = [0, 1, 2, 3, 4]
const Forecast = ({ weatherData }) => {
    const { color, bgColor, currentWeather } = useContext(Context)
    let forecastFiveDays = []
    if (weatherData) {
        forecastFiveDays = weatherData.slice(0, 5)
    }
    let i = 0
    return (
        <div className={`overflow-y-auto scrollbar-hide w-full lg:h-[400px] h-[400px] md:flex gap-1 justify-between flex-wrap backdrop-blur-3xl ${bgColor ? 'bg-slate-700/50' : 'bg-white/30'} border border-${color} border-opacity-30 p-5 rounded-3xl`}>
            {
                forecastFiveDays != "" ? forecastFiveDays?.map(item => {
                    const { date, time } = splitDateTime(item.dt_txt)
                    const day = getDayOfWeek(date)
                    const celsius = convertTemp(item.main.temp)
                    const formatedTime = convertTo12Hour(time)
                    i += 1;
                    return (<Fragment key={i}>
                        <div className={`md:flex-1 flex flex-col items-center justify-around text-center text-${color}`}>
                            <div className="flex flex-col gap-4">
                                <p className='font-header font-bold tracking-wider'>{day}</p>
                                <span className='font-content font-semibold tracking-widest'>{formatedTime}</span>
                            </div>
                            <WeatherIcon icon={item.weather[0].icon} />

                            <div className="flex flex-col gap-2 font-bold text-2xl">
                                <p>{celsius}° C </p>
                                <span>{item.main.temp}° F</span>
                            </div>
                        </div>
                        <div className={`bg-${color} ${i === 5 ? "hidden" : "block"} md:w-[.5px] md:h-[95%] w-full h-[.5px] md:my-auto my-4`}></div>
                    </Fragment>)
                }) :
                    arr.map(item => (
                        <Fragment key={item}>
                            <div className={`md:flex-1 flex flex-col items-center justify-around text-center text-${color}`}>
                                <div className="flex flex-col gap-4">
                                    <p className='font-header font-bold tracking-wider'>------</p>
                                    <span className='font-content font-semibold tracking-widest'>00 : 00 {''}--</span>
                                </div>
                                <WeatherIcon />

                                <div className="flex flex-col gap-2 font-bold text-2xl">
                                    <p>00.00° C </p>
                                    <span>00.00° F</span>
                                </div>
                            </div>
                            <div className={`bg-${color} ${item === 4 ? "hidden" : ""} md:w-[.5px] md:h-[95%] w-full h-[.5px] md:my-auto my-4`}></div>
                        </Fragment>
                    ))
            }
        </div>
    )
}

export default Forecast

