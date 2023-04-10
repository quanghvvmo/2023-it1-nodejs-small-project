const httpStatus = require('http-status')
const User = require('../../_database/models/user')
const customer = require('../../_database/models/customer')
const config = require('../../config')
const createToken = require('../auth')
const {Loginschema,UserSchema} = require('../../validate/userValidate.js')

class user{
    login = async (req,res,next) => {
        const {err,value} = Loginschema.validate(req.body)
        if(err){
            res.send("okok")
              return res.status(400).json({ message: error.details[0].message });            
        }        
            
                const user = await User.findOne({ where: { username: req.body.username } });
                if(!user || !(req.body.password === user.password)){
                    return res.status(401).json({ error: 'Wrong username or password' });
                }
                const token = createToken({ id: user.id, username: user.username })
                res.json(token)
            
        
    }

     getUserDetail = async (req,res,next) => {
        try{
            const Uid = req.params.id || 0
            const user = await User.findOne({
                include: [customer],
                where: { id: Uid },
                attributes: { exclude: ["password"] },
                
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
            const {err,value} = UserSchema.validate(req.body)
                if(err){
                    return res.status(httpStatus.BAD_REQUEST).json(err.details[0].message);
                }
                    const { username, password, age,email,phone,address,isActive,createdBy,createdAt,updatedBy,updatedAt } = req.body;
                    const [newUser,created] = await User.findOrCreate({
                        where:{username:req.body.username},
                        defaults:{username, password, age,email,phone,address,isActive,createdBy,createdAt,updatedBy,updatedAt}
                    })
                    if (!created) {
                        return res.status(409).json({ message: 'User already exists' });
                      }
                      
                    res.status(httpStatus.CREATED).json(newUser);
                    
        }catch(error){              
                    next(error);
                }
            
        
    }
    updateUser = async (req,res,next) => {
        try{
            const { username, password, age,email,phone,address,isActive,createdBy,createdAt,updatedBy,updatedAt } = req.body;
            const result = await User.update({
                username, 
                password, 
                age,
                email,
                phone,
                address,
                isActive,
                createdBy,
                createdAt,
                updatedBy,
                updatedAt
            },
            {where:{
                id:req.params.id
            }})
            if (result[0] === 0) {
                return res.status(404).json({ message: 'User not found' });
              }
              const updatedUser = await User.findOne({ where: { id } });
            res.status(httpStatus.OK);
            res.json(updatedUser)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    deleteUser = async (req,res,next) => {
        try{
            const deletedRows = await User.destroy({where:{id:req.params.id}});
            if (deletedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
              }
            res.status(httpStatus.OK);
            res.send("Delete successfully")
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
}
module.exports = new user
