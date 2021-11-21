const axios = require("axios")
const { request } = require("express")

module.exports = {
  create(req, res) {

    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.phone
    const senha = "123"
    const nome = req.body.name

    var user = {
      "cpf": `${cpf}`,
      "nome": `${nome}`,
      "email": `${email}`,
      "senha": `${senha}`,
      "telefone": `${telefone}`
    }

    axios.post("http://localhost:4000/cliente", user).then(response => {

      console.log("Successs")

    }).catch(error =>
      console.log("Error")
    )

    res.redirect(200, "inicio-cliente")

  },

  async login(req, res) {

    const cpf = req.body.cpf

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = await dataGet.find((c) => c.cpf === `${cpf}`)

    res.redirect('menu-cliente/'+ info._id,200);

  },

  async openPerfil(req,res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = await dataGet.find((c) => c._id === `${id}`)

    console.log(info)

    res.render("perfil-cliente",{info})

  }
}