const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.set('view engine', 'hbs');

      const viewsDirectory = path.join (__dirname , "../template/views" )
      app.set( "views" , viewsDirectory)


      var hbs = require ('hbs')

      const partialsPath = path.join (__dirname , "../template/partials")

      hbs.registerPartials(partialsPath)


      app.get('/' , (req , res) => {
        res.render('index' , {
            title:"Home",
            mainTitle: "Welcome to our Weather Jornal App",
            subTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, pariatur nulla quae earum ab reprehenderit rerum voluptatem eligendi officiis ipsam!"
        })
    })

    

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    const request = require ("request")
    const url = "http://api.weatherstack.com/current?access_key=f7ea221422539dbc2fdeb7b081efcee9&query=Egypt"
  
    request ({url, json : true} , (error , response) => {
         
        if(error) {
             console.log("Unable to connect weather service")
        } else if(response.body.error){
            console.log(response.body.error.message )
        } else {
            console.log("current Country is "+ response.body.location.country + " weather is " + response.body.current.weather_descriptions[0] + " and Temperature is " + response.body.current.temperature)
        }
        app.get('/weather' , (req , res) => {
            res.render('weather' , {
                title: "Weather",
                lat: response.body.location.lat ,
                lon: response.body.location.lon,
                country: response.body.location.country,
                desc: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature
    
            })
        })
    })