import React, { useEffect } from 'react';
import Header from './Header'
import Search from './Search';
import Hero from './Hero';
import Forecast from './Forecast';
import Footer from './Footer';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState, useContext } from 'react';
import { Context } from '../Context';


const fetchWeather = async (coordinate, apiKey) => {
    const response = await axios.get(
        // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.long}&appid=${apiKey}`
    )
    return response.data;
};

const today = new Date().toISOString().split('T')[0];


const WeatherComponent = () => {
    const { currentWeather, setCurrentWeather, bgColor, coordinate } = useContext(Context)
    const [city, setCity] = useState(''); // State to track input field
    const [error, setError] = useState('');

    const { data, isError, error: queryError, isLoading, refetch } = useQuery(
        ['weather', coordinate],
        () => fetchWeather(coordinate, '078cbc081bde28c373331173418e7ab1'),
        {
            enabled: false, // Don't fetch on component load
        }
    );
    const handleSearch = (e) => {
        e.preventDefault();
        if (!city.trim()) {
            setError('City name is required');
            return;
        }
        setError(''); // Clear error if input is valid
        refetch(); // Trigger data fetching
        setCurrentWeather(data?.list[0].weather[0].main)

    };



    return (
        <div className={`${bgColor ? "bg-gradient-to-r from-gray-600 to-gray-900" : "bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400"} lg:h-fit min-h-screen flex  items-center  flex-col uppercase`}>
            <Header />

            <div className='w-full  h-full flex flex-col items-center lg:gap-12 gap-8 lg:px-[10rem] px-[5rem] py-[1rem]'>
                {/* <CitySearch setCity={setCity} city={city} /> */}
                <Search handleSearch={handleSearch} setCity={setCity} city={city} error={error} />
                {
                    isLoading ? 'Loading....' : ""
                }
                <Hero list={data?.list} city={data?.city.name} today={today} setCurrentWeather={setCurrentWeather} />
                <Forecast weatherData={data?.list} />
            </div>

            <div className={`w-[95%] h-[.5px] ${bgColor ? "bg-slate-100 my-2" : "bg-black my-2"} `}></div>

            <div className='w-full h-[80px] '>
                <Footer />
            </div>
        </div>
    );
};

export default WeatherComponent;
