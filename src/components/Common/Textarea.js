import classNames from "classnames"

const Textarea = ({ className = '', placeholder = '' }) => {
    return (
        <textarea className={ classNames("text-[20px] md:text-[25px] bg-white w-full drop-shadow-2xl h-[140px]", className) } rows={2} placeholder={placeholder} />
    )
}

export default Textarea