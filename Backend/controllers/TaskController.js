const User = require('../models/usermodel');
// const { v4: uuidv4 } = require('uuid');


module.exports.fetchAll = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

module.exports.fetchOne = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

module.exports.create = async (req, res) => {
    const user = await User.create({
        // id: uuidv4(),
        name: req.body.name,
        desc: req.body.desc
    });
    // res.json(user);
    res.status(201).json(user);
}

module.exports.update = async (req, res) => {
    const user = await User.findByIdAndUpdate({ _id: req.params.id },
        {
            name: req.body.name,
            desc: req.body.desc
            
        },
        { new: true }
    );
    
    res.json(user);
}

module.exports.Delete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
}

module.exports.Marked = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.checked = !user.checked;
    await user.save();
    res.json(user);
}