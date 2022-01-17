require('../src/db/mongoose');
const User = require('../src/models/user');

// 61e5bf9366c07bd5b4c3d2d4

// User.findByIdAndUpdate('61e5beefa888ab0c09b6c53f', {age: 1 }).then((user) => {
//   console.log(user);
//   return User.countDocuments({age: 1})

// }).then((result) => {
//   console.log(result);

// }).catch((e) => {
//   console.log(e);
  
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;

}

updateAgeAndCount('61e5beefa888ab0c09b6c53f', 3).then((count) => {
  console.log(count);

}).catch((e) => {
  console.log(e);

})