#include <iostream>
#include <string>
using namespace std;

struct Producto {
    int id;
    string nombre;
    double precio;
    int stock;
};

Producto inventario[100] = {
    {1, "Lavandina x 1L", 875.25, 3000},
    {4, "Detergente x 500mL", 1102.45, 2010},
    {22, "Jabón en polvo x 250g", 650.22, 407}
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

void agregarProducto() {
    if (num_productos >= 100) {
        cout << "No se pueden agregar más productos.\n";
        return;
    }
    cout << "\nIngrese ID: ";
    cin >> inventario[num_productos].id;
    cout << "Ingrese Nombre: ";
    cin.ignore();
    getline(cin, inventario[num_productos].nombre);
    cout << "Ingrese Precio: ";
    cin >> inventario[num_productos].precio;
    cout << "Ingrese Stock: ";
    cin >> inventario[num_productos].stock;
    num_productos++;
    cout << "Producto agregado con éxito.\n";
}

void editarProducto() {
    int id;
    cout << "\nIngrese ID del producto a editar: ";
    cin >> id;
    for (int i = 0; i < num_productos; i++) {
        if (inventario[i].id == id) {
            cout << "Nuevo Nombre: ";
            cin.ignore();
            getline(cin, inventario[i].nombre);
            cout << "Nuevo Precio: ";
            cin >> inventario[i].precio;
            cout << "Nuevo Stock: ";
            cin >> inventario[i].stock;
            cout << "Producto editado con éxito.\n";
            return;
        }
    }
    cout << "Producto no encontrado.\n";
}

void eliminarProducto() {
    int id;
    cout << "\nIngrese ID del producto a eliminar: ";
    cin >> id;
    for (int i = 0; i < num_productos; i++) {
        if (inventario[i].id == id) {
            for (int j = i; j < num_productos - 1; j++) {
                inventario[j] = inventario[j + 1];
            }
            num_productos--;
            cout << "Producto eliminado con éxito.\n";
            return;
        }
    }
    cout << "Producto no encontrado.\n";
}

int main() {
    int opcion;
    do {
        cout << "\nMenu de opciones:\n";
        cout << "1. Listar artículos\n";
        cout << "2. Agregar artículo\n";
        cout << "3. Editar artículo\n";
        cout << "4. Eliminar artículo\n";
        cout << "5. Salir\n";
        cout << "Seleccione una opción: ";
        cin >> opcion;
        
        if (opcion == 1) {
            listarProductos();
        } else if (opcion == 2) {
            agregarProducto();
        } else if (opcion == 3) {
            editarProducto();
        } else if (opcion == 4) {
            eliminarProducto();
        } else if (opcion != 5) {
            cout << "Opción no válida.\n";
        }
    } while (opcion != 5);
    
    return 0;
}
