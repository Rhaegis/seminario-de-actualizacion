const Backend = (() => {
    const usuarios = {
        "admin1": { password: "Admin#123!", categoria: "Administrador" },
        "cliente123": { password: "Limpiez@_456", categoria: "Cliente" },
        "vendedor01": { password: "Vend3dor$!", categoria: "Vendedor" },
        "deposito1": { password: "Dep0sito##12", categoria: "Trabajador de depósito" }
    };

    const permisosPorCategoria = {
        "Administrador": ["listar", "agregar", "editar", "eliminar", "comprar", "cambiar_contrasena"],
        "Cliente": ["listar", "comprar", "cambiar_contrasena"],
        "Vendedor": ["listar", "editar", "comprar", "cambiar_contrasena"],
        "Trabajador de depósito": ["listar", "agregar", "editar", "cambiar_contrasena"]
    };

    let articulos = [
        { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
        { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
        { id: 22, nombre: "Jabón en polvo x 250g", precio: 650.22, stock: 407 }
    ];

    let usuarioActivo = null;
    let categoriaActiva = null;
    let intentosFallidos = 0;
    let usuarioBloqueado = false;

    function validarContrasena(pass) {
        const largoValido = pass.length >= 8 && pass.length <= 16;
        const tieneMayuscula = /[A-Z]/.test(pass);
        const simbolosEspeciales = pass.match(/[^a-zA-Z0-9]/g);
        const tieneDosSimbolos = simbolosEspeciales && simbolosEspeciales.length >= 2;
        return largoValido && tieneMayuscula && tieneDosSimbolos;
    }

    return {
        usuarios,
        permisosPorCategoria,
        articulos,
        getUsuarioActivo: () => usuarioActivo,
        getCategoriaActiva: () => categoriaActiva,
        getPermisos: () => permisosPorCategoria[categoriaActiva] || [],

        login: (user, pass) => {
            if (usuarioBloqueado) return { error: "Usuario bloqueado." };
            if (usuarios[user] && usuarios[user].password === pass) {
                usuarioActivo = user;
                categoriaActiva = usuarios[user].categoria;
                intentosFallidos = 0;
                return { success: true, user, categoria: categoriaActiva };
            } else {
                intentosFallidos++;
                if (intentosFallidos >= 3) {
                    usuarioBloqueado = true;
                    return { error: "Usuario bloqueado. Contacte al administrador." };
                }
                return { error: "Usuario o contraseña incorrectos." };
            }
        },

        logout: () => {
            usuarioActivo = null;
            categoriaActiva = null;
            intentosFallidos = 0;
            usuarioBloqueado = false;
        },

        crearCuenta: (user, pass, categoria) => {
            if (usuarios[user]) return { error: "El usuario ya existe." };
            if (!validarContrasena(pass)) return { error: "Contraseña inválida." };
            if (!permisosPorCategoria[categoria]) return { error: "Categoría inválida." };
            usuarios[user] = { password: pass, categoria };
            return { success: true, user, categoria };
        },

        cambiarContrasena: (actual, nueva) => {
            if (!usuarioActivo) return { error: "No hay usuario activo." };
            if (usuarios[usuarioActivo].password !== actual) return { error: "Contraseña actual incorrecta." };
            if (!validarContrasena(nueva)) return { error: "Nueva contraseña inválida." };
            usuarios[usuarioActivo].password = nueva;
            return { success: true };
        },

        listarArticulos: () => articulos,

        agregarArticulo: (id, nombre, precio, stock) => {
            if (articulos.find(a => a.id === id)) return { error: "Id ya existe." };
            articulos.push({ id, nombre, precio, stock });
            return { success: true };
        },

        editarArticulo: (id, nombre, precio, stock) => {
            let articulo = articulos.find(a => a.id === id);
            if (!articulo) return { error: "No encontrado." };
            articulo.nombre = nombre;
            articulo.precio = precio;
            articulo.stock = stock;
            return { success: true };
        },

        eliminarArticulo: (id) => {
            let index = articulos.findIndex(a => a.id === id);
            if (index === -1) return { error: "No encontrado." };
            articulos.splice(index, 1);
            return { success: true };
        },

        comprarArticulo: (id, cantidad) => {
            let articulo = articulos.find(a => a.id === id);
            if (!articulo) return { error: "No encontrado." };
            if (articulo.stock < cantidad) return { error: `Stock insuficiente (${articulo.stock}).` };
            articulo.stock -= cantidad;
            return { success: true, stock: articulo.stock };
        }
    };
})();
