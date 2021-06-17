console.log('javascript loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch(`/weather?address=${search.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = 'Error!'    
            } else{
                messageOne.textContent = JSON.stringify(data)
            }
        })
    })
})