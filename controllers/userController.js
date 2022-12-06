const User = require('../model/userModel')

exports.signup = (req,res,next) => {
    User.findOne({email : req.body.email})
    .then((user) => {
        if(user === null){
            const user = new User({
                email : req.body.email,
                name : req.body.name
            })
            user.save()
            .then((user) => { res.status(201).json({user,message:'user save'})})
            .catch(error => { res.status(400).json( { error })})
        }else{
            res.status(200).json({user})
        }
    })
    .catch(error => { res.status(404).json({ error}) })
}

exports.getOneUser = (req,res,next) =>{
    User.findOne({email : req.body.email})
    .then((user)=>{
        if(user === null){
            res.status(401).json({ message:"bad user"})
        }else{
            res.status(200).json({user})
        }
        })
    .catch((error) => { res.status(404).json({ error})})
}

exports.updateUser = (req,res,next) => {
    const user = {
        _id : req. body._id,
        name : req.body.name,
        facebook : req.body.facebook,
        twitter : req.body.twitter,
        instagram : req.body.instagram
    }
    User.findOneAndUpdate({_id : req.body._id},{...user})
    .then((user)=> {
        if(user){
            res.status(200).json({message: 'user updated'})
        }else{
            res.status(200).json({message: 'no user matched'})
        }
    })
    .catch(error => { res.status(400).json( { error })
console.log(error);})
}