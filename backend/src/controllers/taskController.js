import Task from "../models/task.js";

const createTask = async(req, res) => {
    const {title, description, deadline, trait, points} = req.body;

    const state = "pending";

    try {
        const newTask = new Task({title, description, deadline, trait, points, state});
        await newTask.save();

        res.status(201).json({success: "Task created succesfully", task: newTask});
    } catch (error) {
        res.status(404).json({error: "Task Error", details: error});
    }
}

const listTask = async(req, res) => {    
    try {
        const tasks = await Task.find();
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({error: "Task Error", details: error});
    }
}

const deleteTask = async(req, res) => {
    const id = req.params.id;

    try {
        const tasks = await Task.findByIdAndDelete(id);        

        res.status(201).json(tasks);
    } catch (error) {
        res.status(404).json({error: "Task Error", details: error});
    }
}

const updateTask = async(req, res) => {
    const {id} = req.params;
    const {title, description, deadline, trait, points} = req.body;

    try {
        const updateTask = await Task.findByIdAndUpdate(id, {title,description,deadline,trait,points}, {new: true});
        res.status(200).json({succes: true, task: updateTask});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export {createTask, listTask, deleteTask, updateTask};