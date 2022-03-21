import { Router } from 'express';
import { postClient } from '../controllers/clientsControllers.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import clientsSchema from '../schemas/clientsSchema.js';

const clientsRouters = Router();
clientsRouters.post('/clients', validateSchemaMiddleware(clientsSchema), postClient);


export default clientsRouters;