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
            id: new Date().toISOString(),
            model: model,
            distance: distance,
            value: value
        }
    });
}