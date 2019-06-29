const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//console.log(forecast())

//const ejs = require('ejs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 5050

//Define paths for Express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
//const partialsPath = path.join(__dirname,'../template/partials')
//setup ejs ebgine and views location
app.set('view engine','ejs')
app.set('views',viewsPath)
//ejs.render(partialsPath,data)


//setup static directory to server
app.use(express.static(publicDirectorypath))

app.get('/fetch',(req,res) => {
    res.render('index',{
        title:'just un test',
        forecast:'fetch',
        name:'Karim'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide on address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{


        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            //res.render('index')
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'It is Snowing',
    //     location:'Paris',
    //     adress: req.query.adress,
    //     errorMessage:'Help article not found'
    // })
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        protuct:[]
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Marie Pierce'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText:'This is some helpful text,',
        title:'Help Page',
        name:'Jean Marron'
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'John Doe',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'John Doe',
        errorMessage:'Page not found'
    })
})
app.listen(port,() => console.log(`Server is on port:${port}`) )