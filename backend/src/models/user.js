import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    password: { type: String, required: true },
    role: {type: String, required: true},
    strength: {type: Number, required: false},
    intelligence: {type: Number, required: false},
    relationship: {type: Number, required: false},
    productivity: {type: Number, required: false},
    coins: {type: Number, required: false},
    level: {type: Number}
});

const User = mongoose.model('User', userSchema);

export default User;