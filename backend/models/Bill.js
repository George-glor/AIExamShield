const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  amountDue: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Bill', BillSchema);