#include <iostream>
#include <string>
using namespace std;

struct Producto {
    int id;
    string nombre;
    double precio;
    int stock;
};

Producto inventario[] = {
    {1, "Lavandina x 1L", 875.25, 3000},
    {4, "Detergente x 500mL", 1102.45, 2010},
    {22, "Jabón en polvo x 250g", 650.22, 407}
};

const int num_productos = sizeof(inventario) / sizeof(inventario[0]);

void listarProductos() {
    cout << "\nListado de productos:\n";
    for (int i = 0; i < num_productos; i++) {
        cout << "ID: " << inventario[i].id 
             << " | Nombre: " << inventario[i].nombre
             << " | Precio: $" << inventario[i].precio
             << " | Stock: " << inventario[i].stock << " unidades\n";
    }
}

int main() {
    int opcion;
    do {
        cout << "\nMenu de opciones:\n";
        cout << "1. Listar artículos\n";
        cout << "2. Salir\n";
        cout << "Seleccione una opción: ";
        cin >> opcion;
        
        if (opcion == 1) {
            listarProductos();
        } else if (opcion != 2) {
            cout << "Opción no válida.\n";
        }
    } while (opcion != 2);
    
    return 0;
}
