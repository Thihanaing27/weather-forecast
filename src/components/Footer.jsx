import { useContext } from 'react'
import { Context } from '../Context'

const Footer = () => {
    const { color, bgColor } = useContext(Context)
    return (
        <div className={`flex md:justify-start justify-center items-center w-full h-full text-${color} text-end px-9`}>
            <h1 className="font-content lowercase md:text-lg text-sm">design & developed by  <span className="font-header font-bold underline">Thiha Naing</span> @ 2024</h1>
        </div>
    )
}

export default Footer