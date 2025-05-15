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

void comprarProducto() {
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
    int opcion;
    do {
        cout << "\nMenu de opciones:\n";
        cout << "1. Listar artículos\n";
        cout << "2. Comprar artículo\n";
        cout << "3. Mostrar usuarios\n";
        cout << "4. Salir\n";
        cout << "Seleccione una opción: ";
        cin >> opcion;
        
        if (opcion == 1) {
            listarProductos();
        } else if (opcion == 2) {
            comprarProducto();
        } else if (opcion == 3) {
            mostrarUsuarios();
        } else if (opcion != 4) {
            cout << "Opción no válida.\n";
        }
    } while (opcion != 4);
    
    return 0;
}
