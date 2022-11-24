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
            .then((data) => { res.status(201).json({data,message:'user save'})})
            .catch(error => { res.status(400).json( { error })})
        }else{
            res.status(200).json({user})
        }
    })
    .catch(error => { res.status(404).json({ error}) })
}

exports.signin = (req,res,next) => {
    const user = new User({
        email : req.body.email,
        name : req.body.name
    })
    user.save()
    .then((data) => { res.status(201).json({data})})
    .catch(error => { res.status(400).json( { error })})
}