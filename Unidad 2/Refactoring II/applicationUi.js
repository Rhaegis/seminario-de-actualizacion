class ApplicationUI {
    constructor(model) {
        this.model = model;
        this.articuloEditando = null;
    }

    ocultarTodasSecciones() {
        document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
    }

    // Navegación
    mostrarLogin() {
        this.ocultarTodasSecciones();
        document.getElementById("loginSection").style.display = "block";
    }

    mostrarRegistro() {
        this.ocultarTodasSecciones();
        document.getElementById("registroSection").style.display = "block";
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

        const botonesAcciones = {
            "1. Listar artículos": "listar",
            "2. Nuevo artículo": "agregar",
            "3. Editar artículo": "editar",
            "4. Eliminar artículo": "eliminar",
            "5. Comprar articulo": "comprar",
            "Cambiar contraseña": "cambiar_contrasena"
        };

        const botones = document.querySelectorAll("#usuarioMenu button");
        botones.forEach(btn => {
            const accion = botonesAcciones[btn.textContent.trim()];
            if (accion && !permisos.includes(accion)) {
                btn.style.display = "none";
            } else {
                btn.style.display = "inline-block";
            }
        });

        document.getElementById("btnCrearCuentaAdmin").style.display = categoria === "Administrador" ? "inline-block" : "none";
    }

    alerta(msg) { alert(msg); }
    confirmar(msg) { return confirm(msg); }

    // Sesión
    iniciarSesion() {
        const user = document.getElementById("loginUsuario").value.trim();
        const pass = document.getElementById("loginContrasena").value;
        const result = this.model.login(user, pass);
        if (result.success) {
            this.alerta(`¡Bienvenido/a ${user}!`);
            this.mostrarMenuUsuario(user, result.categoria, this.model.getPermisos());
        } else this.alerta(result.error);
    }

    cerrarSesion() {
        this.model.logout();
        this.alerta("Sesión cerrada.");
        this.volverAlMenu();
    }

    crearCuenta() {
        const user = document.getElementById("nuevoUsuario").value.trim();
        const pass = document.getElementById("nuevaContrasena").value;
        const categoria = prompt("Ingrese categoría: Administrador / Cliente / Vendedor / Trabajador de depósito");
        const result = this.model.crearCuenta(user, pass, categoria);
        if (result.success) {
            this.alerta("Cuenta creada con éxito.");
            this.volverAlMenuUsuario();
        } else this.alerta(result.error);
    }

    mostrarCambioContrasena() {
        this.ocultarTodasSecciones();
        document.getElementById("cambiarContrasenaSection").style.display = "block";
    }

    cambiarContrasena() {
        const actual = document.getElementById("contrasenaActual").value;
        const nueva = document.getElementById("nuevaContrasenaCambio").value;
        const result = this.model.cambiarContrasena(actual, nueva);
        if (result.success) {
            this.alerta("Contraseña cambiada con éxito.");
            this.volverAlMenuUsuario();
        } else this.alerta(result.error);
    }

    // Artículos
    listarArticulos() {
        const articulos = this.model.listarArticulos();
        this.ocultarTodasSecciones();
        let contenido = "<table border='1'><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";
        articulos.forEach(a => {
            contenido += `<tr><td>${a.id}</td><td>${a.nombre}</td><td>$${a.precio.toFixed(2)}</td><td>${a.stock}</td></tr>`;
        });
        contenido += "</table>";
        document.getElementById("listaArticulos").innerHTML = contenido;
        document.getElementById("listarArticulosSection").style.display = "block";
    }

    mostrarNuevoArticulo() {
        this.ocultarTodasSecciones();
        document.getElementById("nuevoArticuloSection").style.display = "block";
    }

    agregarArticulo() {
        const id = Number(document.getElementById("nuevoId").value);
        const nombre = document.getElementById("nuevoNombre").value.trim();
        const precio = Number(document.getElementById("nuevoPrecio").value);
        const stock = Number(document.getElementById("nuevoStock").value);
        const result = this.model.agregarArticulo(id, nombre, precio, stock);
        if (result.success) {
            this.alerta("Artículo agregado correctamente.");
            this.volverAlMenuUsuario();
        } else this.alerta(result.error);
    }

    mostrarEditarArticulo() {
        this.ocultarTodasSecciones();
        document.getElementById("editarArticuloSection").style.display = "block";
        document.getElementById("formEditarArticulo").style.display = "none";
        this.articuloEditando = null;
    }

    buscarArticuloParaEditar() {
        const id = Number(document.getElementById("editarIdBuscado").value);
        const articulo = this.model.listarArticulos().find(a => a.id === id);
        if (!articulo) return this.alerta("No se encontró artículo con ese Id.");
        this.articuloEditando = articulo;
        document.getElementById("editarNombre").value = articulo.nombre;
        document.getElementById("editarPrecio").value = articulo.precio;
        document.getElementById("editarStock").value = articulo.stock;
        document.getElementById("formEditarArticulo").style.display = "block";
    }

    guardarArticuloEditado() {
        if (!this.articuloEditando) return;
        const nombre = document.getElementById("editarNombre").value.trim();
        const precio = Number(document.getElementById("editarPrecio").value);
        const stock = Number(document.getElementById("editarStock").value);
        const result = this.model.editarArticulo(this.articuloEditando.id, nombre, precio, stock);
        if (result.success) {
            this.alerta("Artículo actualizado correctamente.");
            this.volverAlMenuUsuario();
        } else this.alerta(result.error);
    }

    mostrarEliminarArticulo() {
        this.ocultarTodasSecciones();
        document.getElementById("eliminarArticuloSection").style.display = "block";
    }

    eliminarArticulo() {
        const id = Number(document.getElementById("eliminarId").value);
        if (this.confirmar(`¿Seguro desea eliminar el artículo con Id ${id}?`)) {
            const result = this.model.eliminarArticulo(id);
            if (result.success) {
                this.alerta("Artículo eliminado correctamente.");
                this.volverAlMenuUsuario();
            } else this.alerta(result.error);
        }
    }

    mostrarComprarArticulo() {
        this.ocultarTodasSecciones();
        document.getElementById("comprarArticuloSection").style.display = "block";
    }

    comprarArticulo() {
        const id = Number(document.getElementById("comprarId").value);
        const cantidad = Number(document.getElementById("comprarCantidad").value);
        const result = this.model.comprarArticulo(id, cantidad);
        if (result.success) {
            this.alerta(`Compra realizada. Stock restante: ${result.stock}`);
            this.volverAlMenuUsuario();
        } else this.alerta(result.error);
    }
}
