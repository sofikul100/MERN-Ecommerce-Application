const express = require('express');
const router = express.Router();
const {
    createOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController')
const {
    isAuthenticated, authorizeRole
} = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticated,createOrder);
router.route('/order/:id').get(isAuthenticated,getSingleOrder);
router.route('/orders/me').get(isAuthenticated,myOrders)

router.route('/admin/orders').get(isAuthenticated,authorizeRole("admin"),getAllOrders)


router.route('/admin/order/:id')
.put(isAuthenticated,authorizeRole("admin"),updateOrderStatus)
.delete(isAuthenticated,authorizeRole("admin"),deleteOrder)





module.exports = router;