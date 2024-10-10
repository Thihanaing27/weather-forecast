import { Context } from "../Context"
import { useContext } from "react"
import Cookies from 'js-cookie';

const toggle = ({ bgColor, setBgColor, color, setColor, theme, setTheme }) => {
    if (color === 'white' && theme === "dark") {
        setBgColor(!bgColor) //false
        setColor('black') //white to black
        setTheme('light') //light mood
    } else if (color === 'black' && theme === 'light') {
        setBgColor(!bgColor)
        setColor('white')
        setTheme('dark')
    }
    Cookies.set('theme', theme)
}

const Toggle = () => {
    const { bgColor, setBgColor, color, setColor, theme, setTheme } = useContext(Context)
    // console.log(theme)
    return (
        <div onClick={() => toggle({ bgColor, setBgColor, color, setColor, theme, setTheme })} className={` md:w-[60px] md:h-[30px] w-[40px] h-[20px] ${bgColor ? 'bg-white' : 'bg-gray-900'} rounded-full p-[.5px] `}>
            <div className={`w-[50%] h-full ${bgColor ? 'bg-gray-900' : 'bg-white translate-x-[100%]'} transition-all duration-500 ease-in-out rounded-full`}></div>
        </div>
    )
}

export default Toggle


