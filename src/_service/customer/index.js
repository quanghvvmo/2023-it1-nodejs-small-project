const httpStatus = require('http-status')
const User = require('../../_database/models/user')
const Customer = require('../../_database/models/customer')
const config = require('../../config')

 class customer{
    getCustomerDetail = async (req,res,next) => {
        try{
            const Cid = req.params.id || 0
            const customer = await Customer.findOne({
                include: [customer],
                where: { id: Cid },
                
                
            });    
            return res.json(customer);
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    getAllCustomers = async (req,res,next) =>{
        const { page, pageSize } = req.query;
        const limit = pageSize ? parseInt(pageSize) : 2;
        const offset = page ? (parseInt(page) - 1) * limit : 0;
    try{
        const { count , rows  } =  await Customer.findAndCountAll
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
    createCustomer = async (req,res,next) =>{
        try{
            const result = await Customer.create(req.body)
            res.status(httpStatus.CREATED);
            res.send(result)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    
    updateCustomer = async (req,res,next) => {
        try{
            const result = await Customer.update(req.body,{where:{
                id:req.params.id
            }})
            res.status(httpStatus.OK);
            //res.send(result)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    deleteCustomer = async (req,res,next) => {
        try{
            await Customer.destroy({where:{id:req.params.id}})
            res.status(httpStatus.OK);
            res.send("Delete successfully")
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
}