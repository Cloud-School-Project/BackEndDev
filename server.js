const express = require('express');
const studentRouter = require('./routers/student-router');
const volunteerRouter = require('./routers/volunteer-router');
const classRouter = require('./routers/class-router');
const adminRouter = require('./admin/admin-router');
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use('/student', studentRouter);
server.use('/volunteer', volunteerRouter);
server.use('/classes', classRouter);
server.use('/admin', adminRouter);






module.exports = server;