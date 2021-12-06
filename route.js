const UserController = require('./public/controllers/UserController')
const EnterpriseController = require('./public/controllers/EnterpriseController')
const PedidoController = require('./public/controllers/PedidoController')

const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render("index"))

//CLIENTE 
//#region

// INDEX CLIENTE
route.get('/inicio-cliente', (req, res) => res.render("inicio-cliente"))

// PARTE REGISTRO DO CLIENTE
route.get('/registrar-cliente',(req,res) => res.render("registrar-cliente"))
route.post("/registrar-cliente", UserController.create);
 
//PARTE LOGIN CLIENTE
route.get('/entrar-cliente', (req, res) => res.render("entrar-cliente"))
route.post('/entrar-cliente',UserController.login)

/* PARTE DO PERFIL CLIENTE */
route.get('/perfil-cliente/:id', UserController.abrirPerfil)
route.post('/att/:id', UserController.atualizarCliente)
route.get('/del/:id',UserController.deletarUsuario)

route.get('/menu-cliente/:id',UserController.abrirMenu)
//route.get('/menu-cliente/:id/detalhes',(req,res) => res.render("detalhes"))
route.post('/menu-cliente/:id/pedidoCliente',PedidoController.solicitacao)

//PARTE DA COMANDA 
route.get('/comanda/:id',PedidoController.abrirComanda)
route.get('/detalhes', (req, res) => res.render("detalhes", { page: ""}))
route.get('/nota-fiscal', (req, res) => res.render("nota-fiscal", { page: ""}))
//#endregion

//EMPRESA
//#region
// INDEX EMPRESA 
route.get('/inicio-empresa', (req,res) => res.render("inicio-empresa", { page: ""}))

// PARTE DE REGISTRAR A EMPRESA
route.get('/registrar-empresa', (req,res) => res.render("registrar-empresa", { page: ""}))
route.post('/registrar-empresa',EnterpriseController.create)

// PARTE DE LOGIN DA EMPRESA 
route.get('/entrar-empresa', (req,res) => res.render("entrar-empresa", { page: ""}))
route.post('/entrar-empresa',EnterpriseController.login)

// PARTE DO PERFIL DA EMPRESA
route.get('/perfil-empresa/:id',EnterpriseController.abrirPerfil)
route.get('/del-empresa/:id',EnterpriseController.deletarEmpresa)
route.post('/attEmpresa/:id', EnterpriseController.atualizarEmpresa)

// PARTE DOS PRODUTOS
route.get('/delProduto/:id/:idProduto',EnterpriseController.deletarProduto)
route.post('/addProduto/:id',EnterpriseController.adicionarProduto)
route.post('/attProduto/:id/:idProduto',EnterpriseController.atualizarProduto)
route.get('/cardapio/:id',EnterpriseController.abrirCardapio)

//PARTE PEDIDO 
route.get("/pedidos/:id",PedidoController.abrirPedidos)
//#endregion

module.exports = route