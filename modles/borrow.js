// models/borrow.js
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
   
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    memberId: { type: String, required: true }, // Membership ID of the borrower
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' }, // Borrow status
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
