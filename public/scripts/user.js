function habilitar(id) {
  var status = document.getElementById(`${id}`).disabled;

  if (!status) {
    document.getElementById(`${id}`).disabled = true;
  } else {
    document.getElementById(`${id}`).disabled = false;
  }
}