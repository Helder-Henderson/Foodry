const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: 'index'}))

route.get('/registrar-cliente', (req, res) => res.render("registrar-cliente", { page: ""}))
route.get('/inicio-cliente', (req, res) => res.render("inicio-cliente", { page: ""}))
route.get('/entrar-cliente', (req, res) => res.render("entrar-cliente", { page: ""}))
route.get('/detalhes', (req, res) => res.render("detalhes", { page: ""}))
route.get('/perfil-cliente', (req, res) => res.render("perfil-cliente", { page: ""}))
route.get('/nota-fiscal', (req, res) => res.render("nota-fiscal", { page: ""}))
route.get('/comanda', (req, res) => res.render("comanda", { page: ""}))
route.get('/menu-cliente', (req, res) => res.render("menu-cliente", { page: ""}))
route.get('/pedidos', (req, res) => res.render("pedidos", { page: ""}))
route.get('/cardapio', (req, res) => res.render("cardapio", { page: ""}))

route.get('/perfil-empresa', (req, res) => res.render("perfil-empresa", { page: ""}))
route.get('/inicio-empresa', (req, res) => res.render("inicio-empresa", { page: ""}))
route.get('/entrar-empresa', (req, res) => res.render("entrar-empresa", { page: ""}))
route.get('/registrar-empresa', (req, res) => res.render("registrar-empresa", { page: ""}))

// POST COM A VARIAVEL DE ESTADO DO EJS /: PODE SER USADO PARA RECEBER DADOS E NÂO È OBRIGATÒRIO 
// TER UM DADO ALOCADO, SIMPLESMENTE È OPCIONAL ... LEMBRAR DISSO

module.exports = route