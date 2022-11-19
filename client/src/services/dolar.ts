import axios from 'axios';


const api = axios.create({
  baseURL: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;