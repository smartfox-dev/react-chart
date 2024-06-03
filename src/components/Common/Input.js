import classNames from "classnames"

const Input = ({ className = '', placeholder = '', label = null, value = '', setValue = null }) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div>
            {label && <span className="text-black text-[20px] px-1">{label}</span>}
            <input className={classNames("text-[20px] text-black md:text-[25px] bg-white w-full drop-shadow-xl h-[70px] rounded-lg border-2 border-gray-110", className)}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default Input