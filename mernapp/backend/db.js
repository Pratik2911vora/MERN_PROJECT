const mongoose = require('mongoose');
const mongoURI = "mongodb://GoLife:mern@ac-aieyrcg-shard-00-00.gn4twf0.mongodb.net:27017,ac-aieyrcg-shard-00-01.gn4twf0.mongodb.net:27017,ac-aieyrcg-shard-00-02.gn4twf0.mongodb.net:27017/GoLife?ssl=true&replicaSet=atlas-dmhdc0-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURI,{useNewUrlParser : true},async(err,result)=>{
    if(err) console.log("--------------",err)
    else{
        console.log("connected")
        const fetched_data = await mongoose.connection.db.collection("food_item");
        fetched_data.find({}).toArray(async function(err,data){
          const foodCategory = await mongoose.connection.db.collection("foodCategory");
          foodCategory.find({}).toArray(function (err, catData){
            if(err) console.log(err);
            else{
              global.food_item = data;
              global.foodCategory = catData;
              
              
            }
          })
            // if(err) console.log(err);
            // else {
            //   global.food_item =data;
              
            // }
        })
    }
  });
}
module.exports = mongoDB;
mongoose.set('strictQuery', true);



  

