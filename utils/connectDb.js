import mongoose, { mongo } from 'mongoose';

const connection={};

async function connectDb() {
    if (connection.isconnecte) {
        console.log('using execting connection Db !');
        return ;
    }
    //Use New database Concetion
    const db=await mongoose.connect(process.env.MONGO_SRV,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    console.log('Db  Connnected');
    connection.isconnected=db.connections[0].readyState
}

export default connectDb;