const UserController = require('./public/controllers/UserController')
const EnterpriseController = require('./public/controllers/EnterpriseController')
const PedidoController = require('./public/controllers/PedidoController')

const EXPRESS = require('express')

const ROUTE = EXPRESS.Router()

ROUTE.get('/', (req, res) => res.render("index"))

//CLIENTE 
//#region

// INDEX CLIENTE
ROUTE.get('/inicio-cliente', (req, res) => res.render("inicio-cliente"))

// PARTE REGISTRO DO CLIENTE
ROUTE.get('/registrar-cliente',(req,res) => res.render("registrar-cliente"))
ROUTE.post("/registrar-cliente", UserController.create);
 
//PARTE LOGIN CLIENTE
ROUTE.get('/entrar-cliente', (req, res) => res.render("entrar-cliente"))
ROUTE.post('/entrar-cliente',UserController.login)

/* PARTE DO PERFIL CLIENTE */
ROUTE.get('/perfil-cliente/:id', UserController.abrirPerfil)
ROUTE.post('/att/:id', UserController.atualizarCliente)
ROUTE.get('/del/:id',UserController.deletarUsuario)

ROUTE.get('/menu-cliente/:id',UserController.abrirMenu)
ROUTE.post('/menu-cliente/:id/pedidoCliente',PedidoController.solicitacao)

//PARTE DA COMANDA 
ROUTE.get('/comanda/:id',PedidoController.abrirComanda)
ROUTE.get('/cancelarPedido/:id/:idPedido',PedidoController.cancelarPedido)
ROUTE.get('/detalhes', (req, res) => res.render("detalhes", { page: ""}))
ROUTE.get('/nota-fiscal/:id/:valor', PedidoController.abrirNota)
//#endregion

//EMPRESA
//#region
// INDEX EMPRESA 
ROUTE.get('/inicio-empresa', (req,res) => res.render("inicio-empresa", { page: ""}))

// PARTE DE REGISTRAR A EMPRESA
ROUTE.get('/registrar-empresa', (req,res) => res.render("registrar-empresa", { page: ""}))
ROUTE.post('/registrar-empresa',EnterpriseController.create)

// PARTE DE LOGIN DA EMPRESA 
ROUTE.get('/entrar-empresa', (req,res) => res.render("entrar-empresa", { page: ""}))
ROUTE.post('/entrar-empresa',EnterpriseController.login)

// PARTE DO PERFIL DA EMPRESA
ROUTE.get('/perfil-empresa/:id',EnterpriseController.abrirPerfil)
ROUTE.get('/del-empresa/:id',EnterpriseController.deletarEmpresa)
ROUTE.post('/attEmpresa/:id', EnterpriseController.atualizarEmpresa)

// PARTE DOS PRODUTOS
ROUTE.get('/delProduto/:id/:idProduto',EnterpriseController.deletarProduto)
ROUTE.post('/addProduto/:id',EnterpriseController.adicionarProduto)
ROUTE.post('/attProduto/:id/:idProduto',EnterpriseController.atualizarProduto)
ROUTE.get('/cardapio/:id',EnterpriseController.abrirCardapio)

//PARTE PEDIDO 
ROUTE.get("/pedidos/:id",PedidoController.abrirPedidos)
ROUTE.get("/historico/:id",PedidoController.abrirHistorico)
ROUTE.get("/excluir-pedido/:id/:idPedido",PedidoController.excluirPedido)
ROUTE.get("/successo-pedido/:id/:idPedido",PedidoController.sucessoPedido)
//#endregion

module.exports = ROUTE