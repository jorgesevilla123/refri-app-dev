import { Router } from "express";
import { testControllers } from "../controllers/tests-controllers";



const router = Router();
const TestController = new testControllers();



router.route('/query').get(TestController.queryTest);

router.route('/search-test').get(TestController.searchTest);


export default router