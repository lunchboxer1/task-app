//CRUD create read update delete

//THis is the same as commented out above
const {MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL ,{useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to database.');
  }

  console.log('Connected correctly.');

  const db = client.db(databaseName);

  const updatePromise = db.collection('users').deleteMany(
    {
      age: 32,
      name: "Mike",
    }, 
    ).then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });


});