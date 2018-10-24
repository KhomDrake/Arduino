const express = require('express');
// const { ArduinoData } = require('./serial')
const router = express.Router();
const arduinoId = [1,2,3,4,5];
const db = require('./db').Arduino;


setInterval(() => {

    let date = new Date();

    let da = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + 
            ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();

    // let da = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDay() +
    //             "/" + date.getMonth() + "/" + date.getFullYear()

    let measurement = {
        temp: parseInt(Math.random() * 27),
        umi: parseInt(Math.random() * 70),
        co2: parseInt(Math.random() * 100),
        arduino: arduinoId[parseInt(Math.random() * 5)],
        d: da
    }

    // db.insertMeasurement(measurement)
    //     .then(results => {
    //         // console.log(results);
    //     })
    //     .catch(err => console.log(err));

}, 1000);


router.get('/', (request, response, next) => {

    // let sum1 = ArduinoData.List1.reduce((a, b) => a + b, 0);
    // let average1 = (sum1 / ArduinoData.List1.length).toFixed(2);
    // let sum2 = ArduinoData.List2.reduce((a, b) => a + b, 0);
    // let average2 = (sum2 / ArduinoData.List2.length).toFixed(2);

    // const res = {
    //     dataTemp: ArduinoData.List1,
    //     dataUmi: ArduinoData.List2,
    //     totalTemp: ArduinoData.List1.length,
    //     totalUmi: ArduinoData.List2.length,
    //     average1: isNaN(average1) ? 0 : average1,
    //     average2: isNaN(average2) ? 0 : average2
    // }
    // response.json(res);

    db.getAllMeasurement()
        .then(results => response.json(results))
        .catch(err => response.json(err));


});

module.exports = router;