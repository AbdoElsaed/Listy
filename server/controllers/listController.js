const { List } = require('../db/models/list');
const { User } = require('../db/models/user');

exports.create = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    const listData = {
        maker: user,
        ...req.body
    }
    try{
        const newList = new List(listData);
        const list = await newList.save();
        if(list){
            return res.status(201).json(list)
        }
    } catch(err){
        console.log(err)
    }
}

exports.getAllLists = async (req, res) => {

    try {

        const lists = await List.find({ maker: req.params.id });
        if(lists){
            res.status(200).json(lists);
        }

    } catch(err){
        console.log(err)
    }


}

exports.getPublicLists = async (req, res) => {

    try {

        const lists = await List.find({}).populate('items');
        if(lists){
            res.status(200).json(lists);
        }

    } catch(err){
        console.log(err)
    }


}