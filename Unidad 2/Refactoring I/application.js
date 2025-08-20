const App = (() => {
    let articuloEditando = null;

    return {
        // Navegación
        mostrarLogin: Frontend.mostrarLogin,
        mostrarRegistro: Frontend.mostrarRegistro,
        volverAlMenu: Frontend.volverAlMenu,
        volverAlMenuUsuario: () => {
            Frontend.mostrarMenuUsuario(Backend.getUsuarioActivo(), Backend.getCategoriaActiva(), Backend.getPermisos());
        },

        // Sesión
        iniciarSesion: () => {
            const user = document.getElementById("loginUsuario").value.trim();
            const pass = document.getElementById("loginContrasena").value;
            const result = Backend.login(user, pass);
            if (result.success) {
                Frontend.alerta(`¡Bienvenido/a ${user}!`);
                Frontend.mostrarMenuUsuario(user, result.categoria, Backend.getPermisos());
                document.getElementById("btnCrearCuentaAdmin").style.display = result.categoria === "Administrador" ? "inline-block" : "none";
            } else Frontend.alerta(result.error);
        },

        cerrarSesion: () => {
            Backend.logout();
            Frontend.alerta("Sesión cerrada.");
            Frontend.volverAlMenu();
        },

        crearCuenta: () => {
            const user = document.getElementById("nuevoUsuario").value.trim();
            const pass = document.getElementById("nuevaContrasena").value;
            const categoria = prompt("Ingrese categoría: Administrador / Cliente / Vendedor / Trabajador de depósito");
            const result = Backend.crearCuenta(user, pass, categoria);
            if (result.success) {
                Frontend.alerta("Cuenta creada con éxito.");
                App.volverAlMenuUsuario();
            } else Frontend.alerta(result.error);
        },

        cambiarContrasena: () => {
            const actual = document.getElementById("contrasenaActual").value;
            const nueva = document.getElementById("nuevaContrasenaCambio").value;
            const result = Backend.cambiarContrasena(actual, nueva);
            if (result.success) {
                Frontend.alerta("Contraseña cambiada con éxito.");
                App.volverAlMenuUsuario();
            } else Frontend.alerta(result.error);
        },

        mostrarCambioContrasena: () => {
            document.getElementById("contrasenaActual").value = "";
            document.getElementById("nuevaContrasenaCambio").value = "";
            document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
            document.getElementById("cambiarContrasenaSection").style.display = "block";
        },

        // Artículos
        listarArticulos: () => {
            const articulos = Backend.listarArticulos();
            Frontend.mostrarArticulos(articulos);
        },

        mostrarNuevoArticulo: () => {
            document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
            document.getElementById("nuevoArticuloSection").style.display = "block";
        },

        agregarArticulo: () => {
            const id = Number(document.getElementById("nuevoId").value);
            const nombre = document.getElementById("nuevoNombre").value.trim();
            const precio = Number(document.getElementById("nuevoPrecio").value);
            const stock = Number(document.getElementById("nuevoStock").value);

            const result = Backend.agregarArticulo(id, nombre, precio, stock);
            if (result.success) {
                Frontend.alerta("Artículo agregado correctamente.");
                App.volverAlMenuUsuario();
            } else Frontend.alerta(result.error);
        },

        mostrarEditarArticulo: () => {
            document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
            document.getElementById("editarArticuloSection").style.display = "block";
            document.getElementById("formEditarArticulo").style.display = "none";
            articuloEditando = null;
        },

        buscarArticuloParaEditar: () => {
            const id = Number(document.getElementById("editarIdBuscado").value);
            const articulo = Backend.listarArticulos().find(a => a.id === id);
            if (!articulo) return Frontend.alerta("No se encontró artículo con ese Id.");
            articuloEditando = articulo;
            document.getElementById("editarNombre").value = articulo.nombre;
            document.getElementById("editarPrecio").value = articulo.precio;
            document.getElementById("editarStock").value = articulo.stock;
            document.getElementById("formEditarArticulo").style.display = "block";
        },

        guardarArticuloEditado: () => {
            if (!articuloEditando) return;
            const nombre = document.getElementById("editarNombre").value.trim();
            const precio = Number(document.getElementById("editarPrecio").value);
            const stock = Number(document.getElementById("editarStock").value);
            const result = Backend.editarArticulo(articuloEditando.id, nombre, precio, stock);
            if (result.success) {
                Frontend.alerta("Artículo actualizado correctamente.");
                App.volverAlMenuUsuario();
            } else Frontend.alerta(result.error);
        },

        mostrarEliminarArticulo: () => {
            document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
            document.getElementById("eliminarArticuloSection").style.display = "block";
        },

        eliminarArticulo: () => {
            const id = Number(document.getElementById("eliminarId").value);
            if (Frontend.confirmar(`¿Seguro desea eliminar el artículo con Id ${id}?`)) {
                const result = Backend.eliminarArticulo(id);
                if (result.success) {
                    Frontend.alerta("Artículo eliminado correctamente.");
                    App.volverAlMenuUsuario();
                } else Frontend.alerta(result.error);
            }
        },

        mostrarComprarArticulo: () => {
            document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
            document.getElementById("comprarArticuloSection").style.display = "block";
        },

        comprarArticulo: () => {
            const id = Number(document.getElementById("comprarId").value);
            const cantidad = Number(document.getElementById("comprarCantidad").value);
            const result = Backend.comprarArticulo(id, cantidad);
            if (result.success) {
                Frontend.alerta(`Compra realizada. Stock restante: ${result.stock}`);
                App.volverAlMenuUsuario();
            } else Frontend.alerta(result.error);
        }
    };
})();
