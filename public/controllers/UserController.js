const axios = require("axios")

module.exports = {
  create(req, res) {

    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.phone
    const nome = req.body.name

    var user = {
      "cpf": `${cpf}`,
      "nome": `${nome}`,
      "email": `${email}`,
      "telefone": `${telefone}`
    }

    axios.post("http://localhost:4000/cliente", user).then(response => {

      console.log("Success ")

    }).catch(error =>
      console.log("Error")
    )

    res.redirect(200, "entrar-cliente")

  },

  async login(req, res) {

    const cpf = req.body.cpf

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = await dataGet.find((c) => c.cpf == `${cpf}`)

    if(info != undefined || null) {
      res.redirect('menu-cliente/'+ info._id);
    }
    else {
      res.redirect(400,'../entrar-cliente')
    }
  },
  
  async openPerfil(req,res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = await dataGet.find((c) => c._id === `${id}`)

    console.log(info)

    if(info != undefined || null ) {
      res.render("perfil-cliente",{info})
    }
    else {
      res.redirect(400,'../entrar-cliente')
    }
    
  },
  
  async atualizarPerfil(req,res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data

    const info = await dataGet.find((c) => c._id === `${id}`)

    axios.put("http://localhost:4000/cliente",info.cpf).then(response => {

  
    }).catch(error =>{

    })

  }
}