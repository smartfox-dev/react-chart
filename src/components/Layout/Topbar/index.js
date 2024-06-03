import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../../store/slice/settingSlice';

export const Topbar = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.setting.selectedTab);
  const { topMenu1, topMenu2 } = useSelector((state) => state.setting.langInfo);
  const handleClick = (value) => {
    dispatch(setTab(value));
  };

  const getTabClass = (tab) => {
    return selectedTab === tab ? 'bg-slate-300 text-black' : 'text-white'
  }

  return (
    <div className="bg-[#04AA6D] text-white w-full">
      <div className="w-full max-w-[1440px] px-4 lg:flex lg:items-center lg:px-24 mx-auto">
        <div className="flex items-center justify-start w-full">
          <div className={`text-[30px] cursor-pointer py-4 px-10 ${getTabClass('TAB_CHART')}`} onClick={() => { handleClick('TAB_CHART') }}>{topMenu1}</div>
          <div className={`text-[30px] cursor-pointer py-4 px-10 ${getTabClass('TAB_SETTINGS')}`} onClick={() => { handleClick('TAB_SETTINGS') }}>{topMenu2}</div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;