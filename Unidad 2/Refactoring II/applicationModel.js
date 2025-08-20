class ApplicationModel {
    constructor() {
        this.usuarios = {
            "admin1": { password: "Admin#123!", categoria: "Administrador" },
            "cliente123": { password: "Limpiez@_456", categoria: "Cliente" },
            "vendedor01": { password: "Vend3dor$!", categoria: "Vendedor" },
            "deposito1": { password: "Dep0sito##12", categoria: "Trabajador de depósito" }
        };

        this.permisosPorCategoria = {
            "Administrador": ["listar", "agregar", "editar", "eliminar", "comprar", "cambiar_contrasena"],
            "Cliente": ["listar", "comprar", "cambiar_contrasena"],
            "Vendedor": ["listar", "editar", "comprar", "cambiar_contrasena"],
            "Trabajador de depósito": ["listar", "agregar", "editar", "cambiar_contrasena"]
        };

        this.articulos = [
            { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
            { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
            { id: 22, nombre: "Jabón en polvo x 250g", precio: 650.22, stock: 407 }
        ];

        this.usuarioActivo = null;
        this.categoriaActiva = null;
        this.intentosFallidos = 0;
        this.usuarioBloqueado = false;
    }

    validarContrasena(pass) {
        const largoValido = pass.length >= 8 && pass.length <= 16;
        const tieneMayuscula = /[A-Z]/.test(pass);
        const simbolosEspeciales = pass.match(/[^a-zA-Z0-9]/g);
        const tieneDosSimbolos = simbolosEspeciales && simbolosEspeciales.length >= 2;
        return largoValido && tieneMayuscula && tieneDosSimbolos;
    }

    login(user, pass) {
        if (this.usuarioBloqueado) return { error: "Usuario bloqueado." };
        if (this.usuarios[user] && this.usuarios[user].password === pass) {
            this.usuarioActivo = user;
            this.categoriaActiva = this.usuarios[user].categoria;
            this.intentosFallidos = 0;
            return { success: true, user, categoria: this.categoriaActiva };
        } else {
            this.intentosFallidos++;
            if (this.intentosFallidos >= 3) {
                this.usuarioBloqueado = true;
                return { error: "Usuario bloqueado. Contacte al administrador." };
            }
            return { error: "Usuario o contraseña incorrectos." };
        }
    }

    logout() {
        this.usuarioActivo = null;
        this.categoriaActiva = null;
        this.intentosFallidos = 0;
        this.usuarioBloqueado = false;
    }

    crearCuenta(user, pass, categoria) {
        if (!user) return { error: "Usuario vacío." };
        if (this.usuarios[user]) return { error: "El usuario ya existe." };
        if (!this.validarContrasena(pass)) return { error: "Contraseña inválida." };
        if (!this.permisosPorCategoria[categoria]) return { error: "Categoría inválida." };

        this.usuarios[user] = { password: pass, categoria };
        return { success: true, user, categoria };
    }

    cambiarContrasena(actual, nueva) {
        if (!this.usuarioActivo) return { error: "No hay usuario activo." };
        if (this.usuarios[this.usuarioActivo].password !== actual) return { error: "Contraseña actual incorrecta." };
        if (!this.validarContrasena(nueva)) return { error: "Nueva contraseña inválida." };

        this.usuarios[this.usuarioActivo].password = nueva;
        return { success: true };
    }

    listarArticulos() {
        return this.articulos;
    }

    agregarArticulo(id, nombre, precio, stock) {
        if (!id || !nombre || isNaN(precio) || isNaN(stock)) return { error: "Datos inválidos." };
        if (this.articulos.find(a => a.id === id)) return { error: "Id ya existe." };
        this.articulos.push({ id, nombre, precio, stock });
        return { success: true };
    }

    editarArticulo(id, nombre, precio, stock) {
        let articulo = this.articulos.find(a => a.id === id);
        if (!articulo) return { error: "No encontrado." };
        articulo.nombre = nombre;
        articulo.precio = precio;
        articulo.stock = stock;
        return { success: true };
    }

    eliminarArticulo(id) {
        let index = this.articulos.findIndex(a => a.id === id);
        if (index === -1) return { error: "No encontrado." };
        this.articulos.splice(index, 1);
        return { success: true };
    }

    comprarArticulo(id, cantidad) {
        let articulo = this.articulos.find(a => a.id === id);
        if (!articulo) return { error: "No encontrado." };
        if (articulo.stock < cantidad) return { error: `Stock insuficiente (${articulo.stock}).` };
        articulo.stock -= cantidad;
        return { success: true, stock: articulo.stock };
    }

    getUsuarioActivo() { return this.usuarioActivo; }
    getCategoriaActiva() { return this.categoriaActiva; }
    getPermisos() { return this.permisosPorCategoria[this.categoriaActiva] || []; }
}
