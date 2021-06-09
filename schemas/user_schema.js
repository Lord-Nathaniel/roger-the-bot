const mongoose = require('mongoose');

//object to use multiple time : Required String
const reqString = {
    type: String,
    required: true
};

//object to use multiple time : Required Number
const reqNumber = {
    type: Number,
    required: true
};

//object to use multiple time : Required Boolean
const reqBoolean = {
    type: Boolean,
    required: true
};

const userSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    resources: {
        rouge: reqNumber,
        orange: reqNumber,
        jaune: reqNumber,
        vert: reqNumber,
        bleu: reqNumber,
        violet: reqNumber
    },
    objects: {
        o_arrosoir: reqBoolean,
        t_fermier: reqBoolean,
    },
    cards: {
        s_stardew: reqBoolean
    }
});

module.exports = mongoose.model('users', userSchema);