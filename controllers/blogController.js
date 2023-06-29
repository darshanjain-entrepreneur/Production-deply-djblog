
const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");




exports.getAllBlogController = async (req , res) => {

    try {
const blogs = await blogModel.find({}).populate("user");
if(!blogs){
    return res.status(200).send({
        success:false,
        message: "No blog found"

    })

   
}
return res.status(200).send({
        
    success:true,
    BlogCount:blogs.length,
    message:"all blog list",
    blogs
})
        
    } catch (error) {
        
       
        return res.status(500).send({
            success:true,
            message:"Error in getting blogs",
            error
        })
    }

}

exports.createBlogController = async (req , res) => {

try {
    const { title, description, image, user } = req.body;
    //validation

if(!user){
    return res.status(200).send({
        success: false,
        message: "Please Login",
      });
}

    if (!title || !description || !image || !user) {
      return res.status(200).send({
        success: false,
        message: "Please Provide ALL Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });   
 
} catch (error) {
   
    return res.status(404).send({
        success: false,
        message:"Error while creating blog",
        error
    })


}

}

exports.updateBlogController = async (req , res) => {
try {
    const {id} = req.params;

    const {title , description , image , user} = req.body;

    const blog = await  blogModel.findByIdAndUpdate(id , {...req.body} , {new: true});
    
    return res.status(200).send({
        success: true,
        message:"Blog Updated",
        blog
    })
    
} catch (error) {
    
    return res.status(400).send({
        success:false,
        message:"Error while updating blog",
        error
    })

}

}

exports.getBlogbyIdController = async  (req , res)  => {

try {
    
    const {id} = req.params
    const blog = await blogModel.findById(id);
    if(!blog){

        return res.status(400).send({
            success:false,
            message:"blog not found with this id"
          
        })
    }

return res.status(200).send({
    success:true,
    message:"fetched single blog",
    blog
})


} catch (error) {
   
    return res.status(400).send({
        success:false,
        message:"Failed to get the single blog by id",
        error
    })


}

};




exports.deleteBlogController = async (req , res) => {
    
try {

    const blog = await blogModel
    // .findOneAndDelete(req.params.id)
    .findByIdAndDelete(req.params.id)
    .populate("user");
  await blog.user.blogs.pull(blog);
  await blog.user.save();
  return res.status(200).send({
    success: true,
    message: "Blog Deleted!",
  });

   

    
} catch (error) {
    
    return res.status(400).send({
        success:false,
        message:"Failed to delete the blog",
        error

    })
    
}


}


exports.userBlogController = async (req , res) => {
try {
const userBlog = await userModel.findById(req.params.id).populate("blogs")
if(!userBlog){
    return res.status(404).send({
        success:false,
        message:"blogs not found with this id"
    })
}

return res.status(200).send({
    success:true,
    message:"user Blogs",
    userBlog
})

    
} catch (error) {
  
    res.status(404).send({
        success:false,
        message:"error in user blog",
        error
    })
    
}

}