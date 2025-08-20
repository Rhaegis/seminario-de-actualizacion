class ApplicationUI {
    constructor(model) {
        this.model = model;
    }

    ocultarTodasSecciones() {
        document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
    }

    mostrarLogin() {
        this.ocultarTodasSecciones();
        document.getElementById("loginSection").style.display = "block";
    }

    volverAlMenu() {
        this.ocultarTodasSecciones();
        document.getElementById("mainMenu").style.display = "block";
    }

    volverAlMenuUsuario() {
        this.mostrarMenuUsuario(this.model.getUsuarioActivo(), this.model.getCategoriaActiva(), this.model.getPermisos());
    }

    mostrarMenuUsuario(usuario, categoria, permisos) {
        this.ocultarTodasSecciones();
        document.getElementById("usuarioActivo").textContent = `${usuario} (${categoria})`;
        document.getElementById("usuarioMenu").style.display = "block";
    }

    iniciarSesion() {
        const user = document.getElementById("loginUsuario").value.trim();
        const pass = document.getElementById("loginContrasena").value;
        const result = this.model.login(user, pass);
        if (result.success) {
            alert("Bienvenido " + user);
            this.mostrarMenuUsuario(user, result.categoria, this.model.getPermisos());
        } else alert(result.error);
    }

    listarArticulos() {
        const result = this.model.listarArticulos();
        if (result.then) { // IndexedDB devuelve promesa
            result.then(arts => this.renderArticulos(arts));
        } else {
            this.renderArticulos(result);
        }
    }

    renderArticulos(articulos) {
        this.ocultarTodasSecciones();
        let contenido = "<table border='1'><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";
        articulos.forEach(a => {
            contenido += `<tr><td>${a.id}</td><td>${a.nombre}</td><td>$${a.precio}</td><td>${a.stock}</td></tr>`;
        });
        contenido += "</table>";
        document.getElementById("listaArticulos").innerHTML = contenido;
        document.getElementById("listarArticulosSection").style.display = "block";
    }
}
