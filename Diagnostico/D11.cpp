#include <iostream>
#include <string>
using namespace std;

struct Producto {
    int id;
    string nombre;
    double precio;
    int stock;
};

struct Usuario {
    string nombre;
    string tipo;
};

Producto inventario[100] = {
    {1, "Lavandina x 1L", 875.25, 3000},
    {4, "Detergente x 500mL", 1102.45, 2010},
    {22, "Jabón en polvo x 250g", 650.22, 407}
};

Usuario usuarios[4] = {
    {"admin", "Administrador"},
    {"cliente", "Cliente"},
    {"vendedor", "Vendedor"},
    {"deposito", "Trabajador de depósito"}
};

int num_productos = 3;

void listarProductos() {
    cout << "\nListado de productos:\n";
    for (int i = 0; i < num_productos; i++) {
        cout << "ID: " << inventario[i].id 
             << " | Nombre: " << inventario[i].nombre
             << " | Precio: $" << inventario[i].precio
             << " | Stock: " << inventario[i].stock << " unidades\n";
    }
}

void gestionarUsuarios(string usuario_tipo) {
    if (usuario_tipo != "Administrador") {
        cout << "No tiene permisos para gestionar usuarios.\n";
        return;
    }
    cout << "Gestión de usuarios disponible solo para administradores.\n";
}

void cargarStockDesdeJSON(string usuario_tipo) {
    if (usuario_tipo != "Administrador") {
        cout << "No tiene permisos para cargar stock desde archivo.\n";
        return;
    }
    cout << "Funcionalidad de carga desde JSON aún no implementada.\n";
}

void comprarProducto(string usuario_tipo) {
    if (usuario_tipo != "Cliente") {
        cout << "No tiene permisos para comprar productos.\n";
        return;
    }
    int id, cantidad;
    cout << "\nIngrese ID del producto a comprar: ";
    cin >> id;
    for (int i = 0; i < num_productos; i++) {
        if (inventario[i].id == id) {
            cout << "Ingrese cantidad a comprar: ";
            cin >> cantidad;
            if (cantidad > 0 && cantidad <= inventario[i].stock) {
                inventario[i].stock -= cantidad;
                cout << "Compra realizada con éxito.\n";
            } else {
                cout << "Cantidad no válida o insuficiente stock.\n";
            }
            return;
        }
    }
    cout << "Producto no encontrado.\n";
}

void mostrarUsuarios() {
    cout << "\nUsuarios registrados:\n";
    for (int i = 0; i < 4; i++) {
        cout << "Nombre: " << usuarios[i].nombre << " | Tipo: " << usuarios[i].tipo << "\n";
    }
}

int main() {
    string usuario_actual;
    string tipo_usuario;
    
    cout << "Ingrese su nombre de usuario: ";
    cin >> usuario_actual;
    
    bool usuario_encontrado = false;
    for (int i = 0; i < 4; i++) {
        if (usuarios[i].nombre == usuario_actual) {
            tipo_usuario = usuarios[i].tipo;
            usuario_encontrado = true;
            break;
        }
    }
    
    if (!usuario_encontrado) {
        cout << "Usuario no encontrado. Saliendo del sistema.\n";
        return 0;
    }
    
    int opcion;
    do {
        cout << "\nMenu de opciones:\n";
        cout << "1. Listar artículos\n";
        if (tipo_usuario == "Cliente") {
            cout << "2. Comprar artículo\n";
        }
        if (tipo_usuario == "Administrador") {
            cout << "3. Gestionar usuarios\n";
            cout << "4. Cargar stock desde archivo JSON\n";
        }
        cout << "5. Mostrar usuarios\n";
        cout << "6. Salir\n";
        cout << "Seleccione una opción: ";
        cin >> opcion;
        
        if (opcion == 1) {
            listarProductos();
        } else if (opcion == 2 && tipo_usuario == "Cliente") {
            comprarProducto(tipo_usuario);
        } else if (opcion == 3 && tipo_usuario == "Administrador") {
            gestionarUsuarios(tipo_usuario);
        } else if (opcion == 4 && tipo_usuario == "Administrador") {
            cargarStockDesdeJSON(tipo_usuario);
        } else if (opcion == 5) {
            mostrarUsuarios();
        } else if (opcion != 6) {
            cout << "Opción no válida o sin permisos.\n";
        }
    } while (opcion != 6);
    
    return 0;
}
