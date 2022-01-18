const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
    lowercase:true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address.');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password can not contain "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.');
      }
    }
    
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
  
  user.tokens = user.tokens.concat({ token });
  await user.save();
  
  return token;

}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');

  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!');

  }

  return user;

}

//Has the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  // console.log('Just before saving');
  // console.log(user);

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);

  }

  next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;