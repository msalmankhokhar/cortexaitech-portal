import mongoose from 'mongoose';

type isConnected = null | number;
interface connectionType {
    isConnected: isConnected;
}

const connection : connectionType = {
    isConnected: null,
};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Already Connected to database')
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_DB_URI!);
  connection.isConnected = db.connections[0].readyState;
  console.log("Connected to database");
}

export default connectDb;