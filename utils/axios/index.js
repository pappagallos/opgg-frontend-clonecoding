import axios from 'axios';

const baseURL = 'https://codingtest.op.gg/api/';
const instance = axios.create(baseURL);

export default instance;