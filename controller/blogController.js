const Blog=require('./../models/blogs')

const blog_index = (req,res)=>{
    
        Blog.find()
         .then(result=>{
             
            res.render('index',{title:'home',blogs:result})
         })
         .catch(err=>{
             res.send(err)
         })
}

const blog_create_get=(req,res)=>{
    res.render('newblog')
}

const blog_create_post=(req,res)=>{
    const blog=new Blog(req.body)

    blog.save()
        .then((result) =>{
            res.redirect('/')
        })
        .catch(err=>{
            res.send(err)
        })
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render("details",{blog:result,title:'Blog details'})
        })
        .catch(err=>{
            res.status(404).render("404",{title:'404'})
        })
}

const blog_details_delete=(req,res)=>{
    const id=req.params.id
    
    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect:'/'})
        })  
}

module.exports={
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_details_delete
}