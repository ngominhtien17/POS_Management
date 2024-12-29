import { permissions } from '../configs/permissions.config.js'

export const requireLogin = (req, res, next) => {
  if (!req.session?.user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return res.redirect('/loginPage')
  }
  // Nếu đã đăng nhập, tiếp tục middleware tiếp theo
  next()
}

export const ensurePasswordUpdated = (req, res, next) => {
  // Bỏ qua kiểm tra nếu đang ở trang đăng nhập hoặc trang thay đổi mật khẩu
  if (req.path === '/loginPage' || req.path === '/employee/new-password') {
    return next() // Cho phép truy cập nếu đang ở trang đăng nhập hoặc đổi mật khẩu
  }
  // Kiểm tra nếu người dùng cần thay đổi mật khẩu
  if (req.session.user && req.session.user.isFirstLogin) {
    return res.redirect('/employee/new-password') // Chuyển hướng nếu cần đổi mật khẩu
  }
  next() // Nếu không, tiếp tục qua middleware tiếp theo
}

export const checkUserPermission = (req, res, next) => {
  const user = req.session?.user

  if (!user) {
    return res.redirect('/loginPage') // Chuyển hướng nếu người dùng chưa đăng nhập
  }

  const userPermissions = user.permissions // Lấy quyền từ session
  const currentRoute = req.originalUrl // Lấy route hiện tại

  // Định nghĩa các quyền truy cập
  const rolePermissions = {
    [permissions.ADMIN]: ['*'],
    [permissions.SALESPERSON]: ['/', '/order/addOrder']
  }

  // Kiểm tra quyền truy cập
  const hasPermission = userPermissions.some(permission => {
    const allowedRoutes = rolePermissions[permission]
    return allowedRoutes.includes('*') || allowedRoutes.includes(currentRoute)
  })

  if (!hasPermission) {
    // Nếu không có quyền, render trang lỗi
    return res.status(403).render('pages/errorAuth', {
      message: 'Bạn không có quyền truy cập vào trang này.',
      statusCode: 403
    })
  }

  next() // Nếu có quyền, tiếp tục middleware tiếp theo
}