const fs = require('fs');
const Datastore = require('nedb');
const express = require('express');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const database  = new Datastore('database.db');
database.loadDatabase();


app.post('/api', (request, response) => {
    console.log('I got a request');
    console.log(request.body);
    const data = request.body;
    const time = new Date;
    const name = document.getElementById("namefield");

    const dataToSave = ` \n name: ${name} \n logintime: ${time}; \n latitude: ${data.lat} ; \nlongitude: ${data.lon}; \n`;
    database.insert({name: name, logintime: time, latitude: data.lat, longitude: data.lon});

    fs.appendFile('saved_data.txt', dataToSave, (err) => {
        if (err) throw err;
        console.log('Data saved!')
    })

    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    });

});