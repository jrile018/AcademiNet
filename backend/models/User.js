// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // for generating tokens

// Helper: generate a random 10-digit numeric code
function generateAccountId() {
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

const nameValidator = {
  validator: function(v) {
    // Must start with uppercase, contain only letters and dashes, and no spaces
    return /^[A-Z][A-Za-z-]*$/.test(v);
  },
  message: props => `${props.value} is not valid. It must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.`
};

const UserSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true,
    validate: nameValidator
  },
  lastName: { 
    type: String, 
    required: true,
    validate: nameValidator
  },
  email: { type: String, required: true, unique: true },
  accountId: { type: String, required: true, default: generateAccountId },
  password: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false },
  confirmationToken: { type: String }
});

// Compound index: for a given firstName and lastName, the accountId must be unique.
UserSchema.index({ firstName: 1, lastName: 1, accountId: 1 }, { unique: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
