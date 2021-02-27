const express=require('express')
const mongoose=require('mongoose')
const app=express()
const blogController=require('./controller/blogController')
const Blog=require('./models/blogs')

//connects to mongo db
const dbURI='mongodb+srv://blackwidow:test1234@cluster0.jh2c3.mongodb.net/nodejs?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useUnifiedTopology: true ,useNewUrlParser: true })
        .then((result)=>{ console.log('Successfully connected')})
        .catch( err => { console.log(err) })

//register
app.set('view engine','ejs');

//starts server
app.listen('3000')

//Access public folder
app.use(express.static('public'))

//Parse data from forms
app.use(express.urlencoded({extended:true}))

//Routes start here

//Root Folder
app.get('/',blogController.blog_index)
//TO create new blog
app.get('/create-blog',blogController.blog_create_get) 
//Post request to send data from form to database
app.post('/create-blog',blogController.blog_create_post)
//Delete request for blog
app.delete('/blog/:id',blogController.blog_details_delete)
//Access each blog by their ID
app.get("/blog/:id",blogController.blog_details)
//404 page
app.use((req,res)=>{
    
    res.status('404').render('404',{title:'404 other'})
})