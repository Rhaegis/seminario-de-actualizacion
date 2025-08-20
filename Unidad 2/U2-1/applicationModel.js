class ApplicationModel {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || {
            "admin1": { password: "Admin#123!", categoria: "Administrador" },
            "cliente123": { password: "Limpiez@_456", categoria: "Cliente" }
        };

        this.articulos = JSON.parse(localStorage.getItem("articulos")) || [
            { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 }
        ];

        this.permisosPorCategoria = {
            "Administrador": ["listar", "agregar", "editar", "eliminar", "comprar", "cambiar_contrasena"],
            "Cliente": ["listar", "comprar", "cambiar_contrasena"]
        };

        this.usuarioActivo = sessionStorage.getItem("usuarioActivo") || null;
        this.categoriaActiva = sessionStorage.getItem("categoriaActiva") || null;
    }

    guardarUsuarios() { localStorage.setItem("usuarios", JSON.stringify(this.usuarios)); }
    guardarArticulos() { localStorage.setItem("articulos", JSON.stringify(this.articulos)); }
    guardarSesion() {
        if (this.usuarioActivo) {
            sessionStorage.setItem("usuarioActivo", this.usuarioActivo);
            sessionStorage.setItem("categoriaActiva", this.categoriaActiva);
        } else {
            sessionStorage.clear();
        }
    }

    login(user, pass) {
        if (this.usuarios[user] && this.usuarios[user].password === pass) {
            this.usuarioActivo = user;
            this.categoriaActiva = this.usuarios[user].categoria;
            this.guardarSesion();
            return { success: true, user, categoria: this.categoriaActiva };
        }
        return { error: "Usuario o contraseña incorrectos" };
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
