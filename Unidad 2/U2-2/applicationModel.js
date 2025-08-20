// Helpers para cookies
function setCookie(nombre, valor, dias) {
    let expires = "";
    if (dias) {
        const d = new Date();
        d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
        expires = "; expires=" + d.toUTCString();
    }
    document.cookie = nombre + "=" + encodeURIComponent(valor) + expires + "; path=/";
}
function getCookie(nombre) {
    const nameEQ = nombre + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}
function eraseCookie(nombre) { document.cookie = nombre + "=; Max-Age=-99999999;"; }

class ApplicationModel {
    constructor() {
        this.usuarios = JSON.parse(getCookie("usuarios")) || {
            "admin1": { password: "Admin#123!", categoria: "Administrador" }
        };
        this.articulos = JSON.parse(getCookie("articulos")) || [
            { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 }
        ];
        this.usuarioActivo = getCookie("usuarioActivo");
        this.categoriaActiva = getCookie("categoriaActiva");

        this.permisosPorCategoria = {
            "Administrador": ["listar", "agregar", "editar", "eliminar", "comprar", "cambiar_contrasena"],
            "Cliente": ["listar", "comprar", "cambiar_contrasena"]
        };
    }

    guardarUsuarios() { setCookie("usuarios", JSON.stringify(this.usuarios), 7); }
    guardarArticulos() { setCookie("articulos", JSON.stringify(this.articulos), 7); }
    guardarSesion() {
        if (this.usuarioActivo) {
            setCookie("usuarioActivo", this.usuarioActivo, 1);
            setCookie("categoriaActiva", this.categoriaActiva, 1);
        } else {
            eraseCookie("usuarioActivo"); eraseCookie("categoriaActiva");
        }
    }

    login(user, pass) {
        if (this.usuarios[user] && this.usuarios[user].password === pass) {
            this.usuarioActivo = user;
            this.categoriaActiva = this.usuarios[user].categoria;
            this.guardarSesion();
            return { success: true, user, categoria: this.categoriaActiva };
        }
        return { error: "Usuario/contraseña incorrectos" };
    }

    logout() { this.usuarioActivo = null; this.categoriaActiva = null; this.guardarSesion(); }
    crearCuenta(user, pass, categoria) {
        if (this.usuarios[user]) return { error: "El usuario ya existe" };
        this.usuarios[user] = { password: pass, categoria };
        this.guardarUsuarios();
        return { success: true };
    }

    agregarArticulo(id, nombre, precio, stock) {
        this.articulos.push({ id, nombre, precio, stock });
        this.guardarArticulos();
        return { success: true };
    }

    listarArticulos() { return this.articulos; }
    getUsuarioActivo() { return this.usuarioActivo; }
    getCategoriaActiva() { return this.categoriaActiva; }
    getPermisos() { return this.permisosPorCategoria[this.categoriaActiva] || []; }
}
