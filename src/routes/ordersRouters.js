import { Router } from 'express';
import { getOrderById, getOrders, postOrder } from '../controllers/ordersControllers.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import ordersSchema from '../schemas/ordersSchema.js';

const ordersRouters = Router();
ordersRouters.post('/order', validateSchemaMiddleware(ordersSchema), postOrder);
ordersRouters.get('/orders', getOrders);
ordersRouters.get('/orders/:id', getOrderById);


export default ordersRouters;