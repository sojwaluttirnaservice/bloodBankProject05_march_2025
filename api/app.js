const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const dotenv = require('dotenv');
const apiRouter = require('./routes/apiRouter');
const { FAILURE, SUCCESS } = require('./utils/responses/successCodes');
const { sendResponse } = require('./utils/responses/ApiResponse');
dotenv.config()

const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())



app.get('/', (req, res) => {
  return sendResponse(res, 200, SUCCESS, "Backend server is running. DON'T WORRY")
})

app.use('/api/v1', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    success: FAILURE,
    message: "Something went wrong",
    error: err
  })
});


module.exports = app;
