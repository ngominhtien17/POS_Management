import express from 'express'
const router = express.Router()

import { listCategory, addCategoryPage, addCategory, editCategoryPage, editCategory, deleteCategory } from '../controllers/category.Controller.js'
import { requireLogin, checkUserPermission } from '../middlewares/auth.js'

router.get('/listCategory', requireLogin, checkUserPermission, listCategory)
router.get('/addCategoryPage', addCategoryPage)
router.post('/addCategory', addCategory)
router.get('/editCategoryPage/:id', editCategoryPage)
router.put('/editCategory/:id', editCategory)
router.delete('/deleteCategory/:id', deleteCategory)
export default router