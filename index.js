
const mongoose = require('mongoose');
const Pizza = require('./pizza')


const connect = async () => {
    

  //if (this.connection) return this.connection;
  return mongoose.connect('mongodb+srv://sebastianramirezpain:peperoni1234@cluster0.x6tvpmi.mongodb.net/avanzado2', { useUnifiedTopology: true, useNewUrlParser: true }).then(async (connection) => {
    this.connection = connection;
    console.log('Conexion a DB exitosa');
    
    Pizza.insertMany([
        { name:"Mexicana",size:"small",price:19,
          quantity:10,date:"2021-03-13T08:14:30Z"},
        { name:"Mexicana",size:"large",price:20,
        quantity:10,date:"2021-03-13T08:14:30Z"},
        { name:"Criolla",size:"small",price:21,
        quantity:10,date:"2021-03-13T08:14:30Z"},
        { name:"Criolla",size:"small",price:12,
        quantity:10,date:"2021-03-13T08:14:30Z"},
    
    ])

     let order = await Pizza.aggregate([
      {
         $match:{size:'medium'}
       },
       {
         $group:{_id:'$name', totalQly:{$sum:'$quantity'} }
       },
       {
         $sort:{totalQly:-1 }
       },
       {
         $group:{_id:1, orders:{$push:'$$ROOT'} }
       },
       {
         $project:{'_id':0, orders:'$orders'} 
       },
       {
         $merge:{'into':'reports'} 
       }
      
     ])
     console.log(order)

    let res= await Pizza.paginate({}, {limit:4})
    console.log(res)
  }).catch(err => console.log(err))
}

connect()