require('dotenv').config();

let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const Cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

express.urlencoded({ extended: false });
express.json({ extended: false });
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(process.env.PORT || 8080);
