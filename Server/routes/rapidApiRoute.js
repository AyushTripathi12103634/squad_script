// rapidApiRoute.js
import express from 'express';
import { rapidApiCompileController, rapidApiDetailController, rapidApiResultController } from '../controllers/rapidApicontroller.js';

const router = express.Router();

router.get("/", rapidApiDetailController);

router.post("/judge", rapidApiCompileController);

router.get("/judge/:id", rapidApiResultController);

export default router;
