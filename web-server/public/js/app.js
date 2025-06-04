//Clent side javascript
console.log('client side javascript file is loaded')
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)

//     })

// })


  const weatherform = document.querySelector('form')
  const search = document.querySelector('input')
  const messageone = document.querySelector('#message-1')
  const messagetwo = document.querySelector('#message-2')
  messageone.textContent = 'Loading...'
  messagetwo.textContent= ''
 weatherform.addEventListener('submit',(e)=>{
   // console.log('Testing!')
     e.preventDefault() // preventing default to refresh browser
     const location = search.value
// console.log(location)
      
    fetch('http://localhost:3000/weather?address='+location).then((response
 )=>{
   
    response.json().then((data)=>{
        if(data.error){
          console.log(data.error)
          messageone.textContent = data.error
        }
        else{
          console.log(data.location)
          messageone.textContent = data.location
          console.log(data.forecast)
          messagetwo.textContent = 'Temperature is '+data.forecast.temperature+',apparent temperature is '+data.forecast.Apparent_temperature + ' and the weather is '+data.forecast.weather_description
        }
   })
})
// console.log(location)
 })