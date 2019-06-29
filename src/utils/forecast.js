const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = `https://api.darksky.net/forecast/d4027e5306c4c2663f86d799a33a8872/${latitude},${longitude}`
    request({ url, json:true },(error,{ body }) => {
        //console.log(res.body)
        const currently = body.daily.data[0].summary
        const precipProbability = body.currently.precipProbability
        
        const forecast = `${currently} it is currently ${precipProbability} % chance of rain`
        const err = error
       
            if(err){
            callback(`Unable to connect Weather service!`,undefined)
                } else if(body.error){
                    callback(`unable to find lacation`,undefined)
                }
            callback(undefined, {
                latitude,
                longitude,
                forecast
            }
        )
    })    
}

module.exports = forecast