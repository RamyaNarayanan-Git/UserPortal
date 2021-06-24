import express from 'express'
import Users from '../modal/user.js'
import mongoose from 'mongoose'

let userRouter = express.Router();
/*  userRouter.get('/', function(req,res){
    res.json({
        status: 'Working',
        message: 'Welcome !!'
    });
});  */

userRouter.route('/:userId?')
     .get((req,res,next) => {
        //Get User by Id (if id is provided)
        if(req.params.userId){
            Users.findById(req.params.userId)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {  
            //Get all users
            Users.find({})
                .then((users) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    }) 
    .post((req,res,next) => {
        if(req.params.userId){
            //Post operation is not supported on a specific Id!
            res.statusCode = 403;
            res.setHeader('Post operaton not supported on /userId/' +req.params.userId);
        }
        else{
            Users.create(req.body)
            .then((user) => {
                console.log('User Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })
    .put((req,res,next) => {
        //Update User by Id (if id is provided)
        if(req.params.userId){
            Users.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.userId),{
                $set: req.body
            },{ new:true })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
        } 
        else {
            // Put/Update operation is not supported!
            res.statusCode = 403;
            res.setHeader('Put operaton not supported on /userId/' +req.params.userId);
        }
    })
    .delete((req,res,next) => {
        //Delete by user id
        if(req.params.userId){
            Users.findByIdAndRemove(mongoose.Types.ObjectId(req.params.userId))
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            //Delete all
            Users.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })

export default userRouter;