const httpStatus = require('http-status')
const customer = require('../../_database/models/customer')
const orderDetail = require('../../_database/models/orderDetail')
const Order = require('../../_database/models/order')
const config = require('../../config')
const createToken = require('../auth')
const {oderSchema} = require('../../validate/orderValidate.js')

class order{

     getOrderDetail = async (req,res,next) => {
        try{
            const Oid = req.params.id || 0
            const user = await Order.findOne({               
                where: { id: Oid },   
            });    
            return res.json(user);
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    getAllOrders = async (req,res,next) =>{
        const { page, pageSize } = req.query;
        const limit = pageSize ? parseInt(pageSize) : 2;
        const offset = page ? (parseInt(page) - 1) * limit : 0;
    try{
        const { count , rows  } =  await Order.findAndCountAll
        ({
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
    createOrder = async (req,res,next) =>{
        try{
            // const {err,value} = oderSchema.validate(req.body)
            //     if(err){
            //         return res.status(httpStatus.BAD_REQUEST).json(err.details[0].message);
            //     }               
                const {customerId,price,tax,discount,totalPrice,createdBy,updatedBy} = req.body
                    const result = await Order.create({
                        customerId,price,tax,discount,totalPrice,createdBy,updatedBy
                    })
                    if (!result) {
                        return res.status(409).json({ message: 'Order already exists' });
                      }
                    
                    res.status(httpStatus.CREATED).json(result);
                    
        }catch(error){              
                    next(error);
                }
            
        
    }
    updateOrder = async (req,res,next) => {
        try{
            const {customerId,price,tax,discount,totalPrice,createdBy,updatedBy} = req.body
            const result = await Order.update({
                customerId,price,tax,discount,totalPrice,createdBy,updatedBy
            },
            {where:{
                id:req.params.id
            }})
            if (result[0] === 0) {
                return res.status(404).json({ message: 'Order not found' });
              }
              const updatedOrder = await Order.findOne({ where: { id:req.params.id } });
            res.status(httpStatus.OK);
            res.json(updatedOrder)
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
    deleteOrder = async (req,res,next) => {
        try{
            const deletedRows = await Order.update({"isDeleted":"1"},{where:{id:req.params.id}});
            if (deletedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
              }
            res.status(httpStatus.OK);
            res.send("Delete successfully")
        }catch(err){
            console.log(err.message);
            next(err);
        }
    }
}
module.exports = new order
