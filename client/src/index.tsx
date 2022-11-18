import ReactDOM from "react-dom";
import { App } from "./App";
import { ConfigProvider } from "antd";
import ptBr from 'antd/locale/pt_BR'

ReactDOM.render(
    <ConfigProvider locale={ptBr} theme={{ 
        token: { 
            colorPrimary: '#f2a900',
        },
    }}
    >
        <App />
    </ConfigProvider>,
    document.getElementById("root"));