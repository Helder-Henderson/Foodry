const _axios = require("axios")

module.exports = {
  //ADD 
  //#region
  create(req, res) {

    const CPF = req.body.cpf
    const EMAIL = req.body.email
    const TELEFONE = req.body.phone
    const NOME = req.body.name

    const USER = {
      cpf: `${CPF}`,
      nome: `${NOME}`,
      email: `${EMAIL}`,
      telefone: `${TELEFONE}`
    }
    
    _axios.post("http://localhost:4000/cliente", USER).then(response => {

      res.redirect("inicio-cliente")
    }).catch(error => {
      console.log
      res.redirect("inicio-cliente")
    })
  },
  //#endregion

  //OPEN
  //#region

  async login(req, res) {

    const CPF = req.body.cpf

    const LISTA_CLIENTE = (await _axios.get("http://localhost:4000/cliente")).data
    const USER = LISTA_CLIENTE.find((c) => c.cpf == `${CPF}`)

    USER ? res.redirect(`menu-cliente/${USER._id}`) : res.redirect('../entrar-cliente')
  },

  async abrirPerfil(req, res) {

    const ID = req.params.id
    
    const LISTA_CLIENTE = (await _axios.get("http://localhost:4000/cliente")).data
    const USER = LISTA_CLIENTE.find((c) => c._id === `${ID}`)

    USER ? res.render("perfil-cliente", {
      USER
    }) : res.redirect('../entrar-cliente')

  },

  async abrirMenu(req, res) {

    const ID = req.params.id

    const LISTA_CLIENTE = (await _axios.get("http://localhost:4000/cliente")).data
    const USER = LISTA_CLIENTE.find((c) => c._id === `${ID}`)

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE[0]

    const LISTA_PRODUTO = (await _axios.get("http://localhost:4000/produto")).data
    const PRODUTO = LISTA_PRODUTO

    if (USER) {
      res.render("menu-cliente", {
        USER,
        RESTAURANTE,
        PRODUTO
      })
    } else {
      res.redirect('../entrar-cliente')
    }



  },
  //#endregion

  // DELETE OR UPDATE
  //#region
  async atualizarCliente(req, res) {

    const ID = req.params.id

    const LISTA_CLIENTE = (await _axios.get("http://localhost:4000/cliente")).data
    var USER = LISTA_CLIENTE.find((c) => c._id === `${ID}`)

    if (USER) {

      const nome = req.body.name
      const telefone = req.body.phone
      const email = req.body.email

      const attUser = {
        nome: `${nome}`,
        telefone: `${telefone}`,
        email: `${email}`,
      }

      await _axios.put(`http://localhost:4000/cliente/${user.cpf}`, attUser)
      res.redirect(`/perfil-cliente/${USER._id}`)
    } else {
      res.redirect("../inicio-cliente")
    }
  },

  async deletarUsuario(req, res) {

    const ID = req.params.id

    const LISTA_CLIENTE = (await _axios.get("http://localhost:4000/cliente")).data
    var USER = LISTA_CLIENTE.find((c) => c._id === `${ID}`)

    USER ? _axios.delete(`http://localhost:4000/cliente/${USER.cpf}`) : res.redirect("/inicio-cliente")

    res.redirect(`/inicio-cliente`)

  },
  //#endregion
}