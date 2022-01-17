require('../src/db/mongoose')
const Task = require('../src/models/task');

// Task.findByIdAndDelete('61e5cd3ba415ef46a81dd060').then((task) => {
//   console.log(task);
//   return Task.countDocuments({completed: false});

// }).then((results) => {
//   console.log(results);

// }).catch((e) => {
//   console.log(e);

// })
//'61e0cd560ecf5f4dd767456e'
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id); 
  const count = await Task.countDocuments({ completed:false });
  return count;

}

deleteTaskAndCount('61e5ce005838939d36b88802').then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e);
})

