//console.log(`express from static file JS`)

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then(data => console.log(data))
// })

// fetch('http://localhost:5050/weather?address=Paris')
//     .then(res => res.json()
//         .then(data => {
//             if(data.error){
//                 console.log(data.error)
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         }))
        const weatherForm = document.querySelector('form')
        const search = document.querySelector('input')
        const messageOne = document.querySelector('#message-1')
        const messageTwo = document.querySelector('#message-2')

        
        weatherForm.addEventListener('submit',(e) =>{
            e.preventDefault()
            const location = search.value
            messageOne.textContent = 'Loading...'
            messageTwo.textContent = ''
            //console.log(location)
        fetch(`/weather?address=${location}`)
        .then(res => res.json()
            .then(data => {
                if(data.error){
                    messageOne.textContent = data.error
                    //console.log(data.error)
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast.forecast
                    console.log(data.location)
                    console.log(data.forecast)
                }
            }))
        })
