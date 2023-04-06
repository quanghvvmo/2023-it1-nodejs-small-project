const httpStatus = require('http-status')
const User = require('../../_database/models/user')

const customer = require('../../_database/models/customer')
const config = require('../../config')
const createToken = require('../auth')

class user{
    login = async (req,res,next) => {
        try{
            const user = await User.findOne({ where: { username: req.body.username } });
            if(!user || !(req.body.password === user.password)){
                return res.status(401).json({ error: 'Wrong username or password' });
            }
            const token = createToken({ id: user.id, username: user.username })
            res.json(token)
        }catch(e){
            console.log(e.message);
            next(e);
        }
    }
     getUserDetail = async (req,res,next) => {
        try{
            const Uid = req.params.id || 0
            const user = await User.findOne({
                include: [customer],
                where: { id: Uid },
                //attributes: { exclude: ["password"] },
                
            });    
            return res.json(user);
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    getAllUsers = async (req,res,next) =>{
        const { page, pageSize } = req.query;
        const limit = pageSize ? parseInt(pageSize) : 2;
        const offset = page ? (parseInt(page) - 1) * limit : 0;
    try{
        const { count , rows  } =  await User.findAndCountAll
        ({
            include: [customer],
            offset,
            limit
          });
          const totalPages = Math.ceil(count / limit);
          res.json({rows,totalPages,currentPage: parseInt(page) || 1});
    }catch(err){
        console.log(err.message);
        next(err);
    }
}
    createUser = async (req,res,next) =>{
        try{
            const result = await User.create(req.body)
            res.status(httpStatus.CREATED);
            res.send(result)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    
    updateUser = async (req,res,next) => {
        try{
            const result = await User.update(req.body,{where:{
                id:req.params.id
            }})
            res.status(httpStatus.OK);
            //res.send(result)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    deleteUser = async (req,res,next) => {
        try{
            await User.destroy({where:{id:req.params.id}})
            res.status(httpStatus.OK);
            res.send("Delete successfully")
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
}
module.exports = new user
