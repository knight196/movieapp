const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
  price: Number,
  paymentId: Array,
  email: String,
  Cancel:{type:Boolean,default:false},
},
{
  timestamps:true
}
);

module.exports = mongoose.model("orders", OrderSchema);