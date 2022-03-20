const mongoose = require('mongoose'); //db connection
const Schema = mongoose.Schema; //mongoose schema require

const userSchema = new Schema({

        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true
        },
        quotes: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Vehicle' // the quotes model is named vehicle
                }
            ]
    }

);

module.exports = mongoose.model('User', userSchema);
