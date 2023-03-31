const router = require('express').Router();


const {
    getAllProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview,
    getAllReviewsOfProduct,
    deleteReview
} = require('../controllers/productController');

const {
    //** 8 **/
    isAuthenticated,
    //** 9 **/
    authorizeRole
} = require('../middlewares/auth')



//=---------creating product routes----------=/
router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticated,authorizeRole("admin"),createProduct)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id').put(isAuthenticated,authorizeRole("admin"),updateProduct).delete(deleteProduct);

router.route('/review').put(isAuthenticated,createProductReview);
router.route('/reviews').get(getAllReviewsOfProduct).delete(isAuthenticated,deleteReview);







module.exports = router;