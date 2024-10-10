import React from 'react';
import WeatherComponent from './components/WeatherComponent';
import { useState, useEffect } from 'react';
import { Context } from './Context';
import Cookies from 'js-cookie';


const App = () => {
  const [currentWeather, setCurrentWeather] = useState('Tnow')
  const [bgColor, setBgColor] = useState(true)
  const [color, setColor] = useState('white')
  const [theme, setTheme] = useState('dark')
  const [coordinate, setCoordinate] = useState({ lat: 0, long: 0 })

  useEffect(() => {
    const themed = Cookies.get('theme')
    if (!themed) {

    } else if (themed === 'dark') {
      setBgColor(false)
      setColor('black')
      setTheme('light')
    }
    else if (themed === 'light') {
      setBgColor(true)
      setColor('white')
      setTheme('dark')
    }
  }, [])

  return (
    <div>
      <Context.Provider value={{ currentWeather, setCurrentWeather, bgColor, setBgColor, color, setColor, theme, setTheme, coordinate, setCoordinate }}>
        <WeatherComponent />
      </Context.Provider>
    </div>
  );
};

export default App;