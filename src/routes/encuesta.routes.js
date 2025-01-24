import {Router} from 'express'; 
import { saludo } from '../controllers/encuesta.controller.js';

const router = Router();

router.get('/', saludo);

export default router;