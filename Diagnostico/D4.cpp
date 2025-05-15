#include <iostream>
#include <string>
using namespace std;

bool esMayuscula(char c) {
    return c >= 'A' && c <= 'Z';
}

bool esSimboloEspecial(char c) {
    string simbolos = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";
    for (char s : simbolos) {
        if (c == s) return true;
    }
    return false;
}

bool validarContrasena(const string& contrasena) {
    if (contrasena.length() < 8 || contrasena.length() > 16) return false;
    bool mayuscula = false;
    int simbolo_count = 0;
    
    for (char c : contrasena) {
        if (esMayuscula(c)) mayuscula = true;
        if (esSimboloEspecial(c)) simbolo_count++;
    }
    
    return mayuscula && simbolo_count >= 2;
}

int main() {
    string usuario_correcto = "admin";
    string contrasena_correcta = "Admin@123!";
    string usuario, contrasena;
    int intentos = 0;

    while (true) {
        cout << "\nMenu Principal:\n";
        cout << "1. Iniciar sesión\n";
        cout << "2. Crear cuenta de usuario\n";
        cout << "Seleccione una opción: ";
        int opcion_menu;
        cin >> opcion_menu;
        
        if (opcion_menu == 1) {
            intentos = 0;
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
                            do {
                                cout << "Ingrese nueva contraseña (8-16 caracteres, 1 mayúscula, 2 símbolos): ";
                                cin >> nueva_contrasena;
                                if (!validarContrasena(nueva_contrasena)) {
                                    cout << "Contraseña no válida. Intente nuevamente.\n";
                                }
                            } while (!validarContrasena(nueva_contrasena));
                            
                            contrasena_correcta = nueva_contrasena;
                            cout << "Contraseña cambiada exitosamente.\n";
                        } else if (opcion != 2) {
                            cout << "Opción no válida.\n";
                        }
                    } while (opcion != 2);
                    
                    break;
                } else {
                    intentos++;
                    cout << "Usuario y/o contraseña incorrecta. Intento " << intentos << " de 3.\n";
                }
            }
            
            if (intentos == 3) {
                cout << "Usuario bloqueado. Contacte al administrador.\n";
            }
        } 
        else if (opcion_menu == 2) {
            cout << "Ingrese nuevo nombre de usuario: ";
            cin >> usuario_correcto;
            do {
                cout << "Ingrese nueva contraseña (8-16 caracteres, 1 mayúscula, 2 símbolos): ";
                cin >> contrasena_correcta;
                if (!validarContrasena(contrasena_correcta)) {
                    cout << "Contraseña no válida. Intente nuevamente.\n";
                }
            } while (!validarContrasena(contrasena_correcta));
            
            cout << "Cuenta creada exitosamente.\n";
        } 
        else {
            cout << "Opción no válida.\n";
        }
    }
    
    return 0;
}
