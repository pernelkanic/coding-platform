
var cors = require('cors');
var dotenv = require('dotenv');
var helmet = require('helmet');
var mongoose = require('mongoose');
var morgan = require('morgan');
var problemroutes = require('./Routes/ProblemRoutes');
var bodyParser = require('body-parser');
var express = require('express');
const { Webhook } = require('svix');
var submitroutes = require('./Routes/submitroutes')
const { Users } = require('./Models/User');
dotenv.config();
const app = express();
app.use(cors());


app.use(morgan("common"));



app.disable('etag');

app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})


app.use('/api/problems' ,problemroutes);
app.use('/api/Submit' ,submitroutes);
app.post( '/api/webhook',
bodyParser.raw({type: 'application/json'}),
    async function (req, res) {
      try {
        
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;
     
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
        
        
        const { id, ...attributes } = evt.data;
        
        // Handle the webhooks
        const eventType = evt.type;
        if (eventType === 'user.created') {
          

    const firstName = attributes.first_name;
    const lastName = attributes.last_name;

    const user = new Users({
      clerkUserId: id,
      firstName: firstName,
      lastName: lastName,
    });

    await user.save();
    console.log('User saved to database');
           
          }
        res.status(200).json({
          success: true,
          message: 'Webhook received',
        });
      } catch (err) {
        console.log(err);
        res.status(400).json(
          {
          success: false,
          message: err.message,
        });
      }
    }
  );

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port ' , process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})