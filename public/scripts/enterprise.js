const categoriaArray = ["Hamburguer","Bolo","Massas","Bebidas","Carnes","Prato Feito","Pizza","Sushi","Oriental"]

// Populando Select da Modal de Adicionar Prato
const categoriaOption = document.getElementById("categoria")
for (i = 0; i < categoriaArray.length; i++) {
  var categoria = categoriaArray[i]
  categoria = categoria[0].toUpperCase() + categoria.substr(1);

  opcao = document.createElement('OPTION')

  opcao.setAttribute("value", `${categoriaArray[i].toLowerCase()}`)
  var description = document.createTextNode(`${categoria}`)
  opcao.appendChild(description)
  categoriaOption.appendChild(opcao)
}

// Populando Select da Modal de Atualização Prato
const categoriaOptionEdit = document.getElementById("attCategoria")
for (i = 0; i < categoriaArray.length; i++) {
  var categoria = categoriaArray[i]
  categoria = categoria[0].toUpperCase() + categoria.substr(1);

  opcao = document.createElement('OPTION')

  opcao.setAttribute("value", `${categoriaArray[i].toLowerCase()}`)
  var description = document.createTextNode(`${categoria}`)
  opcao.appendChild(description)
  categoriaOptionEdit.appendChild(opcao)
}

// Formata Modal - Adicionar Prato
function formatarMoeda() {
  var elemento = document.getElementById('valor');
  var valor = elemento.value;

  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  elemento.value = valor;
  if (valor == 'NaN') elemento.value = '';
}

// Formata Modal - Atualizar Prato
function attFormatarMoeda() {
  var elemento = document.getElementById('attValor');
  var valor = elemento.value;

  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  elemento.value = valor;
  if (valor == 'NaN') elemento.value = '';
}

//Referencia ID no Modal de Atualização - função (delete)
function PopularForm(idCliente,idPrato,nomePrato) {
  let element = document.getElementById("formAtt")
  let elementButton = document.getElementById("btnDel")
  let elementoNome = document.getElementById("attNome")

  elementButton.setAttribute("href",`/delProduto/${idCliente}/${idPrato}`)
  element.setAttribute("action",`/attProduto/${idCliente}/${idPrato}`)
  elementoNome.setAttribute("value",`${nomePrato}`)
}