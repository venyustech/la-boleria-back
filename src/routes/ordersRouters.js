import { Router } from 'express';
import { getOrderById, getOrders, postOrder } from '../controllers/ordersControllers.js';
import { validateSchemasMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { orderQuantitySchema, orderSchema } from '../schemas/ordersSchema.js';

const ordersRouters = Router();
ordersRouters.post('/order', validateSchemasMiddleware(orderQuantitySchema, 400), validateSchemasMiddleware(orderSchema, 404), postOrder);
ordersRouters.get('/orders', getOrders);
ordersRouters.get('/orders/:id', getOrderById);


export default ordersRouters;