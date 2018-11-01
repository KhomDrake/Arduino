
const express = require('express');
const { ArduinoData } = require('./serial');
const router = express.Router();
const arduinoId = [1, 2, 3, 4, 5];
const db = require('./db').Arduino;

let month = {
    "" : 1,
    "" : 2,
    "" : 3,
    "" : 4,
    "" : 5,
    "" : 6,
    "" : 7,
    "" : 8,
    "" : 9,
    "Oct" : 10,
    "Nov" : 11,
    "" : 12
}

setInterval(() => {

    let date = new Date();
    let da = date.toString().split(' ');
    da = `${da[3]}/${month[da[1]]}/${da[2]} ${da[4]}`;

    // let da = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() +
    //     ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();

    // let da = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDay() +
    //             "/" + date.getMonth() + "/" + date.getFullYear()
    console.log(da);
    db.getAllMeasurement()
        .then(results => {



            let inserts = [];
            // for (let i = 0; i < arduinoId.length; i++) {
                inserts.push(db.insertMeasurement({
                    temp: ArduinoData.List1[ArduinoData.List1.length - 1],
                    umi: ArduinoData.List2[ArduinoData.List2.length - 1],
                    co2: ArduinoData.List3[ArduinoData.List3.length - 1],
                    arduino: 5,
                    d: da
                }));
            // }
console.log({
    temp: ArduinoData.List1[ArduinoData.List1.length - 1],
    umi: ArduinoData.List2[ArduinoData.List2.length - 1],
    co2: ArduinoData.List3[ArduinoData.List3.length - 1],
    arduino: 5,
    d: da
});


            Promise.all(inserts)
                .then((results) => {

                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));


    // db.insertMeasurement(measurement)
    //     .then(results => {
    //         // console.log(results);
    //     })
    //     .catch(err => console.log(err));

}, 5000);


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