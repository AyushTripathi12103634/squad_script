// rapidApiRoute.js
import express from 'express';
import { rapidApiCompileController, rapidApiDetailController, rapidApiResultController } from '../controllers/rapidApicontroller.js';
import { requireSignIn } from '../middleware/authmiddleware.js';
const router = express.Router();

router.get("/",requireSignIn ,rapidApiDetailController);

router.post("/judge",requireSignIn ,rapidApiCompileController);

router.get("/judge/:id",requireSignIn ,rapidApiResultController);

export default router;
