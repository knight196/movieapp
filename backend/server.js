const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
const path = require('path')
const Stripe = require('stripe')
const authRoutes = require("./routes/routesauth")
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders');
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const bodyParser = require('body-parser')


dotenv.config({path:path.resolve(__dirname, './.env')});


const stripe = new Stripe ('sk_test_51KvRtLCBeZgGbHL58Usym7RH0ZpLgI51HUJwT3VQRVje2Lctsg5zi36tuf4Z4XfJSPdtkq3evU5SJsDlGGwBoxBS00TZQtDJxa')


const app = express();
const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())

app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)

// connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)


// API for PAYMENT

app.get("/config", (req, res) => {
  res.send({
    publishableKey: 'pk_test_51KvRtLCBeZgGbHL5oKH0rBAXmqORHdfqdgWuJMqH0HIhQ9sMlrAYHm47FSlLQ65AF40INSKr9GX7Jf4Girib2TTw00fg6sdATf'
  });
});


app.post('/api/subscribe', async (req,res)=> {

  try{
    const {email,paymentMethod,price,plan} = req.body
  
    const customer = await stripe.customers.create({
      email,payment_method:paymentMethod,
      invoice_settings:{default_payment_method:paymentMethod}
    })

    const product = await stripe.products.create({
      name:plan
    })


    const subscription = await stripe.subscriptions.create({
      customer:customer.id,
      items:[
        {
          price_data:{
            currency:'GBP',
            product:product.id,
            unit_amount:price * 100,
            recurring:{
              interval:'month'
            }
          }
        }
      ],
      payment_settings:{
        payment_method_types:['card'],
        save_default_payment_method:'on_subscription'
      },
      expand:['latest_invoice.payment_intent']
    })
  
    res.json({
      message:'subscription successful',
      clientSecret:subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId:subscription.id
    })
    
  }catch(err){
    console.log(err)
    res.status(500).json({message: 'internal server error'})
  }
})


app.post('/api/sendemail', async (req,res) => {

  const {email,paymentId,price,body,date,time} = req.body


  try{

    var transporter = nodemailer.createTransport({
      service:'hotmail',
      auth:{
        user:process.env.user,
        pass:process.env.pass
      }
    })
   



    transporter.use('compile', hbs(handlebarOptions))

    var mailOptions = {
      from:process.env.user,
      to:email,
      subject:'Subscription Confirmation',
      template:'email',
      context:{
      email:email,
      paymentId:paymentId,
      price:price,
      body:body,
      date:date,
      time:time
      }
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({success:true,message:'Email sent'})

  }catch(err){
    res.status(500).json(err.message)
  }

})

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// app.get('/v1/subscriptions', async (req,res) => {
//   const payment = await stripe.subscriptions.list({
//     apiKey:'sk_test_51KvRtLCBeZgGbHL58Usym7RH0ZpLgI51HUJwT3VQRVje2Lctsg5zi36tuf4Z4XfJSPdtkq3evU5SJsDlGGwBoxBS00TZQtDJxa'
//   })
//   return res.json(payment)
// })

// app.use('/', (req,res) => res.send('homepage'))

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})