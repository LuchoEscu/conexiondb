var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

 pool.query('select * from empleados where edad = 26').then( (res) => {
   console.log(res);
 });

// var obj = {
//   nombre:   'Luciano',
//   apellido: 'Escudero',
//   trabajo:  'Desarrollador',
//   edad:     24, 
//   salario:  900000,
//   email:     'lescudero@runaid.com.ar'
// }

//  pool.query('insert into empleados set ?', [obj]).then( (res) => {
//    console.log(res);
//  });

//MODIFICO A EL NUEVO QUE CREE, ES ID 24

// var id = 24;

// var obj = {
//   email:     'pruebaCambio@prueba.com.ar',
//   trabajo:  'Desarrollador de software'
// };

//  pool.query('update empleados set ? where id_emp=?', [obj, id]).then( (res) => {
//    console.log(res);
//  });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
