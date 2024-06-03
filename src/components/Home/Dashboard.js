import React, { useEffect, useRef } from "react";
import Chart from "./Chart"
import Settings from "./Settings"
import { useSelector } from "react-redux";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom/dist";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreatePDF from "../PDF/CreatePDF";

const Dashboard = () => {
    const selectedTab = useSelector((state) => state.setting.selectedTab);
    const { downloadLabel } = useSelector((state) => state.setting.langInfo);
    const { defects, output, percentage } = useSelector((state) => state.setting.dumyInfo);
    const chartRef = useRef(null);
    const navigate = useNavigate();

    const downloadPDF = async () => {
        const capturedImage = await chartRef.current?.captureChartAsImage();
        const params = { output, defects, percentage, capturedImage };
        const query = new URLSearchParams(params).toString();
        navigate(`/pdf?${query}`);
    };
    
    return (
        <div className="text-white w-full">
            <div className="w-full max-w-[1440px] m-auto">
                {selectedTab === 'TAB_CHART' &&
                    <div className="flex justify-end py-6 px-[100px]">
                        <Button text={downloadLabel} onClick={downloadPDF} />
                    </div>
                }
                <div className="p-10 justify-center w-full">
                    {selectedTab === 'TAB_CHART' && <Chart ref={chartRef}/>}
                    {selectedTab === 'TAB_SETTINGS' && <Settings />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;