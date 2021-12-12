const axios = require("axios")

module.exports = {
  //ADD
  //#region
  async solicitacao(req, res) {

    const id = req.params.id

    const pedido = req.body.ckPrato
    let quantidade = req.body.qntPrato

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    // const dataGetPedido = (await axios.get("http://localhost:4000/pedido")).data
    // const infoPedido

    const nomeCliente = info.nome

    const dataGetProduto = (await axios.get("http://localhost:4000/produto")).data

    const random = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

    // ESCOPO DAS VARIAVEIS
    //#region 
    let pedido_prato = {
      id: null,
      quantidade: null
    }

    let tempoTotal = 0;

    let valorTotal = 0.0;

    var objArrayPratos = []
    //#endregion

    if (info) {
      if (pedido) {

        if (typeof pedido === 'string') {

          if (quantidade[0] == '0' && quantidade.length != 1) {
            quantidade = quantidade.substring(1)
          }

          if (quantidade == '0') {
            pedido_prato = {
              id: `${pedido}`,
              quantidade: `1`
            }

            let infoProduto = dataGetProduto.find((c) => c._id === `${pedido}`)

            tempoTotal = infoProduto.tempoPreparo

            precoPrato = infoProduto.preco
            precoPrato = precoPrato.replace(',', '.')
            valorTotal = precoPrato

            objArrayPratos.push(pedido_prato)

          } else {
            pedido_prato = {
              id: `${pedido}`,
              quantidade: `${quantidade}`
            }

            let infoProduto = dataGetProduto.find((c) => c._id === `${pedido}`)

            precoPrato = infoProduto.preco
            precoPrato = precoPrato.replace(',', '.')
            valorTotal = precoPrato * quantidade

            valorTotal = valorTotal.toFixed(2)

            tempoTotal = Number.parseInt(infoProduto.tempoPreparo) * Number.parseInt(quantidade)

            objArrayPratos.push(pedido_prato)
          }

        } else {
          for (let i = 0; pedido.length > i; i++) {

            if (quantidade[i] == '0' || quantidade[i] == '00') {
              quantidade[i] = 1
            }

            if (quantidade[i][0] == '0') {
              quantidade[i] = quantidade[i].substring(1)
            }

            pedido_prato = {
              id: `${pedido[i]}`,
              quantidade: `${quantidade[i]}`
            }

            const infoProduto = dataGetProduto.find((c) => c._id === `${pedido[i]}`)

            precoPrato = infoProduto.preco

            precoPrato = precoPrato.replace(',', '.')

            valorTotal += precoPrato * Number.parseInt(quantidade[i])

            let tempoEstimado = Number.parseInt(infoProduto.tempoPreparo) * Number.parseInt(quantidade[i])
            tempoTotal += tempoEstimado;

            objArrayPratos.push(pedido_prato)

          }
          valorTotal = valorTotal.toFixed(2)
        }

        valorTotal = valorTotal.replace('.', ',')

        var tempo = new Date()
        tempo = tempo.toLocaleTimeString()

        var newPedido = {
          nome: `${nomeCliente}`,
          tempoEstimado: `${tempoTotal}`,
          numeroPedido: `${random}`,
          totalPedido: `${valorTotal}`,
          cpf: `${info.cpf}`,
          produtos: objArrayPratos,
          status: false,
          tempo: tempo
        }

        await axios.post('http://localhost:4000/pedido', newPedido)

        res.redirect(`../${id}`)

      } else {
        res.redirect(`../${id}`)
      }

    } else {
      res.redirect("../entrar-cliente")
    }
  },

  //#endregion

  //OPEN
  //#region

  async abrirComanda(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const dataGetPedido = (await axios.get("http://localhost:4000/pedido")).data
    const infoPedido = dataGetPedido.filter((c) => c.cpf === `${info.cpf}` && c.status != true)

    const dataGetProduto = (await axios.get("http://localhost:4000/produto")).data
    const produto = dataGetProduto

    let valorTotal = 0.0;

    for (var i = 0; i < infoPedido.length; i++) {
      var valor = parseFloat(infoPedido[i].totalPedido.replace(',', '.'))
      valorTotal += valor
    }

    valorTotal = valorTotal.toString().replace('.', ',')

    if (infoPedido) {
      res.render("comanda", {
        infoPedido,
        info,
        produto,
        valorTotal
      })
    } else {
      res.redirect(`/menu-cliente/${id}`)
    }
  },

  async abrirPedidos(req, res) {
    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const infoPedido = (await axios.get("http://localhost:4000/pedido")).data

    const infoProduto = (await axios.get("http://localhost:4000/produto")).data

    if (infoPedido) {
      res.render("pedidos", {
        infoPedido,
        info,
        infoProduto
      })
    } else {
      res.redirect(`/`)
    }
  },

  async abrirHistorico(req, res) {
    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const infoPedido = (await axios.get("http://localhost:4000/pedido")).data

    const infoProduto = (await axios.get("http://localhost:4000/produto")).data

    if (info) {
      res.render("historico-pedido", {
        infoPedido,
        info,
        infoProduto
      })
    } else {
      res.redirect(`/`)
    }
  },
  //#endregion

  //UPDATE OR DELETE
  //#region

  //RESTAURANTE
  async excluirPedido(req, res) {
    const id = req.params.id
    const idPedido = req.params.idPedido

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const infoPedido = (await axios.get("http://localhost:4000/pedido")).data
    const pedido = infoPedido.find((c) => c._id === `${idPedido}`)

    if (pedido) {
      axios.delete(`http://localhost:4000/pedido/${idPedido}`)
    }

    if (info) {
      res.redirect(`/pedidos/${id}`)
    } else {
      res.redirect(`/`)
    }
  },

  async sucessoPedido(req, res) {
    const id = req.params.id
    const idPedido = req.params.idPedido

    const dataGet = (await axios.get("http://localhost:4000/restaurante")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const infoPedido = (await axios.get("http://localhost:4000/pedido")).data
    const pedido = infoPedido.find((c) => c._id === `${idPedido}`)

    if (pedido) {
      pedido.status = true
      axios.put(`http://localhost:4000/pedido/${pedido._id}`, pedido)
    }

    if (info) {
      res.redirect(`/pedidos/${id}`)
    } else {
      res.redirect(`/`)
    }
  },

  //CLIENTE
  async cancelarPedido(req, res) {
    const id = req.params.id
    const idPedido = req.params.idPedido

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const dataGetPedido = (await axios.get("http://localhost:4000/pedido")).data
    var infoPedido = dataGetPedido.filter((c) => c.cpf === `${info.cpf}` && c.status != true)

    var pedido = infoPedido.find((c) => c._id === `${idPedido}`)

    if (pedido) {
      var tempoPedido = pedido.tempo
      var data = new Date()

      var arrTempoPedido = tempoPedido.split(':')
      var horaPedidoSeg = parseInt(arrTempoPedido[0]) * 60 * 60
      var minutoPedidoSeg = parseInt(arrTempoPedido[1]) * 60
      var segundosPedido = parseInt(arrTempoPedido[2])

      var horaAtualSeg = data.getHours() * 60 * 60; // 0-23
      var minutoAtualSeg = data.getMinutes() * 60; // 0-59
      var segundosAtual = data.getSeconds(); // 0-59 

      var tempoAtualSeg = horaAtualSeg + minutoAtualSeg + segundosAtual
      var tempoPedidoSeg = horaPedidoSeg + minutoPedidoSeg + segundosPedido

      var variacaoTempo = tempoAtualSeg - tempoPedidoSeg

      if (variacaoTempo < 300) {
        res.redirect(`/comanda/${id}`)
        axios.delete(`http://localhost:4000/pedido/${idPedido}`)
      } else {
        res.redirect(`/comanda/${idPedido}`)  
      }
    } else {
      
    }
  }
  //#endregion

}