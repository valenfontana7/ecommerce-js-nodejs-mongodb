'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const produto_model = new schema({
    nome: {type: String, required: true, trim: true, index: true},
    descricao: {type: String, required: true},
    preco: {type: Number, required: true},
    foto: {type: String, required: true},
    ativo: {type: Boolean, required: true},
    dataCriacao: {type: Date, default: Date.now}
}, {versionKey: false})

// antes de salvar ele verifica se foi setado a data
produto_model.pre('save', next => {
    let agora = new Date()
    if (!this.dataCriacao) {
        this.dataCriacao = agora
        next() // prossiga pro salvamento
    }
})

module.exports = mongoose.model('Produto', produto_model)