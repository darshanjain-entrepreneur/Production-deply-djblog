const express = require('express');
const { deleteBlogController, getBlogbyIdController, updateBlogController, createBlogController, getAllBlogController, userBlogController } = require('../controllers/blogController');

const router = express.Router();

router.get('/allblog', getAllBlogController );

router.post('/createblog' , createBlogController);

router.put('/updateblog/:id' , updateBlogController);

router.get('/getblog/:id' , getBlogbyIdController);

router.delete('/deleteblog/:id' , deleteBlogController);


router.get('/userblog/:id' , userBlogController);

module.exports = router