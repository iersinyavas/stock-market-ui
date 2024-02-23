import axios from "axios";

export default class CandleStickService{
    getCandleStickList(){
        return axios.get("http://localhost:8090/stock-chart/stock-chart-info");
    }
}