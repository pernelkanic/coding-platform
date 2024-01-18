
var cors = require('cors');
var dotenv = require('dotenv');
var helmet = require('helmet');
var mongoose = require('mongoose');
var morgan = require('morgan');
var problemroutes = require('./Routes/ProblemRoutes');

var express = require('express');
dotenv.config();
const app = express();
app.use(cors());


app.use(morgan("common"));



app.disable('etag');

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})


app.use('/api/problems' ,problemroutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port ' , process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})