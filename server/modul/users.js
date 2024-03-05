    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const UsersSchema = new Schema({
        id: ObjectId,
        email: String,
        isBand: Boolean,
        date: Date,
        expire_date: Date,
    });

    const Users = mongoose.model('Users_whatsapp', UsersSchema);

    module.exports = {Users};