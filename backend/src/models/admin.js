import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    password: { type: String, required: true },
    role: {type: String, required: true},
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;