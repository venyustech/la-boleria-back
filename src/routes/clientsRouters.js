import { Router } from 'express';
import { getClientOrders, postClient } from '../controllers/clientsControllers.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import clientsSchema from '../schemas/clientsSchema.js';

const clientsRouters = Router();
clientsRouters.post('/clients', validateSchemaMiddleware(clientsSchema), postClient);
clientsRouters.get('/clients/:id/orders', getClientOrders);


export default clientsRouters;