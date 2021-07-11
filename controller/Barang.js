const barangModel = require('../model/Barang')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertBarang = (data) =>
  new Promise((resolve, reject) => {
    barangModel.create(data)
    .then(() => resolve(requestResponse.sukses('data sukses')))
    .catch(() => reject(requestResponse.serverError))
  })

  exports.getAllBarang = () =>
  new Promise((resolve, reject) => {
    barangModel.find({})
      .then(barang => resolve(requestResponse.suksesWithData(barang)))
      .catch(() => reject(requestResponse.serverError))
  })

  exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: objectId(id)
    }).then(barang => resolve(requestResponse.suksesWithData(barang)))
      .catch(error => reject(requestResponse.serverError))
  })

  exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    barangModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() =>{
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Barang'))
      }).catch(() => reject(requestResponse.serverError))
  })


exports.delete = (id) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: objectId(id)
    }).then(barang => {
      barangModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(barang.image)
        resolve(requestResponse.sukses('berhasil delete barang'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })