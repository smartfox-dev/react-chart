import classNames from "classnames"

const Button = ({ className = '', text = '', onClick = null }) => {
    
    return (
        <button className={classNames("flex justify-center items-center text-[30px] px-6 text-white bg-[#04AA6D] hover:bg-[#059862] rounded-lg drop-shadow-2xl h-[60px]", className)}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button