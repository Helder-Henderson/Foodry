const axios = require("axios")

module.exports = {
  create(req, res) {

    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.phone
    const nome = req.body.name

    var user = {
      cpf: `${cpf}`,
      nome: `${nome}`,
      email: `${email}`,
      telefone: `${telefone}`
    }

    axios.post("http://localhost:4000/cliente", user).then(response => {

      console.log(user)
      res.redirect("inicio-cliente")
    }).catch(error => {
      console.log(error)
      res.redirect("inicio-cliente")
    })
  },

  async login(req, res) {

    const cpf = req.body.cpf

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = dataGet.find((c) => c.cpf == `${cpf}`)

    info ? res.redirect(`menu-cliente/${info._id}`) : res.redirect('../entrar-cliente')

  },

  async abrirPerfil(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? res.render("perfil-cliente", {
      info
    }) : res.redirect('../entrar-cliente')

  },

  async abrirMenu(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const restauranteGet = (await axios.get("http://localhost:4000/restaurante")).data
    const restaurante = restauranteGet[0]


    const produtoGet = (await axios.get("http://localhost:4000/produto")).data
    const produto = produtoGet 

    info ? res.render("menu-cliente", {
      info,restaurante,produto
    }) : res.redirect('../entrar-cliente')

  },

  async atualizarCliente(req, res) {

    const id = req.params.id

    const cpf = req.body.cpf
    const nome = req.body.name
    const telefone = req.body.phone
    const email = req.body.email

    const attUser = {
      cpf: `${cpf}`,
      nome: `${nome}`,
      telefone: `${telefone}`,
      email: `${email}`,
    }

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    var info = dataGet.find((c) => c._id === `${id}`)

    info ? await axios.put(`http://localhost:4000/cliente/${info.cpf}`, attUser) : res.redirect("../inicio-cliente")

    info = dataGet.find((c) => c._id === `${id}`)

    info ? res.redirect(`/perfil-cliente/${info._id}`) : res.redirect("../inicio-cliente")


  },

  async deletarUsuario(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? axios.delete(`http://localhost:4000/cliente/${info.cpf}`) : res.redirect("../entrar-cliente")

    console.log('Success')

    res.redirect("../inicio-cliente")

  }
}