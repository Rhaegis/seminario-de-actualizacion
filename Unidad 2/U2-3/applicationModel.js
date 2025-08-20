class ApplicationModel {
    constructor() {
        this.db = null;
        this.usuarioActivo = null;
        this.categoriaActiva = null;
        this.permisosPorCategoria = {
            "Administrador": ["listar", "agregar", "editar", "eliminar", "comprar", "cambiar_contrasena"],
            "Cliente": ["listar", "comprar", "cambiar_contrasena"]
        };

        const request = indexedDB.open("AppDB", 1);
        request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            if (!this.db.objectStoreNames.contains("usuarios")) {
                this.db.createObjectStore("usuarios", { keyPath: "user" });
            }
            if (!this.db.objectStoreNames.contains("articulos")) {
                this.db.createObjectStore("articulos", { keyPath: "id" });
            }
        };
        request.onsuccess = (event) => { this.db = event.target.result; };
    }

    agregarUsuario(user, pass, categoria) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("usuarios", "readwrite");
            tx.objectStore("usuarios").add({ user, password: pass, categoria });
            tx.oncomplete = () => resolve({ success: true });
            tx.onerror = () => reject({ error: "No se pudo agregar usuario" });
        });
    }

    agregarArticulo(id, nombre, precio, stock) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("articulos", "readwrite");
            tx.objectStore("articulos").add({ id, nombre, precio, stock });
            tx.oncomplete = () => resolve({ success: true });
            tx.onerror = () => reject({ error: "No se pudo agregar artículo" });
        });
    }

    listarArticulos() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("articulos", "readonly");
            const req = tx.objectStore("articulos").getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject({ error: "No se pudo listar artículos" });
        });
    }

    // Métodos de login/logout solo en memoria (podrías persistir también en usuarios)
    login(user, pass) {
        this.usuarioActivo = user;
        this.categoriaActiva = "Administrador"; // simplificado
        return { success: true, user, categoria: this.categoriaActiva };
    }
    logout() { this.usuarioActivo = null; this.categoriaActiva = null; }

    getUsuarioActivo() { return this.usuarioActivo; }
    getCategoriaActiva() { return this.categoriaActiva; }
    getPermisos() { return this.permisosPorCategoria[this.categoriaActiva] || []; }
}
