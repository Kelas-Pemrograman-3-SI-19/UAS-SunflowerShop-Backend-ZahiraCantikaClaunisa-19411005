const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarangSchema = new Schema({
    namaBarang: {
        type: String
    },
    harga: {
        type: Number
    },
    stok: {
        type: String,
        default: new Date().getFullYear().toString()
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('barang', BarangSchema)