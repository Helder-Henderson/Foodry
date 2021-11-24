const UserController = require('./public/controllers/UserController')
const EnterpriseController = require('./public/controllers/EnterpriseController')

const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render("index"))
route.get('/inicio-cliente', (req, res) => res.render("inicio-cliente"))

/* REGISTRAR-CLIENTE (GET_POST) */
route.get('/registrar-cliente',(req,res) => res.render("registrar-cliente"))
route.post("/registrar-cliente", UserController.create);
 
route.get('/entrar-cliente', (req, res) => res.render("entrar-cliente"))
route.post('/entrar-cliente',UserController.login)


route.get('/perfil-cliente/:id', UserController.abrirPerfil)
route.post('/att/:id', UserController.atualizarCliente)
route.get('/del/:id',UserController.deletarUsuario)


route.get('/menu-cliente/:id',UserController.abrirMenu)
route.get('/menu-cliente/:id/detalhes',(req,res) => res.render("detalhes"))

route.get('/detalhes', (req, res) => res.render("detalhes", { page: ""}))

route.get('/nota-fiscal', (req, res) => res.render("nota-fiscal", { page: ""}))

route.get('/comanda/:id', (req, res) => res.render("comanda", { page: ""}))

route.get('/pedidos', (req, res) => res.render("pedidos", { page: ""}))


//EMPRESA
//ALTERAÇÔES PRO JOMAR VER


// MASTER (ORIGINAL)

route.get('/registrar-empresa', (req, res) => res.render("registrar-empresa", { page: ""}))
route.post('/registrar-empresa',EnterpriseController.create)

route.get('/inicio-empresa', (req, res) => res.render("inicio-empresa", { page: ""}))

route.get('/entrar-empresa', (req, res) => res.render("entrar-empresa", { page: ""}))
route.post('/entrar-empresa',EnterpriseController.login)

route.get('/perfil-empresa/:id',EnterpriseController.abrirPerfil)

route.post('/attEmpresa/:id', EnterpriseController.atualizarEmpresa)

route.get('/del-empresa/:id',EnterpriseController.deletarEmpresa)

//CARDAPIO EMPRESA
route.get('/cardapio/:id',EnterpriseController.abrirCardapio)

module.exports = route