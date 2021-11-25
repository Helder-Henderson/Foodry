const axios = require("axios")

module.exports = {
  create(req, res) {

    const cnpj = req.body.cnpj
    const endereco = req.body.adress
    const telefone = req.body.phone
    const nomeFantasia = req.body.name

    var enterprise = {
      cnpj: `${cnpj}`,
      nomeFantasia: `${nomeFantasia}`,
      endereco: `${endereco}`,
      telefone: `${telefone}`
    }

    axios.post("http://localhost:4000/restaurante", enterprise).then(response => {

      console.log(enterprise)
      res.redirect(200, "entrar-empresa")

    }).catch(error => {

      console.log(error)
      res.redirect(400, "registrar-empresa")
    })
  },

  async login(req, res) {

    const cnpj = req.body.cnpj

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c.cnpj == `${cnpj}`)

    info ? res.redirect(`cardapio/${info._id}`) : res.redirect(400, "entrar-empresa")

  },

  async abrirPerfil(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? res.render("perfil-empresa", {
      info
    }) : res.redirect(400, "../entrar-empresa")


  },

  async abrirCardapio(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    const infoProduto = (await axios.get("http://localhost:4000/produto")).data

    info ? res.render("cardapio", {
      info , infoProduto
    }) : res.redirect(400, "../inicio-empresa")

  },

  async atualizarEmpresa(req, res) {

    const id = req.params.id

    const cnpj = req.body.cnpj
    const nomeFantasia = req.body.name
    const telefone = req.body.phone
    const endereco = req.body.adress

    const attEnterprise = {
      cnpj : `${cnpj}`,
      nomeFantasia : `${nomeFantasia}`,
      endereco: `${endereco}`,
      telefone: `${telefone}`,
    }

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    let info = dataGet.find((c) => c._id === `${id}`)

    info ? await axios.put(`http://localhost:4000/restaurante/${info.cnpj}`, attEnterprise) : res.redirect(400, "../inicio-empresa")

    info = dataGet.find((c) => c._id === `${id}`)

    res.redirect(`/perfil-empresa/${info._id}`)
    
  },

  async deletarEmpresa(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? axios.delete(`http://localhost:4000/restaurante/${info.cnpj}`) : res.redirect(400, "../inicio-empresa")

    res.redirect(200, "../inicio-empresa")

  },

  async adicionarProduto(req,res) {

    const id = req.params.id

    const nome = req.body.name
    const tempo = req.body.tempo
    const categoria = req.body.category
    const preco = req.body.preco
    const descricao = req.body.descricao

    const newProduto = {
      nome : `${nome}`,
      tempoPreparo : `${tempo}`,
      categoria : `${categoria}`,
      preco : `${preco}`,
      descricao : `${descricao}`,
    }

    
    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? axios.post(`http://localhost:4000/produto`,newProduto) : res.redirect(400,"registrar-empresa")

    res.redirect(`../cardapio/${info._id}`)

  },

  async atualizarProduto(req,res) {


  }

}