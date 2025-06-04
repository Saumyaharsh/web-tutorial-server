// Using path module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./1-utils/geocode')
const forecast = require('./1-utils/forecast')
const { error } = require('console')


// core node module 'path' provide many utilies
// Node provides two methods 
// Path should be root to use public folder
//console.log(__dirname) // path to current directory the file is in
// console.log(__filename) // whole path to file
//console.log(path.join(__dirname,'../public'))
// first . shows to path second dot shows to folder





const app = express()
// app.use() is used to customize the server

// Define paths for Express config
const publicdirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'./templates/views')
const partialspath = path.join(__dirname,'./templates/partials')



//setup handlebars engine and views location
 app.set('view engine','hbs')
 app.set('views',viewspath)
 hbs.registerPartials(partialspath)


// setup static directory to serve
 app.use(express.static(publicdirectory))

//constructing route for hbs file
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
       name:'Author',
     


    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
       name:'Andrew Mead',
        

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
       name:'Andrew Mead',
     


    })
})


// app.com
//app.com/help
//app.com/about
app.get('',(req,res)=>{
    res.send('<h1>Weather</h1>')
})

app.get('/help',(req,res)=>{
    res.send([{
        name:'Andrew',
    },{name:"Sarah"}])
})
app.get('/about',(req,res)=>{
    res.send('<h1>Title</h1>')

})
app.get('/weather',(req,res)=>{
       if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
})
   

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
console.log(req.query.search)
res.send({
    products:[]
})
})
// Routing 404 pages
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Help article not found',

    })

})


app.get('*',(req,res)=>{
   res.render('error',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Page not found',
        
    })


})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
// http -> port 80