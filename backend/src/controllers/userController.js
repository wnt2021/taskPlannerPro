import User from "../models/user.js";
import Admin from "../models/admin.js";
import Task from "../models/task.js";
import Event from "../models/event.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dbconfig.js';

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const account = user;

        const isMatch = await bcrypt.compare(password, account.password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            {name: account.name, email: account.email, role: account.role},
            JWT_SECRET,
            {expiresIn: '1h'}
        );
    
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });

        res.status(200).json({success: "User logged succesfully", token: token, user: account});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error', details: error});
    }
}

const registerUser = async (req, res) => {
    const {name, email, password, role} = req.body;
    const strength = 10;
    const intelligence = 10;
    const relationship = 10;
    const productivity = 10;
    const coins = 100;

    try {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userExists = await User.findOne({email});

    if(userExists) {
       return res.status(400).json({message: "User already exists"});
    }

    const newUser = new User({name, email, password: hashedPassword, role, 
    strength, intelligence, relationship, productivity, coins});
    await newUser.save();

    const token = jwt.sign(
        {name: name, email: email, role: role},
        JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.cookie('token', token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
        path: '/'
    });

    res.status(201).json({success: "User created succesfully", token: token, user: newUser});
    } catch (error) {
        res.status(500).json({error: "Server Error", details: error});
    }
}

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const {id} = req.params;
    const role = 'adventurer';
    const strength = 10;
    const intelligence = 10;
    const social = 10;
    const creativity = 10;
    const coins = 100;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = new User({name, email, password: hashedPassword, role, admin: id, 
        strength, intelligence, social, creativity, coins});
        await newUser.save();

        res.status(201).json({success: "User created succesfully", user: newUser});
    } catch (error) {
        res.status(500).json({error: "Server Error", details: error});
    }
}

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    });

    res.status(200).json({ success: "Logged out successfully" });
}

const savePoints = async (req, res) => {
    const {taskId, strength, intelligence, relationship, productivity} = req.body;
    const {id} = req.params;
 
    try {
        const user = await User.findById(id);
        let coins = user.coins + 20;
        const points = await User.findByIdAndUpdate(id, {strength, intelligence, relationship, 
        productivity, coins}, {new: true});

        const updatedTask = await Task.findOneAndUpdate(
            {_id: taskId},
            { state: "done" },
            { new: true }
        );

        console.log(updatedTask);

        res.status(200).json({succes: true, points: points, task: updatedTask});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const saveEventPoints = async (req, res) => {
    const {eventId, strength, intelligence, social, creativity} = req.body;
    const {id} = req.params;
 
    try {
        const user = await User.findById(id);
        let coins = user.coins + 50;
        const points = await User.findByIdAndUpdate(id, {strength, intelligence, social, creativity, coins}, {new: true});

        const updatedEvent = await Event.findOneAndUpdate(
            {_id: eventId},
            { state: "done" },
            { new: true }
        );

        res.status(200).json({succes: true, points: points, event: updatedEvent});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const listPoint = async(req, res) => {
    const {id} = req.params;

    try {
        const points = await User.find({_id: id});

        res.status(200).json(points);
    } catch (error) {
        res.status(404).json({error: "Points Error", details: error});
    }
}

const getUsers = async(req, res) => {
    const {adminId} = req.params;

    try {
        const users = await User.find({admin: adminId});

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({error: "Users Error", details: error});
    }
}

export {createUser, loginUser, logout, savePoints, registerUser, listPoint, getUsers, saveEventPoints};