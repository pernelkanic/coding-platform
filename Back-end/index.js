
var cors = require('cors');
var dotenv = require('dotenv');
var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var morgan = require('morgan');


dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));

app.use(cors);

app.disable('etag');

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})




mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port ' , process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})