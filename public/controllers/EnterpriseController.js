const axios = require("axios")

module.exports = {
  create(req, res) {

    const cnpj = req.body.cnpj
    const endereco = req.body.adress
    const telefone = req.body.phone
    const nomeFantasia = req.body.name

    var enterprise = {
      "cnpj": `${cnpj}`,
      "nomeFantasia": `${nomeFantasia}`,
      "endereco": `${endereco}`,
      "telefone": `${telefone}`
    }

    axios.post("http://localhost:4000/restaurante", enterprise).then(response => {
      console.log("Success")

    }).catch(error =>
      console.log("Error")
    )

    location.href
    
    res.redirect(200, "inicio-empresa")
  },

  async login(req,res) {

    const cnpj = req.body.cnpj

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c.cnpj == `${cnpj}`)

    res.redirect('cardapio/'+ info._id);

  }
}