const request = require('request')
const forecast = (lat,lon,callback)=>{
    const url = 'https://api.weatherstack.com/current?access_key=a3b96dbffbefc6d7d04e978959e5fc0e&query='+lat+','+lon+'&units=f'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Please check your internet connection ',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
    
        }
       else{
        callback(undefined,{
            'temperature':response.body.current.temperature,
            'Apparent_temperature' : response.body.current.feelslike,
            'weather_description':response.body.current.weather_descriptions[0],
    
    
        })
        
       }
    })
     
    }
    module.exports=forecast