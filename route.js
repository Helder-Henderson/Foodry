const UserController = require('./public/controllers/UserController')
const EnterpriseController = require('./public/controllers/EnterpriseController')

const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render("index"))
route.get('/inicio-cliente', (req, res) => res.render("inicio-cliente", { page: ""}))

/* REGISTRAR-CLIENTE (GET_POST) */
route.get('/registrar-cliente',(req,res) => res.render("registrar-cliente"))
route.post("/registrar-cliente", UserController.create);
 
route.get('/entrar-cliente', (req, res) => res.render("entrar-cliente", { page: ""}))
route.post('/entrar-cliente',UserController.login)

route.get('/menu-cliente/:id',(req, res) => res.render("menu-cliente", { page: ""}))

route.get('/detalhes', (req, res) => res.render("detalhes", { page: ""}))

route.get('/perfil-cliente/:id', UserController.openPerfil)

route.get('/nota-fiscal', (req, res) => res.render("nota-fiscal", { page: ""}))

route.get('/comanda', (req, res) => res.render("comanda", { page: ""}))

route.get('/menu-cliente', (req, res) => res.render("menu-cliente", { page: ""}))

route.get('/pedidos', (req, res) => res.render("pedidos", { page: ""}))


//EMPRESA
//ALTERAÇÔES PRO JOMAR VER


route.get('/registrar-empresa', (req, res) => res.render("registrar-empresa", { page: ""}))
route.post('/registrar-empresa',EnterpriseController.create)

route.get('/inicio-empresa', (req, res) => res.render("inicio-empresa", { page: ""}))

route.get('/entrar-empresa', (req, res) => res.render("entrar-empresa", { page: ""}))
route.post('/entrar-empresa',EnterpriseController.login)

route.get('/perfil-empresa', (req, res) => res.render("perfil-empresa", { page: ""}))

//CARDAPIO EMPRESA
route.get('/cardapio/:id', (req, res) => res.render("cardapio", { page: ""}))


// POST COM A VARIAVEL DE ESTADO DO EJS /: PODE SER USADO PARA RECEBER DADOS E NÂO È OBRIGATÒRIO 
// TER UM DADO ALOCADO, SIMPLESMENTE È OPCIONAL ... LEMBRAR DISSO

module.exports = route