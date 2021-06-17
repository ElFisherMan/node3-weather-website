const request = require('postman-request')

const forecast = (longtitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=33c00ea249da519a454c95cadf9c6fe9&query=${latitude},${longtitude}`

    request(url, {json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to weather service')
        } else if(body.error){
            callback('failed getting weather')
        } else{
            const weather = body.current
            const location = body.location
            callback(undefined, {
                forecast:`It is currently ${weather.temperature} degrees out, There is a ${weather.precip*100}% chance of rain`,
                location: `${location.name}, ${location.country}`
            })
        }
    })
}

module.exports = forecast