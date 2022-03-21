import { Router } from 'express';
import { postCakes } from '../controllers/cakesControlles.js';
import { validateSchemasMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { cakesSchema, uriCakeSchema } from '../schemas/cakesSchema.js';

const cakesRouters = Router();
cakesRouters.post('/cakes', validateSchemasMiddleware(uriCakeSchema, 422), validateSchemasMiddleware(cakesSchema, 400), postCakes);


export default cakesRouters;