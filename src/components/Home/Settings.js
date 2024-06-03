import React, { useEffect, useState } from "react";
import Chart from "./Chart"
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { saveSetting } from "../../store/slice/settingSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { nameLabel, outputLabel, defectsLabel, headerLabel, inputNameLabel, inputHeaderLabel, inputOutputLabel, inputDefectsLabel,inputLimitLabel, saveLabel } = useSelector((state) => state.setting.langInfo);
  const limitValue = useSelector((state) => state.setting.limit);

  const [name, setName] = useState(nameLabel);
  const [output, setOutput] = useState(outputLabel);
  const [defects, setDefects] = useState(defectsLabel);
  const [header, setHeader] = useState(headerLabel);
  const [limit, setLimit] = useState(limitValue);

  const handleSave = () => {
    const data = {
      name: name,
      output: output,
      defects: defects,
      header: header,
      limit: limit,
    }
    dispatch(saveSetting(data));
  }

  useEffect(() => {

  }, [])

  return (
    <div className="text-white w-full">
      <div className="w-full items-center max-w-[700px] m-auto">
        <div className="flex flex-col justify-center py-6 md:px-[100px] gap-5">
          <Input inputLabel={inputNameLabel} label='Machine Name*' value={name} setValue={setName} />
          <Input inputLabel={inputOutputLabel} label='KPI Output Label*' value={output} setValue={setOutput} />
          <Input inputLabel={inputDefectsLabel} label='KPI Defects Label*' value={defects} setValue={setDefects} />
          <Input inputLabel={inputHeaderLabel} label='Header Label*' value={header} setValue={setHeader} />
          <Input inputLabel={inputLimitLabel} label='Percentage Limit*' value={limit} setValue={setLimit} />
          <Button className='mt-6' text={saveLabel} onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default Settings;