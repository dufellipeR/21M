import { AreaChartOutlined, BookOutlined, CalculatorOutlined, HomeOutlined } from "@ant-design/icons";
import { Home } from "./home";
import { Transaction } from "./transaction";

export const items = [
  {
    label: (
      <span>
        <HomeOutlined />
        Home
      </span>
    ),
    key: 'home',
    children: (
      <Home />
    )
  },
  { 
    label:  (
      <span>
        <AreaChartOutlined />
        Performance
      </span>
    ), 
    key: 'performance', 
    children: 'Content 2' 
  },
  { 
    label:  (
      <span>
        <BookOutlined />
        Transactions
      </span>
    ), 
    key: 'transactions', 
    children: ( 
      <Transaction/>
    )
  },
  { 
    label:  (
      <span>
        <CalculatorOutlined />
        Calculator
      </span>
    ), 
    key: 'calculator', 
    children: 'Content 2' 
  },
];