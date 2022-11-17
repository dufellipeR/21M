import ReactDOM from "react-dom";
import { App } from "./App";
import 'antd/dist/antd.css';
import { ConfigProvider } from "antd";
import ptBr from 'antd/lib/locale/pt_BR'

ReactDOM.render(
    <ConfigProvider locale={ptBr}>
        <App />
    </ConfigProvider>,
    document.getElementById("root"));