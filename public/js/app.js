const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationLabel = document.querySelector('#loaction-label')
const forecastLabel = document.querySelector('#forecast-label')
const feelsLikeLabel = document.querySelector('#feels-like-label')

const displayStatus = (message) => {
    locationLabel.textContent = message
    forecastLabel.textContent = ''
    feelsLikeLabel.textContent = ''
}


const displayWeather = (weatherDetails) => {
    locationLabel.textContent = weatherDetails.location
    forecastLabel.textContent = weatherDetails.forecast
    feelsLikeLabel.textContent = weatherDetails.feelsLike
}

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    displayStatus('Loading...')

    fetch(`/weather?address=${search.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                displayStatus('Error occured - please choose different location.') 
            } else{
                displayWeather(data)
            }
        })
    })
})