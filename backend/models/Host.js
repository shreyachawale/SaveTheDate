const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Host = mongoose.model('Host', HostSchema);
module.exports = Host;
