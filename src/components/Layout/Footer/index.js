import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { footerLabel } = useSelector((state) => state.setting.langInfo);
    return (
        <div className="bg-[#3C2D4D] w-full h-[130px] flex">
            <span className="text-white px-4 text-[12px] text-center md:text-[30px] mx-auto my-auto">
                &copy; 2024 {footerLabel}
            </span>
        </div>
    );
}

export default Footer;