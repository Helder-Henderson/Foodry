const axios = require("axios")

module.exports = {
  async solicitacao(req, res) {

    const id = req.params.id

    const pedido = req.body.ckPrato
    let quantidade = req.body.qntPrato

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

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

        var newPedido = {
          nome: `${nomeCliente}`,
          tempoEstimado: `${tempoTotal}`,
          numeroPedido: `${random}`,
          totalPedido: `${valorTotal}`,
          cpf: `${info.cpf}`,
          produtos: objArrayPratos,
          status: false
        }

        console.log(newPedido)

        await axios.post('http://localhost:4000/pedido', newPedido)

        res.redirect(`../${id}`)

      } else {
        res.redirect(`../${id}`)
      }

    } else {
      res.redirect("../entrar-cliente")
    }
  },

  async abrirComanda(req, res) {

    const id = req.params.id

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    const dataGetPedido = (await axios.get("http://localhost:4000/pedido")).data
    const infoPedido = dataGetPedido.find((c) => c.cpf === `${info.cpf}`)

    if (infoPedido) {
      res.render("comanda", {
        infoPedido
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
      res.redirect(`/menu-restaurante/${id}`)
    }
  },

}