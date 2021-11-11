const express = require('express')
const ROUTE = require('./route')
const PATH = require('path')

const SERVER = express()

const PORTA = 3000;

SERVER.set('view engine', 'ejs')
SERVER.use(express.static("public"))

SERVER.set("views", PATH.join(__dirname,"public/views"))

SERVER.use(express.urlencoded({extended: true}))

SERVER.use(ROUTE)

SERVER.listen(PORTA, () => console.log(`Server rodando na porta: ${PORTA}`))