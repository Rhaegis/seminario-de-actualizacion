const Frontend = (() => {
    function ocultarTodasSecciones() {
        document.querySelectorAll("body > div").forEach(div => div.style.display = "none");
    }

    return {
        mostrarLogin: () => {
            ocultarTodasSecciones();
            document.getElementById("loginSection").style.display = "block";
        },
        mostrarRegistro: () => {
            ocultarTodasSecciones();
            document.getElementById("registroSection").style.display = "block";
        },
        volverAlMenu: () => {
            ocultarTodasSecciones();
            document.getElementById("mainMenu").style.display = "block";
        },
        mostrarMenuUsuario: (usuario, categoria, permisos) => {
            ocultarTodasSecciones();
            document.getElementById("usuarioActivo").textContent = `${usuario} (${categoria})`;
            document.getElementById("usuarioMenu").style.display = "block";

            // Ocultar botones sin permisos
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
        },
        mostrarArticulos: (articulos) => {
            ocultarTodasSecciones();
            let contenido = "<table border='1'><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";
            articulos.forEach(a => {
                contenido += `<tr><td>${a.id}</td><td>${a.nombre}</td><td>$${a.precio.toFixed(2)}</td><td>${a.stock}</td></tr>`;
            });
            contenido += "</table>";
            document.getElementById("listaArticulos").innerHTML = contenido;
            document.getElementById("listarArticulosSection").style.display = "block";
        },
        alerta: (msg) => alert(msg),
        confirmar: (msg) => confirm(msg)
    };
})();
