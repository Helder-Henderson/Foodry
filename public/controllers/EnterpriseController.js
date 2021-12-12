const axios = require("axios")

module.exports = {

  //ADD
  //#region
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

      res.redirect("inicio-empresa")

    }).catch(error => {

      res.redirect("registrar-empresa")
    })
  },

  async adicionarProduto(req, res) {

    const nome = req.body.name.trim()
    const tempo = req.body.tempo
    const categoria = req.body.category
    var preco = req.body.preco
    const descricao = req.body.descricao.trim()

    const newProduto = {
      nome: `${nome}`,
      tempoPreparo: `${tempo}`,
      categoria: `${categoria}`,
      preco: `${preco}`,
      descricao: `${descricao}`,
    }

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? axios.post(`http://localhost:4000/produto`, newProduto) : res.redirect("registrar-empresa")

    res.redirect(`../cardapio/${info._id}`)

  },

  //#endregion

  //PATCH
  //#region

  async atualizarEmpresa(req, res) {

    const id = req.params.id

    const cnpj = req.body.cnpj
    const nomeFantasia = req.body.name
    const telefone = req.body.phone
    const endereco = req.body.adress

    const attEnterprise = {
      cnpj: `${cnpj}`,
      nomeFantasia: `${nomeFantasia}`,
      endereco: `${endereco}`,
      telefone: `${telefone}`,
    }

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    let info = dataGet.find((c) => c._id === `${id}`)

    info ? await axios.put(`http://localhost:4000/restaurante/${info.cnpj}`, attEnterprise) : res.redirect("../inicio-empresa")

    info = dataGet.find((c) => c._id === `${id}`)

    res.redirect(`/perfil-empresa/${info._id}`)

  },

  async atualizarProduto(req, res) {

    const nome = req.body.attNome
    const tempo = req.body.attTempo
    const categoria = req.body.attCategoria
    const preco = req.body.attPreco
    const descricao = req.body.attDescricao

    const attProduto = {
      nome: `${nome}`,
      tempoPreparo: `${tempo}`,
      categoria: `${categoria}`,
      preco: `${preco}`,
      descricao: `${descricao}`,
    }

    const id = req.params.id
    const idProduto = req.params.idProduto

    await axios.put(`http://localhost:4000/produto/${idProduto}`, attProduto)

    res.redirect(`../../cardapio/${id}`)

  },

  //#endregion

  //OPEN
  //#region
  async login(req, res) {

    const cnpj = req.body.cnpj

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c.cnpj == `${cnpj}`)

    info ? res.redirect(`cardapio/${info._id}`) : res.redirect("entrar-empresa")

  },

  async abrirPerfil(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? res.render("perfil-empresa", {
      info
    }) : res.redirect("../entrar-empresa")


  },

  async abrirCardapio(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    const infoProduto = (await axios.get("http://localhost:4000/produto")).data

    info ? res.render("cardapio", {
      info,
      infoProduto
    }) : res.redirect("../inicio-empresa")

  },
  //#endregion

  // DELETE
  //#region
  async deletarEmpresa(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data

    const info = dataGet.find((c) => c._id === `${id}`)

    info ? axios.delete(`http://localhost:4000/restaurante/${info.cnpj}`) : res.redirect(400, "../inicio-empresa")

    res.redirect("../inicio-empresa")

  },
  async deletarProduto(req, res) {

    const id = req.params.id
    const idProduto = req.params.idProduto

    const dataGet = (await axios.get("http://localhost:4000/produto")).data

    const info = dataGet.find((c) => c._id === `${idProduto}`)

    info ? await axios.delete(`http://localhost:4000/produto/${idProduto}`) : res.redirect("inicio-empresa")

    res.redirect(`../../cardapio/${id}`)
  },
  //#endregion

}