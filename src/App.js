
import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import dayjs from "dayjs";
import ChartLoader from './ChartLoader';
import CandleStickService from './service/CandleStickService';

const SOCKET_URL = 'http://localhost:8090/stock-chart-ws';

const App = () => {
  const [volume, setVolume] = useState(null);
  const [date, setDate] = useState();
  const [open, setOpen] = useState();
  const [close, setClose] = useState();
  const [high, setHigh] = useState();
  const [low, setLow] = useState()
  const [price, setPrice] = useState();

  const [data, setData] = useState(["0:0",0,0,0,0]);



  let onConnected = () => {
    console.log("Connected!!")
  }
            

  let onMessageReceived = (msg) => {
    const transactionTime = new Date(msg.date.year, msg.date.monthValue-1, msg.date.dayOfMonth, msg.date.hour, msg.date.minute);
    setDate(dayjs(transactionTime).format("HH:mm")); //.format("YYYY/MM/DD HH:mm:ss A"));
  
    setPrice(msg.close);
    setOpen(msg.open);
    setClose(msg.close);
    setHigh(msg.high);
    setLow(msg.low);
    setVolume(msg.volume);
    
    setData(Array.of(date, low, open, close, high));
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/stock-chart']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(JSON.parse(msg))}
        debug={false}
      />
      <div>Fiyat : {price}</div>
      <div>İşlem Hacmi : {volume}</div>
      <div>Tarih: {date}</div>
      
      <ChartLoader data={data} time={data.at(0)}></ChartLoader>
     
    </div>
  );

}

export default App;