const express = require('express')
const Orders = require('../Schema/Orders')
const dotenv = require('dotenv')
const adminmessage = require('../Schema/adminmessage')
const User = require('../Schema/User')
const usermessage = require('../Schema/usermessage')

dotenv.config()


const router = express.Router()

//finding specific user's order by one id from admin

router.get('/orders/_id/:id', async (req,res) => {
    const orderId = await Orders.findOne({_id:req.params.id})
    if(orderId){
      res.send(orderId)
    }else{
      res.status(404).send({message:"User's order not found"})
    }
  })

   //finding specific user id contactmessage
router.get('/addcontactmsg/_id/:id', async (req,res)=> {
    const contactId = await adminmessage.findOne({_id:req.params.id})
    if(contactId){
     res.send(contactId)
    }else{
      res.status(404).send({message:'Orders not found'})
    }
  })
  
    //orders delete from admindashboard
router.delete('/orders/:id', async (req,res)=> {
    try{
      const deleteId = await Orders.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteId)
    }catch(err){
      res.status(500).send(err)
    }
  })

   //get all user

router.get('/users', async (req,res) => {
    const users = await User.find();
  
    res.json({
      users:users
    })
  
  })
  
  //get user orders

router.get('/orders', async (req,res) => {
    const orders = await Orders.find()
  
    res.json({
      orders:orders
    })
  })

//send update update to user
router.post('/adminmessage', async (req,res)=> {
    const adminmsg = await adminmessage.create(req.body)
    
    res.status(201).json({
      success:true,
      adminmsg
    })
    })
    
    //user's orders msg in admin 
router.get('/adminmessage', async (req,res)=> {
    const adminmsg = await adminmessage.find()
    res.json({
      adminmsg:adminmsg
    })
  })
  
  //unwanted message delete
router.delete('/adminmessage/:id', async (req,res)=> {
    try{
      const deleteadminmsgId = await adminmessage.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteadminmsgId)
    }catch (err){
      res.status(500).send(err)
    }
  })
  

module.exports = router