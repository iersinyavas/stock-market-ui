import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import dayjs from "dayjs";
import CandleStickService from './service/CandleStickService';
//      s   o   c   b
const initialData = [
    ["Time", "", "", "", ""],
  ];

const ChartLoader = (props) => {
    
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
  

      const options = {
        legend: "none",
        bar: { groupWidth: "95%" }, // Remove space between bars.
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
          risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
        },
      };

      const setValue = (initialData, propsData) => {
        const obje = initialData.pop();
        initialData.push(propsData);
      }

    //  const interval = setInterval(() => {
    //    if(count > 59){
    //      console.log('Interval triggered');
    //      let stick = initialData.at(-1);
    //      let time = dayjs(new Date()).format("HH:mm")
    //    
    //      stick = Array.of(time, stick.at(3), stick.at(3), stick.at(3), stick.at(3))
    //      initialData.push(stick);
    //      setData(initialData);
    //      setCount(0);
    //    }

    //    setCount(count + 1);
    //  }, 1000);

      useEffect(() => {
        const stick = initialData.at(-1);
        const flag = props.time == stick.at(0);
        if(flag){
          setValue(initialData, props.data);
        }else{
          initialData.push(props.data);
        }
  
        setData(initialData);
        
        console.log('Chart Loader')
        //return () => clearInterval(interval);
      }/*, [count]*/);

    return (
        <div>
            <div>Chart Loader</div>
            <Chart
                chartType="CandlestickChart"
                width="100%"
                height="700px"
                data={data}
                options={options}
            />
        </div>
    );
}

export default ChartLoader;