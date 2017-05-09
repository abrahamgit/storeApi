let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Item schema definition
let ItemSchema = new Schema(
  {
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    releaseDate: { type: String, required: true, min: 1 },
    description: { type: String, default: Date.now },
    price: { type: Number, required: true },
    starRating: { type: Number, required: true },
    imageUrl: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ItemSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ItemSchema for use elsewhere.
module.exports = mongoose.model('item', ItemSchema);
