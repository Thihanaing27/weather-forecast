import clear_sky from '../assets/clear_sky.png'
import few_clouds from '../assets/few_clouds.png'
import rain from '../assets/rain.png'
import cloudy from '../assets/cloudy.png'
import extrem_cold from '../assets/extrem-cold.png'
import extrem_hot from '../assets/extrem-hot.png'
import mist from '../assets/mist.png'
import shower_rain from '../assets/shower_rain.png'
import snow from '../assets/snow.png'
import thunderstorm from '../assets/thunderstorm.png'
import default_icon from '../assets/default.png'


const WeatherIcon = ({ icon }) => {
    let img = ""
    switch (icon) {
        case "01d":
            img = clear_sky
            break;
        case "01n":
            img = clear_sky
            break;
        case "02d":
            img = few_clouds
            break;
        case "02n":
            img = few_clouds
            break;
        case "03d":
            img = cloudy
            break;
        case "03n":
            img = cloudy
            break;
        case "04d":
            img = cloudy
            break;
        case "04n":
            img = cloudy
            break;
        case "09d":
            img = shower_rain
            break;
        case "09n":
            img = shower_rain
            break;
        case "10d":
            img = rain
            break;
        case "10n":
            img = rain
            break;
        case "11d":
            img = thunderstorm
            break;
        case "11n":
            img = thunderstorm
            break;
        case "13d":
            img = snow
            break;
        case "13n":
            img = snow
            break;
        case "50d":
            img = mist
            break;
        case "50n":
            img = mist
            break;
        default:
            img = default_icon
            break;
    }

    if (img === "") {
        return "--------"
    }
    return (
        <img src={img} alt="" className='w-[150px]' />

    )
}

export default WeatherIcon