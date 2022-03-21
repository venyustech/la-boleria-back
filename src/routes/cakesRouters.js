import { Router } from 'express';
import { postCakes } from '../controllers/cakesControlles.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import cakesSchema from '../schemas/cakesSchema.js';

const cakesRouters = Router();
cakesRouters.post('/cakes', validateSchemaMiddleware(cakesSchema), postCakes);


export default cakesRouters;