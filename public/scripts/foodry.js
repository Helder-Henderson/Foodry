//#region Mascaras
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execMascara()", 1)
}
function execMascara() {
    v_obj.value = v_fun(v_obj.value)
}
function getByClass(el) {
    return document.getElementsByClassName(el);
}

//window.onload = function () {

var elementsTel = getByClass('telefone');
for (n = 0; n < elementsTel.length; n++) {
    elementsTel[n].onkeydown = function () {
        mascara(this, mascaraTelefone);
    }
    elementsTel[n].onchange = function () {
        mascara(this, mascaraTelefone);
    }
}

function mascaraInteiro(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que n�o � d�gito
    return v;
}

function mascaraTelefone(v) {
    v = mascaraInteiro(v)
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca par�nteses em volta dos dois primeiros d�gitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca h�fen entre o quarto e o quinto d�gitos
    return v;
}

function mascaraCnpj(v) {
    v = mascaraInteiro(v)
    v = v.replace(/^(\d{2})(\d)/, "$1.$2"); //Coloca ponto entre o segundo e o terceiro d�gitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto d�gitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2"); //Coloca uma barra entre o oitavo e o nono d�gitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um h�fen depois do bloco de quatro d�gitos
    return v;
}

function mascaraCpf(v) {
    v = mascaraInteiro(v)
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca ponto entre o terceiro e o quarto d�gitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca ponto entre o sexto e o s�timo d�gitos
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um h�fen antes dos dois �ltimos d�gitos
    return v;
}
//#endregion

//#region Valida��es
function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJ's inválidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validarCPF(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}
//#endregion

var elementsCnpj = getByClass('cnpj');
for (n = 0; n < elementsCnpj.length; n++) {
    elementsCnpj[n].onkeydown = function () {
        mascara(this, mascaraCnpj);
    }
    elementsCnpj[n].onchange = function () {
        mascara(this, mascaraCnpj);
        validarCNPJ(this.value); //*Adicionar Push.
    }
}

var elementsCnpj = getByClass('cnpj');
for (n = 0; n < elementsCnpj.length; n++) {
    elementsCnpj[n].onkeydown = function () {
        mascara(this, mascaraCnpj);
    }
    elementsCnpj[n].onchange = function () {
        mascara(this, mascaraCnpj);
        validarCNPJ(this.value); //*Adicionar Push.
    }
}

var elementsCpf = getByClass('cpf');
for (n = 0; n < elementsCpf.length; n++) {
    elementsCpf[n].onkeydown = function () {
        mascara(this, mascaraCpf);
    }
    elementsCpf[n].onchange = function () {
        mascara(this, mascaraCpf);
        validarCPF(this.value); //*Adicionar Push.
    }
}

var elementsInt = getByClass('inteiro');
for (n = 0; n < elementsInt.length; n++) {
    elementsInt[n].onkeydown = function () {
        mascara(this, mascaraInteiro);
    }
    elementsInt[n].onchange = function () {
        mascara(this, mascaraInteiro);
    }
}
//}
