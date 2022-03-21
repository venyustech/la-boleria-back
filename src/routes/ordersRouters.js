import { Router } from 'express';
import { postOrder } from '../controllers/ordersControllers.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import ordersSchema from '../schemas/ordersSchema.js';

const ordersRouters = Router();
ordersRouters.post('/order', validateSchemaMiddleware(ordersSchema), postOrder);


export default ordersRouters;