const express = require('express');
const { ArduinoData } = require('./serial')
const router = express.Router();


router.get('/', (request, response, next) => {

    let sum1 = ArduinoData.List1.reduce((a, b) => a + b, 0);
    let average1 = (sum1 / ArduinoData.List1.length).toFixed(2);
    let sum2 = ArduinoData.List2.reduce((a, b) => a + b, 0);
    let average2 = (sum2 / ArduinoData.List2.length).toFixed(2);

    const res = {
        dataTemp: ArduinoData.List1,
        dataUmi: ArduinoData.List2,
        totalTemp: ArduinoData.List1.length,
        totalUmi: ArduinoData.List2.length,
        average1: isNaN(average1) ? 0 : average1,
        average2: isNaN(average2) ? 0 : average2
    }

    response.json(res);

});

module.exports = router;