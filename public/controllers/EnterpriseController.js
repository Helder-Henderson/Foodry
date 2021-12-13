const _axios = require("axios")

module.exports = {

  //ADD
  //#region
  create(req, res) {

    const CNPJ = req.body.cnpj
    const ENDERECO = req.body.adress
    const TELEFONE = req.body.phone
    const NOME_FANTASIA = req.body.name

    const ENTERPRISE = {
      cnpj: `${CNPJ}`,
      nomeFantasia: `${NOME_FANTASIA}`,
      endereco: `${ENDERECO}`,
      telefone: `${TELEFONE}`
    }

    _axios.post("http://localhost:4000/restaurante", ENTERPRISE).then(response => {

      res.redirect("inicio-empresa")

    }).catch(error => {

      res.redirect("registrar-empresa")
    })
  },

  async adicionarProduto(req, res) {

    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    if (RESTAURANTE) {
      const NOME = req.body.name.trim()
      const TEMPO = req.body.tempo
      const CATEGORIA = req.body.categoria
      const PRECO = req.body.preco
      const descricao = req.body.descricao.trim()

      const NOVO_PRODUTO = {
        nome: `${NOME}`,
        tempoPreparo: `${TEMPO}`,
        categoria: `${CATEGORIA}`,
        preco: `${PRECO}`,
        descricao: `${descricao}`,
      }


      _axios.post(`http://localhost:4000/produto`, NOVO_PRODUTO)
      res.redirect(`../cardapio/${RESTAURANTE._id}`)
    } else {
      res.redirect("registrar-empresa")
    }





  },

  //#endregion

  //PATCH
  //#region

  async atualizarEmpresa(req, res) {

    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    if (RESTAURANTE) {
      const NOME_FANTASIA = req.body.name
      const TELEFONE = req.body.phone
      const ENDERECO = req.body.adress

      const ATT_ENTERPRISE = {
        nomeFantasia: `${NOME_FANTASIA}`,
        endereco: `${ENDERECO}`,
        telefone: `${TELEFONE}`,
      }
      await _axios.put(`http://localhost:4000/restaurante/${RESTAURANTE.cnpj}`, ATT_ENTERPRISE)
      res.redirect(`/perfil-empresa/${RESTAURANTE._id}`)
    } else {
      res.redirect("../inicio-empresa")
    }

  },

  async atualizarProduto(req, res) {

    const ID_PRODUTO = req.params.idProduto
    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    if (RESTAURANTE) {

      const NOME = req.body.attNome
      const TEMPO = req.body.attTempo
      const CATEGORIA = req.body.attCategoria
      const PRECO = req.body.attPreco
      const DESCRICAO = req.body.attDescricao

      const ATT_PRODUTO = {
        nome: `${NOME}`,
        tempoPreparo: `${TEMPO}`,
        categoria: `${CATEGORIA}`,
        preco: `${PRECO}`,
        descricao: `${DESCRICAO}`,
      }
      await (_axios.put(`http://localhost:4000/produto/${ID_PRODUTO}`, ATT_PRODUTO))
      console.log("PRODUTO ATUALIZADO")
    }
    res.redirect(`/cardapio/${ID}`)
  },

  //#endregion

  //OPEN
  //#region
  async login(req, res) {

    const CNPJ = req.body.cnpj

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c.cnpj === `${CNPJ}`)

    RESTAURANTE ? res.redirect(`cardapio/${RESTAURANTE._id}`) : res.redirect("entrar-empresa")

  },

  async abrirPerfil(req, res) {

    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    RESTAURANTE ? res.render("perfil-empresa", {
      RESTAURANTE
    }) : res.redirect("../entrar-empresa")
  },

  async abrirCardapio(req, res) {

    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    const LISTA_PRODUTO = (await _axios.get("http://localhost:4000/produto")).data

    RESTAURANTE ? res.render("cardapio", {
      RESTAURANTE,
      LISTA_PRODUTO
    }) : res.redirect("../inicio-empresa")

  },
  //#endregion

  // DELETE
  //#region
  async deletarEmpresa(req, res) {

    const ID = req.params.id

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    if (RESTAURANTE) {
      _axios.delete(`http://localhost:4000/restaurante/${RESTAURANTE.cnpj}`)
      res.redirect("../inicio-empresa")
    } else {
      res.redirect(400, "../inicio-empresa")
    }
  },

  async deletarProduto(req, res) {

    const ID = req.params.id
    const ID_PRODUTO = req.params.idProduto

    const LISTA_RESTAURANTE = (await _axios.get("http://localhost:4000/restaurante")).data
    const RESTAURANTE = LISTA_RESTAURANTE.find((c) => c._id === `${ID}`)

    if (RESTAURANTE) {

      const LISTA_PRODUTO = (await _axios.get("http://localhost:4000/produto")).data
      const PRODUTO = LISTA_PRODUTO.find((c) => c._id === `${ID_PRODUTO}`)

      if (PRODUTO) {
        await _axios.delete(`http://localhost:4000/produto/${ID_PRODUTO}`)
      } else {
        res.redirect(400, "inicio-empresa")
      }
    }
    res.redirect(`/cardapio/${ID}`)
  },
  //#endregion

}