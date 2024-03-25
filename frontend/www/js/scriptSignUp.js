function registrarUsuario(){
    var nombre=document.getElementById('campoNombre').value;
    var cedula=document.getElementById('campoCedula').value;
    var email=document.getElementById('campoEmail').value;
    var departamento=document.getElementById('campoDepartamento').value;
    var telefono=document.getElementById('campoTelefono').value;
    var password=document.getElementById('campoPassword').value;

    alert(
        "Nombre: " + nombre + "\nCédula: " + cedula + "\nEmail: " + email + "\nDepartamento: " + departamento + "\nTeléfono: " + telefono + "\nContraseña: " + password
    )

    //Hacer el fetch para crear usuario

}