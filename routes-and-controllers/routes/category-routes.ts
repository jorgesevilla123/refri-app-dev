import { Router } from 'express'
import { createCategory, getCategories } from "../controllers/category-controllers";


const router = Router();



router.route('/get-categories').get(getCategories)



router.route('/create-category').post(createCategory)



export default router

