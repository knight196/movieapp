const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
const path = require('path')
const authRoutes = require("./routes/routesauth")
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders');

dotenv.config();


const stripe = require('stripe')('sk_test_51KvRtLCBeZgGbHL58Usym7RH0ZpLgI51HUJwT3VQRVje2Lctsg5zi36tuf4Z4XfJSPdtkq3evU5SJsDlGGwBoxBS00TZQtDJxa')


const app = express();
const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use(cors())

app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)

// connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)

  app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// API for PAYMENT


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
            unit_amount:price * 100 / 100,
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

// app.get('/v1/charges', async (req,res) => {
//   const payment = await stripe.charges.list({
//     apiKey:'sk_test_51KvRtLCBeZgGbHL58Usym7RH0ZpLgI51HUJwT3VQRVje2Lctsg5zi36tuf4Z4XfJSPdtkq3evU5SJsDlGGwBoxBS00TZQtDJxa'
//   })
//   return res.json(payment)
// })

// app.use('/', (req,res) => res.send('homepage'))

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})