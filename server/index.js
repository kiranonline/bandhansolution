//module imports
require("dotenv").config();
const express =  require("express");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const logger = require("morgan");
var favicon = require('serve-favicon')
require("./services/connection");


const AuthApis = require("./routes/authApis");

//port 
const PORT = process.env.PORT || 4500;

//app declaration
const app = express();
app.set("port",PORT);
app.set("env",process.env.MODE);

//header and basic protections
app.use(helmet());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, key, Content-Type, Accept, access-control-allow-origin, Authorization, userid");
    next();
});

//static files
app.use(express.static(path.join(__dirname, 'public'),{
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now().toString())
    }
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"views"));

//apis
app.use(`/apis/v1`,AuthApis)






//404 route
app.use(function(req,res,next) {
    res.status(404).json({
        status : false,
        message : "Invalid Api."
    })
});

app.listen(app.get("port"),()=>{
    console.log(`App started at port ${app.get("port")} in ${app.get("env")} mode.`)
})