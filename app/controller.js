
const express = require('express');
// const { ArduinoData } = require('./serial');
const router = express.Router();
let arduinoId = [];
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

db.getAllArduinos()
    .then(resultados => {
        for (let i = 0; i < resultados.length; i++) {
            arduinoId.push(resultados[i].serieBox);
        }
        setInterval(() => {

            let date = new Date();
            let da = date.toString().split(' ');
            let hora = `${da[4]}`;
            da = `${da[3]}/${month[da[1]]}/${da[2]}`

            console.log(hora, da);
        
            // let da = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() +
            //     ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
        
            // let da = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDay() +
            //             "/" + date.getMonth() + "/" + date.getFullYear()
        //     console.log(da);
            db.getAllMeasurement()
                .then(results => {
                    let inserts = [];
                    for (let i = 0; i < arduinoId.length; i++) {
                        inserts.push(db.insertMeasurement({
                            temp: parseInt(27 + (Math.random() > 0.5 ? 1 * (Math.random() * 9) : -1 * (Math.random() * 9))),
                            umi: parseInt(60 + (Math.random() > 0.5 ? 1 * (Math.random() * 15) : -1 * (Math.random() * 15))),
                            co2: parseInt(270 + (Math.random() > 0.5 ? 1 * (Math.random() * 100) : -1 * (Math.random() * 70))),
                            arduino: arduinoId[i],
                            d: da,
                            h: hora
                        }));
                    }
        // console.log({
        //     temp: ArduinoData.List1[ArduinoData.List1.length - 1],
        //     umi: ArduinoData.List2[ArduinoData.List2.length - 1],
        //     co2: ArduinoData.List3[ArduinoData.List3.length - 1],
        //     arduino: 5,
        //     d: da,
        //     h: hora
        // });
        
        
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
        
        }, 1000);
    })




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