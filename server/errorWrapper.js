const express = require('express');
const app = express();

const wrapper = fn => (req, res, next)=>{
    Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = wrapper;