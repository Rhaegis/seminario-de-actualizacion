#include <iostream>
#include <string>
using namespace std;

int main() {
    const string usuario_correcto = "admin";
    const string contrasena_correcta = "Admin@123";
    string usuario, contrasena;
    int intentos = 0;

    while (intentos < 3) {
        cout << "Usuario: "; cin >> usuario;
        cout << "Contrasena: "; cin >> contrasena;
        
        if (usuario == usuario_correcto && contrasena == contrasena_correcta) {
            cout << "\n¡Bienvenido/a " << usuario << "!\n";
            int opcion;
            do {
                cout << "\nMenu de opciones:\n";
                cout << "1. Cambiar contraseña\n";
                cout << "2. Salir\n";
                cout << "Seleccione una opción: ";
                cin >> opcion;
                
                if (opcion == 1) {
                    string nueva_contrasena;
                    cout << "Ingrese nueva contraseña: ";
                    cin >> nueva_contrasena;
                    cout << "Contraseña cambiada exitosamente.\n";
                } else if (opcion != 2) {
                    cout << "Opción no válida.\n";
                }
            } while (opcion != 2);
            
            return 0;
        } else {
            intentos++;
            cout << "Usuario y/o contraseña incorrecta. Intento " << intentos << " de 3.\n";
        }
    }
    
    cout << "Usuario bloqueado. Contacte al administrador.\n";
    return 0;
}
