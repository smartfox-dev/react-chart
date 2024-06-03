import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const isEmpty = (value) => {
    if (value === undefined || value === null) return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "string") return value.trim().length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
};

export const isNumber = (letter) => {
    return !isNaN(parseInt(letter));
};