const httpStatus = require('http-status')
const Customer = require('../../_database/models/customer')
const config = require('../../config')
const order = require('../../_database/models/order')

 class customer{
    getCustomerDetail = async (req,res,next) => {
        try{
            const Cid = req.params.id || 0
            const customer = await Customer.findOne({
                include: [{
                    model:order,
                    as:'order'
                }],
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
            include: [{
                model:order,
                as:'order'
            }],
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
            if (result[0] === 0) {
                return res.status(404).json({ message: 'customer not found' });
              }
              const updatedCustomer = await Customer.findOne({ where: { id:req.params.id } });
            res.status(httpStatus.OK).json(updatedCustomer);
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    deleteCustomer = async (req,res,next) => {
        try{
            const deletedRows = await Customer.destroy({where:{id:req.params.id}});
            if (deletedRows === 0) {
                return res.status(404).json({ message: 'Customer not found' });
              }
            res.status(httpStatus.OK);
            res.send("Delete successfully")
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
}
module.exports = new customer