import express from 'express'
const router = express.Router()
import { upload, processImage } from '../middlewares/upload.js'
import { listProduct, addProductPage, addProduct, editProductPage, editProduct, deleteProduct } from '../controllers/product.Controller.js'
import { requireLogin, checkUserPermission } from '../middlewares/auth.js'

router.get('/listProduct', requireLogin, checkUserPermission, listProduct)
router.get('/addProductPage', addProductPage)
router.post('/addProduct', upload.single('image'), processImage, addProduct)
router.get('/editProductPage/:id', editProductPage)
router.put('/editProduct/:id', upload.single('image'), processImage, editProduct)
router.delete('/deleteProduct/:id', deleteProduct)
export default router