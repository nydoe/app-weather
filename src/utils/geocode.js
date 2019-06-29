const request = require('request')


const geocode = (adresse,callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adresse)}.json?access_token=pk.eyJ1Ijoibnlkb25lIiwiYSI6ImNqeDZkZG1ucjAxbXY0YXRham8xOGF0bXgifQ.WbuOpfEyi9UoMvzezH5bWg`
    request( {url,json:true },(err,{ body }) => {
        
        if(err) {
            callback(`Unable to connect Weather service!`,undefined)
         } else if(body.features.length === 0){
            
             callback(`Unable to find location!`,undefined)
            }
            else {
                // let preProbility = res.body.currently.precipProbability 
                // let temperature = res.body.daily.data[0].summary
                // console.log(`It is currently ${temperature} degress out; There is a ${preProbility}`)
                // //console.log(res.body.currently)
                callback(undefined,{
                    //mapBox:res,
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                    //console.log(latitude,longitude)
                })
            }
            //console.log(res)
            //return callback
            
        })
    }
module.exports = geocode