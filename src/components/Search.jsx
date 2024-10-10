import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Context } from '../Context';
import axios from 'axios';

const Search = ({ handleSearch, setCity, city, }) => {
    const { color, bgColor, coordinate, setCoordinate } = useContext(Context)

    const [debouncedCity, setDebouncedCity] = useState(city);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCity(city);
        }, 500); // 500ms delay before making the API request

        return () => {
            clearTimeout(handler);
        };
    }, [city]);

    const apiKey = 'e5b075de28msh2af967e57af6f59p1750f9jsnd75a9370dcea';  // Replace with your actual GeoDB API key

    const fetchCities = async (inputValue) => {
        if (!inputValue || inputValue.length < 3) return { data: [] }; // Fetch only if input is >= 3 characters

        const response = await axios.get(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
            {
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                },
                params: {
                    namePrefix: inputValue,
                    limit: 10, // Set the limit for suggestions
                },
            }
        );
        // console.log(response)
        return response.data.data;
    };

    const { data: suggestions, isFetching, error } = useQuery(['fetchCities', debouncedCity],
        () => fetchCities(debouncedCity),
        {
            enabled: debouncedCity.length >= 3, // Only fetch if input is at least 3 characters
            staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        })

    const selectSuggestion = (suggestion) => {
        const { latitude, longitude } = suggestion;
        console.log(latitude, longitude)
        setCity(suggestion.city);
        setCoordinate({ ...coordinate, lat: latitude, long: longitude });
        setDebouncedCity([])
    };
    return (
        <>
            <form className='w-full lg:flex flex-col justify-center items-end' onSubmit={handleSearch}>
                <div className='lg:w-[40%] w-full float-end flex-1 justify-center items-center relative rounded-full overflow-hidden'>
                    <input value={city}
                        onChange={(e) => setCity(e.target.value)} type="text" className={`w-full flex-1  text-${color} px-4 py-2 h-full md:text-xl text-base outline-none  backdrop-blur-3xl ${bgColor ? 'bg-slate-700/50' : 'bg-white/30'} borde border-${color} border-opacity-30' placeholder='Enter City To Search`} />
                    <button type="submit" className='absolute right-3 top-0 bottom-0'>
                        <FontAwesomeIcon icon={faSearch} className={`text-${color} w-6 h-6`} />
                    </button>
                </div>
                <div className={`mt-11 md:mt-5 text-start  w-full lg:w-[40%] relative  text-${color} ${bgColor ? 'bg-slate-700/50' : 'bg-white/30'} borde border-${color}`}>
                    {error && <p className="text-red-700 lowercase text-center text-xl font-semibold tracking-wider">{error}</p>}
                    {isFetching && <p>Loading...</p>}
                    {/* {error && <p>Error fetching cities</p>} */}
                    {suggestions && suggestions.length > 0 && (
                        <div className={`p-3 scrollbar-hide absolute text-${color} ${bgColor ? 'bg-slate-700' : 'bg-white/90'} borde border-${color} rounded mt-1 max-h-60 overflow-y-auto z-20`}>
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    onClick={() => selectSuggestion(suggestion)}
                                    className={`cursor-pointer p-2 ${bgColor ? 'hover:bg-gray-900' : 'hover:bg-gray-300'}`}
                                >
                                    {suggestion.city}, {suggestion.country}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </form>

        </>
    )
}

export default Search