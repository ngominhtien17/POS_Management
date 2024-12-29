import homeRouter from './home.js'
import productRouter from './product.js'
import categoryRouter from './category.js'
import orderRouter from './order.js'
import employeeRouter from './employee.js'
import customerRouter from './customer.js'
import reportRouter from './report.js'

const router = (app) => {
  app.use('/product', productRouter)
  app.use('/category', categoryRouter)
  app.use('/order', orderRouter)
  app.use('/employee', employeeRouter)
  app.use('/customer', customerRouter)
  app.use('/report', reportRouter)
  app.use('/', homeRouter)
}

export { router }
