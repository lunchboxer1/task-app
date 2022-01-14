const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
{
  useNewUrlParser: true,
  // useCreateIndex: true, 
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim:true,
    lowercase:true,
    trim: true,
  },
  email: {
    type: String,
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
});

// const me = new User({
//   name: 'Eevee',
//   email: 'eevee@gmail.com',
//   password: 'puppy123',
// });

// me.save().then(() => {
//   console.log(me);
// }).catch((error) => {
//   console.log(error);
// })




const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: "Take out trash.",
  completed: false,
});

task.save().then(() => {
  console.log(task);
}).catch((error) => {
  console.log(error);
});