import React, { useEffect, useState } from 'react';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Button from '../Common/Button';
import LanguageSelect from '../Common/LanguageSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, translateLanguage } from '../../store/slice/settingSlice';
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";

const BottomOption = () => {
  const [language, setLanguage] = useState('en');
  const langInfo = useSelector((state) => state.setting.langInfo);
  const isLoading = useSelector((state) => state.setting.isLoading);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    const wordArray = Object.values(langInfo);
    dispatch(translateLanguage({ array: wordArray, language: language }));
  }
  
  return (
    <div className="bg-slate-200 text-white w-full">
      <div className="w-full max-w-[1440px] px-4 lg:flex lg:items-center lg:px-24 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          <div className={`text-[30px] text-black cursor-pointer py-4 px-10`}>
            <MapsHomeWorkIcon style={{ fontSize: '4rem' }} />
          </div>
          <div className="flex text-[30px] text-black cursor-pointer py-4 px-10">
            <div className="flex flex-col lg:flex-row gap-4">
              <LanguageSelect label={langInfo?.selectLangLabel} language={language} setLanguage={setLanguage} />
              <div className="add-to-cart">
                <LoadingButton
                  loading={isLoading}
                  startIcon={
                    isLoading && <CircularProgress size={20} color="inherit" />
                  }
                  sx={{
                    color: "#fff",
                    bgcolor: "#04AA6D",
                    "&:hover": {
                      bgcolor: "#059862",
                    },
                    textalign: "center",
                    alignself: "center",
                    paddingX: '20px',
                    width: "100%",
                    fontSize: "25px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setIsLoading(true));
                    handleClick();
                  }}
                >
                  <span className="ml-1">{langInfo?.translateLabel}</span>
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomOption;