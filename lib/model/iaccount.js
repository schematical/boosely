'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {
    _id: { type: ObjectId },
    account: { type: String, ref:'Account' },
};
var accountSchema = new Schema(fields);


var IAccountModel = mongoose.model('IAccount', accountSchema);


module.exports = IAccountModel;