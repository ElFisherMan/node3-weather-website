const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set - sets a property
//hbs (handlebars) - plugin to handle templates for dynamic html content

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// tells express to take all html files from this directory such that they will be available to browse
//static - means it's a static web page - not a dynamic

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

//get - configures a route
app.get('', (req, res) => {
    //enables to render one of our views
    res.render('index', {
        title: 'Weather',
        name: 'Liran F'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Liran F'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'Help I need somebody',
        title: 'Help',
        name: 'Liran'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'you must provide address'
        })
    }
    geocode(address, (error, {longtitude, latitude} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(longtitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData.forecast,
                location: forecastData.location,
                address
            })

        })
    })

    
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        errorMessage: 'help article not found',
        title: '404',
        name: 'Liran'
    })
})

//match anything that hasn't ben matched so far
app.get('*',(req, res)=>{
    res.render('404',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Liran'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})