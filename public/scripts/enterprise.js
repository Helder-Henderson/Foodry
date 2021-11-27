const categoriaArray = ['Hamburguer',"Bolo","Massas","Bebidas","Carnes","Prato Feito"]

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


function formatarMoeda() {
  var elemento = document.getElementById('valor');
  var valor = elemento.value;

  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  elemento.value = valor;
  if (valor == 'NaN') elemento.value = '';
}

function colocarId(id) {
  let element = document.getElementById("formAtt")
  let elementButton = document.getElementById("btnDel")

  console.log(id)

  elementButton.setAttribute("href",`/delProduto/${id}`)
  element.setAttribute("action",`/attProduto/${id}`)

}