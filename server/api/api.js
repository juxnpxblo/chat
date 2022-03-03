const API_ENTRY_POINT = require('./API_ENTRY_POINT');
const axios = require('axios');

const api = axios.create({
  baseURL: API_ENTRY_POINT,
});

module.exports = api;
