import { Router } from 'express';
import { postCakes } from '../controllers/cakesControlles.js';
import { validateCakeMiddleware, validateCakeUri } from '../middlewares/validateSchemaMiddleware.js';
import { cakesSchema, uriSchema } from '../schemas/cakesSchema.js';

const cakesRouters = Router();
cakesRouters.post('/cakes', validateCakeUri(uriSchema), validateCakeMiddleware(cakesSchema), postCakes);


export default cakesRouters;