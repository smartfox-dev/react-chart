
import React, { useEffect } from "react"
import Topbar from "../Layout/Topbar"
import Footer from "../Layout/Footer"
import BottomOption from "./BottomOption"
import Dashboard from "./Dashboard"
import { getSetting } from "../../store/slice/settingSlice"
import { useDispatch } from "react-redux"

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getSetting());
    }, []);

    return (
        <>
            <Topbar />
            <Dashboard />
            <BottomOption />
            <Footer />
        </>
    )
}

export default Home