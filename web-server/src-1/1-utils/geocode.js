const request = require('request') 
const geocode=(address,callback)=>{

 
     const url = 'https://geocode.maps.co/search?q='+encodeURIComponent(address)+'&api_key=6817369f567f2058803264fdm20e61c&format=json'
 request({url:url,json:true},(error,response)=>{
     if(error){
         callback('Unable to connect to local services',undefined)
     }
     else if(response.body.length==0){
         callback('Unable to find location, Please try another search ',undefined)
     }
     else{
         callback(undefined,{
            latitude: response.body[0].lat,
            longitude : response.body[0].lon,
            location : response.body[0].display_name,
         })
     }
 })
 }
 
 // challenge 



 module.exports = geocode
