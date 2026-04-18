import mongoose from 'mongoose';
const uri = "mongodb+srv://readingengineer:reading123@cluster0.aph22.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => { console.log('Connected root!'); process.exit(0); })
  .catch(err => { console.error('Failed', err.message); process.exit(1); });
