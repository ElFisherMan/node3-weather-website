const request = require("postman-request")

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZ2VvZG8iLCJhIjoiY2twdjg5ZzJ4MTg1ejJxcDgyeHJicXQyZSJ9.mfic32TnC8Nh32OlnrSYsA`
    request(url,{json:true}, (error, {body})=>{
        if(error){
            callback("unable to connect to location services")
        } else if(body.features.length === 0){
            callback("no geo location found")
        } else{
            const location = body.features[0]
            callback(undefined, {
                longitude:location.center[0],
                latitude:location.center[1],
                location:location.place_name
            })
        }
    })
}

module.exports = geocode