const axios = require("axios")

module.exports = {
  async solicitacao(req, res) {

    const id = req.params.id

    const pedido = req.body.ckPrato
    const quantidade = req.body.qntPrato

    const dataGet = (await axios.get("http://localhost:4000/cliente")).data
    const info = dataGet.find((c) => c._id === `${id}`)

    //APRENDER A MEXER COM VALORES FORMATADOS
    const dataGetProduto = (await axios.get("http://localhost:4000/produto")).data

    const random = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;


    // ESCOPO DAS VARIAVEIS

    let pedido_prato = {
      id: null,
      quantidade: null
    }

    let tempoEstimado = 1;

    let tempoTotal = 0;

    var objArrayPratos = []


    if (info) {
      if (pedido) {

        if (typeof pedido === 'string') {

          if (quantidade == '0' || quantidade == '00') {
            pedido_prato = {
              id: `${pedido}`,
              quantidade: `1`
            }

            infoProduto = dataGetProduto.find((c) => {
              c._id === `${pedido}`
            })
            tempoTotal = infoProduto.tempoPreparo

            objArrayPratos.push(pedido_prato)

          } else {
            pedido_prato = {
              id: `${pedido}`,
              quantidade: `${quantidade}`
            }

            const infoProduto = dataGetProduto.find((c) => c._id === `${pedido}`)

            tempoTotal = Number.parseInt(infoProduto.tempoPreparo) * quantidade

            objArrayPratos.push(pedido_prato)
          }

        } else {
          for (let i = 0; pedido.length > i; i++) {

            pedido_prato = {
              id: `${pedido[i]}`,
              quantidade: `${quantidade[i]}`
            }

            const infoProduto = dataGetProduto.find((c) => c._id === `${pedido[i]}`)

            tempoEstimado = Number.parseInt(infoProduto.tempoPreparo) * Number.parseInt(quantidade[i])

            tempoTotal += tempoEstimado;

            objArrayPratos.push(pedido_prato)

          }
        }

        var newPedido = {
          tempoEstimado: `${tempoTotal}`,
          numeroPedido: `${random}`,
          totalPedido: `100`,
          cpf: `${info.cpf}`,
          produtos: objArrayPratos
        }

        console.log(newPedido)

        await axios.post('http://localhost:4000/pedido', newPedido)

        res.redirect(200, `../${id}`)

      } else {
        res.redirect(`../${id}`)
      }

    } else {
      res.redirect(400, "../entrar-cliente")
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
}