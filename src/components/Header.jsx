import { Context } from "../Context"
import { useContext } from "react"
import Toggle from "./Toggle"

const Header = () => {
    const { bgColor } = useContext(Context)
    return (
        <div className={`${bgColor ? "bg-gradient-to-r from-gray-600 to-gray-900" : "bg-slate-400"}  opacity-90  min-w-full text-center sticky top-0 z-50`}>
            <div className="flex items-center lg:px-9 px-4">
                <h1 className={`${bgColor ? 'text-white':''} md:text-3xl flex-auto text-lg font-bold font-header text-center lg:my-6 my-2  uppercase`}>Weather Forecast</h1>
                <Toggle />
            </div>
            <div className={`w-[95%] h-[.5px] ${bgColor ? "bg-slate-100 " : "bg-black"} mt-2 mx-auto`}></div>
        </div>
    )
}

export default Header