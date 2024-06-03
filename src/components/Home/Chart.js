import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';
import html2canvas from 'html2canvas';

const initData = [
  { value: 25, label: 'Defects' },
  { value: 80, label: 'Output' },
];

const Chart = React.forwardRef((props, ref) => {
  const [size, setSize] = React.useState(getResponsiveSize);
  const { defects, output, percentage } = useSelector((state) => state.setting.dumyInfo);
  const { nameLabel, headerLabel, outputLabel, defectsLabel, wastageLabel, exceedLabel } = useSelector((state) => state.setting.langInfo);
  const limitValue = useSelector((state) => state.setting.limit);
  const [data, setChartData] = React.useState(initData);
  const [exceedFlag, setExceedFlag] = React.useState(false);

  React.useEffect(() => {
    const tempDefects = Math.round((defects / (defects + output)) * 100 * 10) / 10;
    const tempOutput = Math.round((output / (defects + output)) * 100 * 10) / 10;

    const tempData = [
      { value: tempDefects, label: defectsLabel },
      { value: tempOutput, label: outputLabel }
    ]
    setChartData(tempData);
  }, [defects, output, percentage])

  React.useEffect(() => {
  

    //Real-time dumy data
    const fetchData = async () => {
      socket.emit('dumy_data');
      if (percentage > limitValue) {
        setExceedFlag(true);
      } else {
        setExceedFlag(false);
      }
    }
    const intervalId = setInterval(fetchData, 1000);

    //Mobile Responsive
    const handleResize = () => {
      setSize(getResponsiveSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const captureChartAsImage = async () => {
    const chartElement = document.getElementById('chart');
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const dataUrl = canvas.toDataURL('image/png');
      return dataUrl;
    }
  }

  React.useImperativeHandle(ref, () => ({
    captureChartAsImage,
  }));

  return (
    <div className="flex justify-center h-[800px]">
      <div className='d-flex justify-center'>
        <div className='d-flex text-[30px] text-center text-black'>{nameLabel}: {headerLabel}</div>
        <div className='flex items-center mt-[60px]' id='chart'>
          <PieChart
            colors={['red', 'green']}
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 45,
                data,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            {...size}
          />
        </div>
        {
          exceedFlag &&
          <div className='flex w-full justify-center text-[30px] text-red-700 mt-5'>{exceedLabel}</div>
        }
        <div className='flex flex-col w-full'>
          <div className='flex text-[20px] text-black justify-end'>{outputLabel}: {output}</div>
          <div className='flex text-[20px] text-black justify-end'>{defectsLabel}: {defects}</div>
          <div className='flex text-[20px] text-black justify-end'>{wastageLabel}: {percentage}%</div>
        </div>
      </div>
    </div>
  )
});

export default Chart;

const defaultSize = {
  width: 800,
  height: 500,
};

const getResponsiveSize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) {
    return { width: 400, height: 300 };
  } else if (screenWidth < 900) {
    return { width: 500, height: 400 };
  } else {
    return defaultSize;
  }
};