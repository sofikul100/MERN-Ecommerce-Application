const router = require('express').Router();
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetail,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controllers/userController');

const {
    isAuthenticated, authorizeRole
} = require('../middlewares/auth')




router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout);


router.route('/me').get(isAuthenticated,getUserDetail)
router.route('/update/password').post(isAuthenticated,updatePassword)
router.route('/me/update').put(isAuthenticated,updateProfile);

router.route('/admin/users').get(isAuthenticated,authorizeRole("admin"),getAllUsers);



router
.route('/admin/user/:id')
.get(isAuthenticated,authorizeRole("admin"),getSingleUser)
.put(isAuthenticated,authorizeRole("admin"),updateUserRole)
.delete(isAuthenticated,authorizeRole("admin"),deleteUser)

// ---------- forget password route -----------//
router.route('/forgot/password').post(forgotPassword);
router.route('/password/reset/:id/:token').post(resetPassword);














module.exports = router;