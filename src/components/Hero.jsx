import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../Context';
import WeatherIcon from './WeatherIcon';
import { splitDateTime, getDayOfWeek, convertTemp } from '../dataManipulation';



const Hero = ({ list, city, today }) => {
    const { currentWeather, setCurrentWeather, color, bgColor } = useContext(Context)
    const dayOfWeek = getDayOfWeek(today);
    const todayWeather = list?.filter(item => {
        const { date, time } = splitDateTime(item.dt_txt);
        return date === today;
    })
    return (
        <div className='flex min-w-full gap-10 h-[50%] items-center flex-wrap'>
            <div className={`backdrop-blur-3xl h-full flex-1 ${bgColor ? 'bg-slate-700/50' : 'bg-white/30'} border border-${color} border-opacity-30 p-5 text-${color} md:text-2xl  rounded-3xl  shadow-2xl`}>
                <h2 className="font-header md:text-xl text-lg text-center">{city && city} Weather Report</h2>
                <div className={`w-[95%] h-[.5px] bg-${color} my-2 mx-auto`}></div>
                <div className='flex justify-between items-center'>
                    <div className="flex flex-col justify-center items-center gap-8 flex-1 px-5 py-6">
                        <WeatherIcon icon={todayWeather ? todayWeather[0].weather[0].icon : ""} />
                        <p className='md:text-lg text-base'><FontAwesomeIcon icon={faWind} /> {todayWeather ? todayWeather[0].wind.speed : "0.00"} KM/M </p>
                    </div>
                    <div className={`w-full  h-[.5px] bg-${color} md:mx-auto mx-0 rotate-90 flex-1`} />
                    <div className="flex flex-col justify-center text-center items-center gap-12 flex-1  px-5 py-6">
                        <div className="  w-full flex flex-col gap-4">
                            <p className='md:text-lg text-base font-bold tracking-widest uppercase font-header'>{dayOfWeek && dayOfWeek}
                            </p>
                            <span className="md:text-lg text-base">{today}</span>
                            <span className="text-base font-content tracking-wider uppercase font-semibold">{todayWeather ? todayWeather[0].weather[0].main : "-------"}</span>
                        </div>
                        <div className="w-full flex flex-col gap-2 font-bold">
                            <p>{todayWeather ? convertTemp(todayWeather[0].main.temp) : "00.00"}° C </p>
                            <span>{todayWeather ? todayWeather[0].main.temp : "00.00"}° F</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`backdrop-blur-3xl h-full flex-1 font-content ${bgColor ? 'bg-slate-700/50' : 'bg-white/30'} border border-${color} border-opacity-30 p-5  text-${color} md:text-xl text-lg rounded-3xl  shadow-2xl`}>
                <div className='flex justify-between p-2'>
                    <div className='flex flex-col gap-3'>
                        <p>Feels like</p>
                        <p>Ground level </p>
                        <p>Humidity </p>
                        <p>Pressure </p>
                        <p>Sea Level</p>
                        <p>Temperature</p>
                        <p>Max Temperature</p>
                        <p>Min Temperature</p>
                    </div>
                    <div className='flex flex-col gap-3 font-extrabold'>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                    </div>
                    <div className='flex flex-col gap-3 font-semibold'>
                        <p>{todayWeather ? todayWeather[0].main.feels_like : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.grnd_level : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.humidity : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.pressure : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.sea_level : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.temp : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.temp_max : '000.00'}</p>
                        <p>{todayWeather ? todayWeather[0].main.temp_min : '000.00'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero