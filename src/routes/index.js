import { Router } from "express";
import cakesRouters from "./cakesRouters.js";
import clientsRouters from "./clientsRouters.js";
import ordersRouters from "./ordersRouters.js";

const router = Router();
router.use(cakesRouters);
router.use(clientsRouters);
router.use(ordersRouters);

export default router;