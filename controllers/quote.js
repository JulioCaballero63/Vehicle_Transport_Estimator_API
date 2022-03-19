const { model } = require("mongoose");

exports.getQuote = (req, res, next) => {
    res.status(200).json({
        route: [{ model: "Model X", distance: "900", value: "90000" }]
    });
};

exports.createQuote = (req, res, next) => {
    const model = req.body.model;
    const distance = req.body.distance;
    const value = req.body.value;

    // Create quote on db
    res.status(201).json({
        message: 'Quote created successfully!',
        route: {
            quoteId: new Date().toISOString(),
            model: model,
            distance: distance,
            value: value
        }
    });
}

exports.getEstimate = (req, res, next) => {
    //Need to get these values from the database, hard coded for now.
    const distance = 1000;
    const ppm = .5;
    const value = 80000;
    const insurance = .01
    let total = (distance * ppm) + (value * insurance);

    // Return the total price.
    res.status(200).json({
        quote: [{ total: total }]
    });
};