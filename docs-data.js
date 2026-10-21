/**
 * ITSUKI PROGRAMMING LANGUAGE - EXHAUSTIVE DOCUMENTATION DATABASE
 * DevDocs-style comprehensive reference data
 * All 8 Standard Libraries + Language Core + Full Technical Pipeline
 * Every single function includes distinct, copyable, working code examples!
 */

const ITSUKI_DOCS = {
  "version": "5.5.0",
  "lastUpdated": "2026-10-20",
  "categories": [
    {
      "id": "guide",
      "name": "Guías y Tutoriales",
      "icon": "rocket",
      "badge": "Aprende",
      "items": [
        {
          "id": "intro",
          "title": "¿Qué es Itsuki?",
          "category": "guide",
          "type": "guide",
          "summary": "Visión general, características de bajo nivel y arquitectura del compilador.",
          "signature": "Itsuki Compiler v5.5.0 (Dual x86_64 / x86_32)",
          "what": "Itsuki es un lenguaje de programación compilado, fuertemente tipado y de alto rendimiento. Genera código ensamblador nativo puro GNU as/GAS tanto para 64 bits (x86_64) como para 32 bits (x86_32), sin máquinas virtuales ni sobrecostos de runtime.",
          "how": "El compilador está implementado en C nativo. Transforma código fuente `.suki` a través de un Lexer con modo de pánico, un Parser que construye un AST puro en memoria mediante un Arena Allocator de un solo paso, un Type Checker semántico estricto (semantics.c), un Optimizador AST que pliega constantes y elimina código muerto, y un Generador de Código que emite ensamblador x86_64 compatible con las ABIs Microsoft x64 y System V AMD64.",
          "examples": [
            {
              "title": "Hola Mundo Básico",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    println(\"¡Hola desde el lenguaje Itsuki v5.5!\");\n}"
            }
          ]
        },
        {
          "id": "install",
          "title": "Instalación en Windows y Linux",
          "category": "guide",
          "type": "guide",
          "summary": "Cómo instalar Itsuki localmente sin permisos de administrador.",
          "signature": "install.bat | install.ps1 | install.sh",
          "what": "Itsuki incluye instaladores desatendidos tanto para Windows (PowerShell y Batch) como para Linux (Bash). Se instalan 100% en el directorio de usuario (~/.itsuki/ o %USERPROFILE%\\.itsuki\\) y configuran automáticamente el PATH.",
          "how": "Los scripts de instalación compilan o copian el binario nativo, instalan las cabeceras estándar en ~/.itsuki/lib/, crean el directorio para librerías de GitHub (~/.itsuki/packages/) y agregan las variables de entorno sin requerir elevación ni permisos sudo.",
          "examples": [
            {
              "title": "Instalación en Windows (PowerShell)",
              "code": "# Navegar a la carpeta del proyecto y ejecutar:\ncd windows\npowershell -ExecutionPolicy Bypass -File install.ps1\n\n# Verificar la instalación:\nitsuki --version"
            },
            {
              "title": "Instalación en Linux (Bash)",
              "code": "# Navegar a la carpeta linux y ejecutar:\ncd linux\nbash install.sh\n\n# Diagnóstico del entorno:\nitsuki doctor"
            }
          ]
        },
        {
          "id": "cli",
          "title": "Comandos del Compilador (CLI)",
          "category": "guide",
          "type": "cli",
          "summary": "Referencia de comandos: run, build, test, asm, doctor, install, list, uninstall.",
          "signature": "itsuki <comando> [archivo.suki] [opciones]",
          "what": "La herramienta de línea de comandos itsuki ofrece subcomandos integrados para compilar, ejecutar sobre la marcha, correr pruebas unitarias, examinar ensamblador y gestionar paquetes.",
          "how": "El ejecutable itsuki orquesta el preprocesador, compilador, optimizador y el linker GCC según el subcomando proporcionado. En modo run, crea un binario temporal, lo ejecuta y limpia los artefactos. En modo test, genera un arnés que ejecuta y cronometra cada prueba.",
          "params": [
            {
              "name": "run <file.suki>",
              "type": "subcomando",
              "desc": "Compila el archivo a memoria/temporal y lo ejecuta inmediatamente."
            },
            {
              "name": "build <file.suki> -o <bin>",
              "type": "subcomando",
              "desc": "Genera un ejecutable binario permanente optimizado."
            },
            {
              "name": "test [archivo.suki]",
              "type": "subcomando",
              "desc": "Descubre y corre todas las funciones de prueba (prefijo test_*)."
            },
            {
              "name": "asm <file.suki>",
              "type": "subcomando",
              "desc": "Emite el archivo ensamblador nativo (.s) generado."
            },
            {
              "name": "-m64 / -m32",
              "type": "flag",
              "desc": "Fuerza arquitectura x86_64 o x86_32 respectivamente."
            },
            {
              "name": "doctor",
              "type": "subcomando",
              "desc": "Muestra diagnósticos de CPU, GCC, multilib y flags."
            },
            {
              "name": "install <repo>",
              "type": "subcomando",
              "desc": "Descarga un paquete de GitHub a ~/.itsuki/packages/."
            }
          ],
          "examples": [
            {
              "title": "Uso diario de CLI",
              "code": "# Ejecución directa\nitsuki run mi_script.suki\n\n# Compilación optimizada a 64 bits\nitsuki build mi_script.suki -m64 -o programa.exe\n\n# Ejecutar test suite\nitsuki test"
            }
          ]
        },
        {
          "id": "compiler-arch",
          "title": "Arquitectura y Pipeline del Compilador",
          "category": "guide",
          "type": "guide",
          "summary": "Pipeline completo: Preprocesador -> Lexer -> Parser -> Semantics -> Optimizer -> Codegen.",
          "signature": "Source (.suki) -> AST -> Semantics -> Optimized AST -> ASM (.s) -> Linker (GCC)",
          "what": "El compilador sigue una arquitectura limpia de fases desacopladas, lo que garantiza velocidad máxima, diagnósticos amigables y ausencia total de fugas de memoria gracias a Bump Allocation.",
          "how": "1. Preprocessor: Expande macros, resuelve directivas #include del sistema y de paquetes GitHub.\\n2. Lexer & Parser: Tokenizan y arman el Árbol de Sintaxis Abstracta (AST) alojando todos los nodos en un bloque contiguo (Arena Allocator).\\n3. Semantic Analysis: Resuelve scopes y valida compatibilidad de tipos estrictamente antes de emitir código.\\n4. Optimizer: Plegado de constantes matemáticas/lógicas y poda de ramas muertas (DCE).\\n5. Codegen: Emite instrucciones nativas x86 con manejo de ABI y shadow space.",
          "examples": [
            {
              "title": "Inspeccionar el ensamblador resultante",
              "code": "# Inspeccionar el código ensamblador emitido:\nitsuki asm hola.suki\n\n# Ver el archivo hola.s generado con las directivas x86"
            }
          ]
        },
        {
          "id": "community",
          "title": "Comunidad en Discord y Soporte",
          "category": "guide",
          "type": "guide",
          "summary": "Únete al servidor oficial de Discord de Itsuki para soporte en vivo, desarrollo del compilador y proyectos.",
          "signature": "https://discord.gg/K6SEpB7Pf5 (Servidor Oficial)",
          "what": "Comunidad oficial de desarrolladores y usuarios del lenguaje Itsuki. Un espacio abierto para resolver dudas técnicas, instalación en Windows/Linux, debatir optimizaciones x86, compartir proyectos y colaborar en el ecosistema.",
          "how": "El servidor oficial de Discord (<a href=\"https://discord.gg/K6SEpB7Pf5\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--pink-bright); text-decoration: underline;\">https://discord.gg/K6SEpB7Pf5</a>) cuenta con canales dedicados a resolución de preguntas, reportes de incidencias, diseño del compilador y novedades de cada versión.",
          "examples": [
            {
              "title": "Enlace de invitación permanente",
              "code": "# Servidor oficial de Discord de Itsuki:\nhttps://discord.gg/K6SEpB7Pf5\n\n# Repositorio oficial en GitHub:\nhttps://github.com/Apolo1061/itsuki-lang"
            }
          ]
        }
      ]
    },
    {
      "id": "syntax",
      "name": "Sintaxis del Lenguaje",
      "icon": "code",
      "badge": "Core",
      "items": [
        {
          "id": "variables-types",
          "title": "Variables y Tipos de Datos",
          "category": "syntax",
          "type": "syntax",
          "summary": "Declaración con var, tipado estático, tipos primitivos y enteros de ancho fijo.",
          "signature": "var <nombre>: <tipo> = <expresión>;",
          "what": "Itsuki es fuertemente tipado. Las variables se declaran con la palabra clave var, seguida del nombre, dos puntos y el tipo. También admite inferencia y constantes con const.",
          "how": "Las variables locales se reservan en el stack frame relativo al puntero base (%rbp en 64 bits o %ebp en 32 bits). Los tipos numéricos se mapean directamente a registros de tamaño apropiado (int8 en %al, int16 en %ax, int32 en %eax, int64 y punteros en %rax).",
          "params": [
            {
              "name": "int / int32",
              "type": "tipo (4 bytes)",
              "desc": "Entero con signo de 32 bits estándar (-2^31 a 2^31-1)."
            },
            {
              "name": "int64",
              "type": "tipo (8 bytes)",
              "desc": "Entero de 64 bits de precisión extendida."
            },
            {
              "name": "float",
              "type": "tipo (4 bytes)",
              "desc": "Número de punto flotante simple precisión (registro SSE2 %xmm)."
            },
            {
              "name": "double",
              "type": "tipo (8 bytes)",
              "desc": "Número de punto flotante doble precisión (registro SSE2 %xmm)."
            },
            {
              "name": "char / int8",
              "type": "tipo (1 byte)",
              "desc": "Carácter o entero de 8 bits."
            },
            {
              "name": "bool",
              "type": "tipo (1 byte)",
              "desc": "Valor booleano true (1) o false (0)."
            },
            {
              "name": "char*",
              "type": "tipo (puntero)",
              "desc": "Puntero a cadena de caracteres terminada en byte nulo (\\0)."
            }
          ],
          "examples": [
            {
              "title": "Ejemplos de Variables",
              "code": "var edad: int = 25;\nvar pi: float = 3.14159;\nvar e: double = 2.718281828459;\nvar id_grande: int64 = 9223372036854775807;\nvar inicial: char = 'A';\nvar activo: bool = true;\nvar mensaje: char* = \"Itsuki Language\";"
            }
          ]
        },
        {
          "id": "functions",
          "title": "Funciones y Parámetros",
          "category": "syntax",
          "type": "syntax",
          "summary": "Definición de funciones, parámetros tipados, valor de retorno y funciones inline.",
          "signature": "fn <nombre>(<param>: <tipo>, ...) -> <tipo_retorno> { ... }",
          "what": "Las funciones se definen con la palabra reservada fn. Los parámetros son obligatorios con su tipo y el tipo de retorno se especifica con ->. Si no devuelve nada se usa -> void.",
          "how": "En 64 bits bajo Windows, los primeros 4 parámetros se transmiten en registros (%rcx, %rdx, %r8, %r9) y se reserva el Shadow Space obligatorio de 32 bytes en la pila. En SysV AMD64 (Linux), se transmiten en (%rdi, %rsi, %rdx, %rcx, %r8, %r9). El retorno se entrega en %rax (o %xmm0 para float/double).",
          "examples": [
            {
              "title": "Funciones con retorno y void",
              "code": "fn sumar(a: int, b: int) -> int {\n    return a + b;\n}\n\nfn saludar(nombre: char*) -> void {\n    println(f\"¡Hola, {nombre}!\");\n}\n\nfn main() -> void {\n    var res: int = sumar(15, 30);\n    saludar(\"Mundo\");\n}"
            }
          ]
        },
        {
          "id": "pointers",
          "title": "Punteros y Memoria Directa",
          "category": "syntax",
          "type": "syntax",
          "summary": "Operadores & (dirección), * (desreferencia) y -> (acceso a miembro de puntero).",
          "signature": "var p: int* = &x;  *p = 50;  ptr->campo = 10;",
          "what": "Itsuki permite acceso y manipulación directa de memoria a través de punteros con sintaxis idéntica a C pero con mayor legibilidad.",
          "how": "Los punteros ocupan 8 bytes en modo 64 bits y 4 bytes en modo 32 bits. El operador & genera la instrucción leaq/leal, y la desreferencia * genera accesos indirectos de memoria tipo movl (%rax), %edx.",
          "examples": [
            {
              "title": "Uso de punteros y modificación en memoria",
              "code": "fn duplicar(num: int*) -> void {\n    *num = (*num) * 2;\n}\n\nfn main() -> void {\n    var x: int = 21;\n    duplicar(&x);\n    println(f\"El valor duplicado es: {x}\"); // 42\n}"
            }
          ]
        },
        {
          "id": "structs-unions",
          "title": "Estructuras, Uniones y sizeof",
          "category": "syntax",
          "type": "syntax",
          "summary": "Estructuras de datos compuestas, uniones de memoria compartida y operador sizeof.",
          "signature": "struct <Nombre> { var campo: tipo; };  sizeof(struct Nombre);",
          "what": "Permite agrupar múltiples datos heterogéneos bajo un mismo tipo. Admite tanto sintaxis Itsuki (var x: int;) como estilo C (int x;). El operador sizeof(tipo) o sizeof(expr) computa el tamaño exacto en bytes.",
          "how": "El compilador calcula el layout de la estructura acumulando los tamaños individuales de cada campo según la arquitectura destino (32 o 64 bits). Las uniones sitúan todos los campos en el offset 0 con el tamaño del campo más grande.",
          "examples": [
            {
              "title": "Definición e instanciación de Struct",
              "code": "struct Punto {\n    var x: int;\n    var y: int;\n};\n\nfn main() -> void {\n    var p: struct Punto;\n    p.x = 10;\n    p.y = 20;\n\n    var tam: int = sizeof(struct Punto);\n    println(f\"Punto: ({p.x}, {p.y}) - Tamano: {tam} bytes\");\n}"
            }
          ]
        },
        {
          "id": "classes-methods",
          "title": "Clases y Métodos Orientados a Objetos",
          "category": "syntax",
          "type": "syntax",
          "summary": "POO en Itsuki: class, constructores, this, visibilidad public/private y métodos.",
          "signature": "class <Nombre> { public: fn Metodo() -> void; };",
          "what": "Itsuki soporta Programación Orientada a Objetos de alto rendimiento. Las clases permiten encapsular estado y comportamiento, con soporte para constructores y la referencia this.",
          "how": "Bajo el capó, las clases se compilan a estructuras de datos en C/ensamblador, y los métodos reciben un puntero oculto this como primer argumento en los registros correspondientes de la convención de llamadas.",
          "examples": [
            {
              "title": "Clase Contador",
              "code": "class Contador {\n    var valor: int;\n\npublic:\n    fn Contador(inicio: int) -> void {\n        this.valor = inicio;\n    }\n\n    fn incrementar() -> void {\n        this.valor++;\n    }\n\n    fn obtener() -> int {\n        return this.valor;\n    }\n};\n\nfn main() -> void {\n    var c: Contador;\n    c.Contador(10);\n    c.incrementar();\n    println(f\"Contador: {c.obtener()}\"); // 11\n}"
            }
          ]
        },
        {
          "id": "enums-typedefs",
          "title": "Enumeraciones y Alias (enum & typedef)",
          "category": "syntax",
          "type": "syntax",
          "summary": "Valores nominales enteros con enum y creación de alias de tipos con typedef.",
          "signature": "enum Color { ROJO, VERDE, AZUL }; typedef int size_t;",
          "what": "enum define un conjunto de constantes enteras con nombres descriptivos. typedef crea sinónimos legibles para tipos complejos o punteros.",
          "how": "Los enums son resueltos durante el análisis semántico y convertidos en constantes de AST de tipo entero de 32 bits.",
          "examples": [
            {
              "title": "Uso de enum y typedef",
              "code": "enum Estado {\n    INACTIVO = 0,\n    ACTIVO = 1,\n    SUSPENDIDO = 2\n};\n\ntypedef int Entero;\n\nfn main() -> void {\n    var est: enum Estado = ACTIVO;\n    var x: Entero = 100;\n    println(f\"Estado: {est}, x: {x}\");\n}"
            }
          ]
        },
        {
          "id": "interpolation",
          "title": "Interpolación de Cadenas (f\"...\" / $\"...\")",
          "category": "syntax",
          "type": "syntax",
          "summary": "Sintaxis moderna para formateo de texto incrustando expresiones dinámicas.",
          "signature": "println(f\"El resultado es {expresion}\");",
          "what": "Permite insertar expresiones, variables u operaciones directamente dentro de una cadena de texto anteponiendo el prefijo f o $. No requiere llamadas manuales a sprintf.",
          "how": "El parser descompone la cadena interpolada en fragmentos estáticos y expresiones AST. Durante la compilación, se emite una secuencia eficiente de impresiones concatenadas (print_str y print_int / print_flt) sin sobrecostos de asignación en el heap.",
          "examples": [
            {
              "title": "Interpolación con expresiones complejas",
              "code": "fn main() -> void {\n    var usuario: char* = \"Apolo\";\n    var puntos: int = 1500;\n    var nivel: int = 3;\n\n    println(f\"Jugador: {usuario} | Nivel: {nivel} | Score final: {puntos * 2}\");\n}"
            }
          ]
        },
        {
          "id": "control-flow",
          "title": "Control de Flujo (if, while, for, switch)",
          "category": "syntax",
          "type": "syntax",
          "summary": "Estructuras condicionales, bucles for/while y selección múltiple con switch/case.",
          "signature": "if (c) { } else { } | while (c) { } | for (init; cond; step) { }",
          "what": "Control total de bifurcaciones y ciclos iterativos con soporte para break y continue.",
          "how": "El generador de código emite etiquetas simbólicas locales (.Lif_true_X, .Lloop_start_Y) e instrucciones de salto condicional x86 (je, jne, jg, jle, jmp). El optimizador elimina automáticamente bloques if (0) y bucles con condición falsa.",
          "examples": [
            {
              "title": "Estructuras condicionales y bucles",
              "code": "fn main() -> void {\n    for (var i: int = 0; i < 5; i++) {\n        if (i % 2 == 0) {\n            println(f\"{i} es par\");\n        } else {\n            println(f\"{i} es impar\");\n        }\n    }\n}"
            }
          ]
        },
        {
          "id": "namespaces",
          "title": "Espacios de Nombres (namespace & using)",
          "category": "syntax",
          "type": "syntax",
          "summary": "Organización modular del código y prevención de colisión de símbolos.",
          "signature": "namespace MiModulo { ... }  using namespace MiModulo;",
          "what": "Permite agrupar funciones, estructuras y constantes bajo un identificador común. Evita colisiones de nombres con bibliotecas de terceros o el estándar.",
          "how": "El compilador realiza 'name mangling' anteponiendo el nombre del espacio a los símbolos internos en la tabla de símbolos (ej. MiModulo_mi_funcion) o resuelve ámbitos cuando se declara using namespace.",
          "examples": [
            {
              "title": "Declaración y uso de namespace",
              "code": "namespace Geometria {\n    fn area_rect(b: int, h: int) -> int {\n        return b * h;\n    }\n}\n\nusing namespace Geometria;\n\nfn main() -> void {\n    var a: int = area_rect(10, 5);\n    println(f\"Area: {a}\");\n}"
            }
          ]
        },
        {
          "id": "preprocessor",
          "title": "Directivas de Preprocesador (#include, #define)",
          "category": "syntax",
          "type": "syntax",
          "summary": "Inclusión de cabeceras, macros textuales y protección de inclusiones cíclicas.",
          "signature": "#pragma once | #include <fundamental.huki> | #define MAX 100",
          "what": "Permite modularizar el código fuente dividiéndolo en cabeceras (.huki) e implementaciones (.suki), además de definir constantes simbólicas y macros.",
          "how": "El preprocesador nativo resuelve las rutas relativas al archivo, en la biblioteca estándar (~/.itsuki/lib/) y en paquetes externos (~/.itsuki/packages/). Admite #pragma once para evitar inclusión redundante.",
          "examples": [
            {
              "title": "Directivas estándar",
              "code": "#pragma once\n#include <fundamental.huki>\n#include <math.huki>\n\n#define MAX_BUFFER 1024\n\nfn main() -> void {\n    println(f\"Capacidad maxima: {MAX_BUFFER}\");\n}"
            }
          ]
        },
        {
          "id": "test-runner",
          "title": "Runner Integrado de Pruebas Unitarias",
          "category": "syntax",
          "type": "syntax",
          "summary": "Sistema nativo de pruebas automáticas ejecutado mediante 'itsuki test'.",
          "signature": "fn test_<nombre>() -> int { return 0; }  // 0 = OK, != 0 = Fallo",
          "what": "Itsuki cuenta con un test runner nativo integrado en el propio compilador. Permite validar código sin bibliotecas externas complejas.",
          "how": "Al invocar itsuki test, el compilador escanea el AST en busca de funciones que comiencen con test_. Renombra temporalmente la función main del usuario y genera un arnés que ejecuta cada prueba individualmente, capturando su código de salida y emitiendo un reporte con colores.",
          "examples": [
            {
              "title": "Creación de una suite de pruebas",
              "code": "fn sumar(a: int, b: int) -> int { return a + b; }\n\nfn test_suma_correcta() -> int {\n    if (sumar(2, 3) != 5) {\n        return 1; // Falló la prueba\n    }\n    return 0; // Exito\n}\n\nfn test_caso_cero() -> void {\n    var r: int = sumar(0, 0);\n}"
            }
          ]
        }
      ]
    },
    {
      "id": "fundamental",
      "name": "Módulo: fundamental",
      "icon": "cpu",
      "badge": "StdLib",
      "items": [
        {
          "id": "fundamental-println",
          "title": "println",
          "category": "fundamental",
          "type": "fn",
          "summary": "Imprime una cadena, entero o float con salto de línea automático y vaciado de búfer.",
          "signature": "fn println(val: ...) -> void",
          "what": "Imprime el valor proporcionado en la salida estándar (stdout) seguido automáticamente de un carácter de salto de línea (\\n), asegurando el vaciado de búfer inmediato.",
          "how": "En modo nativo, identifica el tipo de dato. Para cadenas, invoca fundamental_print_str y luego emite un salto de línea con fundamental_println_empty que hace fflush(stdout). Para enteros usa _fundamental_print_int.",
          "params": [
            {
              "name": "val",
              "type": "char* | int | float | double",
              "desc": "Dato a imprimir en consola."
            }
          ],
          "returns": "void",
          "examples": [
            {
              "title": "Uso básico de println",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    println(\"Hola mundo desde Itsuki\");\n    println(42);\n    println(3.14159);\n}"
            },
            {
              "title": "println con expresiones dinámicas",
              "code": "var base: int = 10;\nvar altura: int = 5;\nprintln(f\"El area del rectangulo es: {base * altura}\");"
            }
          ]
        },
        {
          "id": "fundamental-print",
          "title": "print",
          "category": "fundamental",
          "type": "fn",
          "summary": "Imprime en salida estándar sin agregar salto de línea final.",
          "signature": "fn print(val: ...) -> void",
          "what": "Escribe directamente en consola el texto o número indicado sin saltar de línea, ideal para prompts interactivos o barras de progreso.",
          "how": "Envía los bytes directamente al descriptor de archivo 1 (stdout) a través de la biblioteca runtime de C.",
          "params": [
            {
              "name": "val",
              "type": "char* | int | float | double",
              "desc": "Dato a mostrar en pantalla."
            }
          ],
          "returns": "void",
          "examples": [
            {
              "title": "Prompt interactivo en la misma línea con print",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    print(\"Introduce tu nombre: \");\n    // El cursor permanece en la misma línea para la entrada del usuario\n}"
            },
            {
              "title": "Construcción de barra de progreso con print",
              "code": "for (var i: int = 0; i < 5; i++) {\n    print(\"#\");\n}\nprintln(\" [100%]\");"
            }
          ]
        },
        {
          "id": "fundamental-printf",
          "title": "printf",
          "category": "fundamental",
          "type": "fn",
          "summary": "Impresión formateada clásica estilo C con especificadores %d, %s, %f, %x.",
          "signature": "fn printf(fmt: char*, ...) -> void",
          "what": "Permite salida de texto con especificadores de formato compatibles con C estándar.",
          "how": "Se conecta directamente con la función nativa printf del runtime C anfitrión mediante convenciones variádicas estándar.",
          "params": [
            {
              "name": "fmt",
              "type": "char*",
              "desc": "Cadena de formato con especificadores (%d, %s, etc.)."
            },
            {
              "name": "...",
              "type": "variadic",
              "desc": "Argumentos que reemplazan los especificadores."
            }
          ],
          "returns": "void",
          "examples": [
            {
              "title": "printf con especificadores %s, %d, %x y %f",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var usuario: char* = \"Apolo\";\n    var nivel: int = 42;\n    var mascara: int = 255;\n    printf(\"Jugador: %s | Nivel: %03d | Hex: 0x%02X\\n\", usuario, nivel, mascara);\n}"
            }
          ]
        },
        {
          "id": "fundamental-putchar-getchar",
          "title": "putchar, getchar, puts",
          "category": "fundamental",
          "type": "fn",
          "summary": "Entrada y salida de caracteres individuales y líneas de texto a bajo nivel.",
          "signature": "fn putchar(c: int) -> int; fn getchar() -> int; fn puts(str: char*) -> int;",
          "what": "Permite leer o escribir un único byte ASCII en la terminal o imprimir una cadena rápida terminada en nulo.",
          "how": "Se mapea a las funciones estándar de libc. Utiliza 'int' en lugar de 'char' porque debe ser capaz de retornar los 256 caracteres válidos (0 a 255) y además el valor especial EOF (-1) que señala el Fin de Archivo o error de entrada.",
          "params": [
            {
              "name": "c",
              "type": "int",
              "desc": "Código ASCII del carácter a emitir (0 a 255) o EOF."
            },
            {
              "name": "str",
              "type": "char*",
              "desc": "Cadena de texto a imprimir con salto de línea."
            }
          ],
          "returns": "int (código ASCII del carácter 0-255, o -1 en caso de EOF / fin de archivo)",
          "examples": [
            {
              "title": "putchar: Emitir un carácter ASCII a stdout",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    putchar(73); // 'I'\n    putchar(84); // 'T'\n    putchar(83); // 'S'\n    putchar(85); // 'U'\n    putchar(75); // 'K'\n    putchar(73); // 'I'\n    putchar(10); // '\\n'\n}"
            },
            {
              "title": "getchar: Leer un carácter desde teclado",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    print(\"Presiona una tecla y Enter: \");\n    var c: int = getchar();\n    println(f\"Codigo ASCII recibido: {c}\");\n}"
            },
            {
              "title": "puts: Imprimir cadena con salto de línea automático",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    puts(\"Mensaje emitido a velocidad nativa con puts\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-read-str",
          "title": "read_str & read_int",
          "category": "fundamental",
          "type": "fn",
          "summary": "Lectura interactiva de cadenas y números enteros desde la entrada estándar.",
          "signature": "fn read_str(buf: char*) -> void; fn read_int(dest: int*) -> void;",
          "what": "Lee una línea de texto o un número entero desde el teclado del usuario hacia el búfer especificado.",
          "how": "Invoca fgets() o scanf() de manera segura garantizando que la cadena termine en nulo y consumiendo el salto de línea.",
          "params": [
            {
              "name": "buf / dest",
              "type": "char* | int*",
              "desc": "Puntero al búfer de destino."
            }
          ],
          "returns": "void",
          "examples": [
            {
              "title": "read_str: Capturar una línea de texto del usuario",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var nombre: char[64];\n    print(\"¿Cual es tu nombre? \");\n    read_str(nombre);\n    println(f\"Bienvenido a Itsuki, {nombre}!\");\n}"
            },
            {
              "title": "read_int: Leer un valor numérico entero",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var edad: int = 0;\n    print(\"Ingresa tu edad: \");\n    read_int(&edad);\n    println(f\"El proximo ano tendras {edad + 1} anos.\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-malloc",
          "title": "malloc & free",
          "category": "fundamental",
          "type": "fn",
          "summary": "Asigna y libera bloques de memoria contigua en el heap del sistema operativo.",
          "signature": "fn malloc(size: int) -> int*; fn free(ptr: int*) -> void;",
          "what": "Reserva un número determinado de bytes en el montículo (heap) y devuelve un puntero a la memoria reservada, o 0 si no hay memoria disponible. free() la devuelve al sistema.",
          "how": "Invoca la función del asignador de memoria de la biblioteca de C del sistema operativo (msvcrt.dll en Windows o glibc en Linux).",
          "params": [
            {
              "name": "size",
              "type": "int",
              "desc": "Número de bytes a reservar en memoria."
            }
          ],
          "returns": "int* (puntero genérico a la dirección de memoria asignada, o 0 si falló)",
          "examples": [
            {
              "title": "malloc: Reservar memoria contigua en el heap",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    // Reservar espacio para 5 enteros de 32 bits\n    var arr: int* = malloc(sizeof(int) * 5);\n    if (arr != 0) {\n        arr[0] = 10;\n        arr[1] = 20;\n        println(f\"Valor inicial: {arr[0]}\");\n        free(arr);\n    }\n}"
            },
            {
              "title": "free: Liberar la memoria para evitar fugas",
              "code": "var buffer: int* = malloc(1024);\n// ... operaciones con el buffer ...\nfree(buffer); // Devuelve los 1024 bytes al sistema operativo"
            }
          ]
        },
        {
          "id": "fundamental-calloc-realloc",
          "title": "calloc & realloc",
          "category": "fundamental",
          "type": "fn",
          "summary": "Reserva de memoria inicializada a cero y redimensionamiento dinámico.",
          "signature": "fn calloc(num: int, size: int) -> int*; fn realloc(ptr: int*, new_size: int) -> int*;",
          "what": "calloc reserva memoria y la limpia completamente con ceros binarios. realloc redimensiona un bloque existente preservando los datos originales.",
          "how": "Llama a calloc y realloc nativos de C. Si el bloque no cabe contiguo, realloc traslada el bloque a una nueva región y libera la anterior automáticamente.",
          "params": [
            {
              "name": "num",
              "type": "int",
              "desc": "Cantidad de elementos."
            },
            {
              "name": "size / new_size",
              "type": "int",
              "desc": "Tamaño en bytes de cada elemento o nuevo tamaño total."
            }
          ],
          "returns": "int* con la nueva dirección de memoria",
          "examples": [
            {
              "title": "calloc: Reservar memoria inicializada a cero",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    // Reserva 4 elementos de tipo int garantizando que todos sean 0\n    var limpio: int* = calloc(4, sizeof(int));\n    println(f\"Elemento 0 es cero garantizado: {limpio[0]}\");\n    free(limpio);\n}"
            },
            {
              "title": "realloc: Expandir un bloque de memoria dinámicamente",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var datos: int* = malloc(sizeof(int) * 2);\n    datos[0] = 100;\n    datos[1] = 200;\n\n    // Expandir a 4 elementos preservando datos[0] y datos[1]\n    datos = realloc(datos, sizeof(int) * 4);\n    datos[2] = 300;\n    datos[3] = 400;\n\n    println(f\"Datos expandidos: {datos[0]}, {datos[2]}, {datos[3]}\");\n    free(datos);\n}"
            }
          ]
        },
        {
          "id": "fundamental-memset-memcpy",
          "title": "memset, memcpy, memmove, memcmp",
          "category": "fundamental",
          "type": "fn",
          "summary": "Manipulación de bloques de memoria de ultra alta velocidad.",
          "signature": "memset(dest, val, cnt) | memcpy(dest, src, cnt) | memcmp(s1, s2, cnt)",
          "what": "Operaciones de bajo nivel para rellenar, copiar, mover (soportando solapamiento) y comparar bytes de memoria.",
          "how": "En x86 se apoyan en instrucciones nativas de cadena tipo rep movsb/movsl o funciones optimizadas con registros vectoriales.",
          "params": [
            {
              "name": "dest",
              "type": "int* | void*",
              "desc": "Puntero al bloque destino."
            },
            {
              "name": "src",
              "type": "int* | void*",
              "desc": "Puntero al bloque origen."
            },
            {
              "name": "count",
              "type": "int",
              "desc": "Número de bytes a procesar."
            }
          ],
          "returns": "Puntero al destino o entero resultante de comparación (0 si son idénticos)",
          "examples": [
            {
              "title": "memset: Rellenar memoria con un valor de byte",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var buffer: char[16];\n    memset(buffer, 'A', 15);\n    buffer[15] = 0; // Terminador nulo\n    println(buffer); // \"AAAAAAAAAAAAAAA\"\n}"
            },
            {
              "title": "memcpy: Copiar bloques contiguos de memoria rápidamente",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var origen: int[3];\n    origen[0] = 7; origen[1] = 14; origen[2] = 21;\n\n    var destino: int[3];\n    memcpy(destino, origen, sizeof(int) * 3);\n    println(f\"Copia exitosa: {destino[0]}, {destino[1]}, {destino[2]}\");\n}"
            },
            {
              "title": "memmove: Copia segura incluso con búferes solapados",
              "code": "var texto: char[16] = \"1234567890\";\n// Mover los primeros 5 bytes 2 posiciones hacia la derecha (solapados)\nmemmove(texto + 2, texto, 5);\nprintln(texto);"
            },
            {
              "title": "memcmp: Comparar bytes de dos regiones de memoria",
              "code": "var b1: int[2]; b1[0] = 1; b1[1] = 2;\nvar b2: int[2]; b2[0] = 1; b2[1] = 2;\n\nif (memcmp(b1, b2, sizeof(int) * 2) == 0) {\n    println(\"Los bloques de memoria son exactamente identicos\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-strlen",
          "title": "strlen & strdup",
          "category": "fundamental",
          "type": "fn",
          "summary": "Cálculo de longitud y duplicación de cadenas en el heap.",
          "signature": "fn strlen(str: char*) -> int; fn strdup(src: char*) -> char*;",
          "what": "strlen calcula la cantidad de caracteres sin incluir el byte nulo. strdup reserva memoria nueva con malloc, copia la cadena y retorna el nuevo puntero.",
          "how": "strlen lee secuencialmente bytes hasta hallar 0. strdup mide con strlen, asigna len + 1 con malloc y ejecuta strcpy.",
          "params": [
            {
              "name": "str / src",
              "type": "char*",
              "desc": "Puntero a la cadena de caracteres."
            }
          ],
          "returns": "int con la longitud, o char* con la copia en heap",
          "examples": [
            {
              "title": "strlen: Medir longitud de una cadena de caracteres",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var frase: char* = \"Lenguaje Itsuki v5.5\";\n    var len: int = strlen(frase);\n    println(f\"La frase tiene {len} caracteres.\");\n}"
            },
            {
              "title": "strdup: Duplicar cadena en memoria heap nueva",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var original: char* = \"Cadena original\";\n    var clon: char* = strdup(original);\n    println(f\"Clon en heap: {clon}\");\n    free(clon); // Obligatorio liberar tras strdup\n}"
            }
          ]
        },
        {
          "id": "fundamental-string-ops",
          "title": "strcpy, strncpy, strcat, strncat, strcmp, strncmp, strstr",
          "category": "fundamental",
          "type": "fn",
          "summary": "Operaciones clásicas de cadenas de caracteres estilo C.",
          "signature": "strcpy(dest, src) | strcat(dest, src) | strcmp(s1, s2) | strstr(haystack, needle)",
          "what": "Funciones fundamentales de manipulación de cadenas: copia limitada o total, concatenación, comparación léxica y búsqueda de subcadenas.",
          "how": "strcmp retorna 0 si ambas cadenas son idénticas, <0 si s1 es menor o >0 si s1 es mayor. strstr retorna un puntero a la primera aparición de needle.",
          "params": [
            {
              "name": "dest",
              "type": "char*",
              "desc": "Búfer de destino con capacidad suficiente."
            },
            {
              "name": "src / needle",
              "type": "char*",
              "desc": "Cadena fuente o aguja de búsqueda."
            },
            {
              "name": "n",
              "type": "int",
              "desc": "Número máximo de caracteres a copiar o comparar."
            }
          ],
          "returns": "Puntero a la cadena resultante o entero de comparación",
          "examples": [
            {
              "title": "strcpy: Copiar cadena completa a un búfer destino",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var destino: char[32];\n    strcpy(destino, \"Texto copiado con strcpy\");\n    println(destino);\n}"
            },
            {
              "title": "strncpy: Copia segura acotada a N caracteres",
              "code": "var buf: char[10];\nstrncpy(buf, \"TextoMuyLargoQueNoCabe\", 9);\nbuf[9] = 0; // Asegurar byte nulo\nprintln(buf); // \"TextoMuyL\""
            },
            {
              "title": "strcat: Concatenar cadena al final de otra",
              "code": "var saludo: char[32] = \"Hola \";\nstrcat(saludo, \"Mundo!\");\nprintln(saludo); // \"Hola Mundo!\""
            },
            {
              "title": "strncat: Concatenar hasta un máximo de N caracteres",
              "code": "var prefijo: char[32] = \"Archivo_\";\nstrncat(prefijo, \"reporte_anual_2026.log\", 7);\nprintln(prefijo); // \"Archivo_reporte\""
            },
            {
              "title": "strcmp: Comparación léxica de dos cadenas",
              "code": "var pass1: char* = \"secreto123\";\nvar pass2: char* = \"secreto123\";\n\nif (strcmp(pass1, pass2) == 0) {\n    println(\"Acceso concedido: las contrasenas coinciden\");\n}"
            },
            {
              "title": "strncmp: Comparar solo los primeros N caracteres",
              "code": "if (strncmp(\"https://itsuki.org\", \"https://\", 8) == 0) {\n    println(\"El protocolo es HTTPS seguro\");\n}"
            },
            {
              "title": "strstr: Buscar la primera aparición de una subcadena",
              "code": "var haystack: char* = \"Compilador Itsuki nativo para x86_64\";\nvar needle: char* = strstr(haystack, \"Itsuki\");\nif (needle != 0) {\n    println(f\"Subcadena hallada: {needle}\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-char-at",
          "title": "char_at, set_char_at, strchr, strrchr",
          "category": "fundamental",
          "type": "fn",
          "summary": "Acceso indexado directo a caracteres y búsqueda de bytes de izquierda a derecha y reversa.",
          "signature": "fn char_at(str: char*, idx: int) -> int; fn set_char_at(str: char*, idx: int, ch: int) -> void;",
          "what": "Permite leer y mutar caracteres de una cadena en un índice específico con validación, y encontrar la primera o última aparición de un carácter con strchr y strrchr.",
          "how": "char_at desreferencia *(str + idx) como entero sin signo. strchr recorre hacia adelante y strrchr recorre hasta el nulo final y busca hacia atrás.",
          "params": [
            {
              "name": "str",
              "type": "char*",
              "desc": "Puntero a la cadena."
            },
            {
              "name": "index / idx",
              "type": "int",
              "desc": "Índice del carácter (0 a N-1)."
            },
            {
              "name": "ch / c",
              "type": "int",
              "desc": "Código ASCII del carácter a asignar o buscar."
            }
          ],
          "returns": "int con el código ASCII o char* con la dirección del carácter encontrado",
          "examples": [
            {
              "title": "char_at: Leer carácter en un índice específico",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var str: char* = \"Itsuki\";\n    var c0: int = char_at(str, 0); // 'I' (ASCII 73)\n    var c3: int = char_at(str, 3); // 'u' (ASCII 117)\n    println(f\"Primer caracter: {c0}, Cuarto: {c3}\");\n}"
            },
            {
              "title": "set_char_at: Mutar un carácter en el índice indicado",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var texto: char[16] = \"gato\";\n    set_char_at(texto, 0, 'p');\n    println(texto); // \"pato\"\n}"
            },
            {
              "title": "strchr: Encontrar la primera aparición de un carácter",
              "code": "var ruta: char* = \"/usr/local/bin/itsuki\";\nvar primer_slash: char* = strchr(ruta, '/');\nprintln(primer_slash);"
            },
            {
              "title": "strrchr: Encontrar la última aparición de un carácter (reversa)",
              "code": "var ruta: char* = \"C:\\\\itsuki\\\\bin\\\\itsuki.exe\";\nvar nombre_archivo: char* = strrchr(ruta, '\\\\');\nif (nombre_archivo != 0) {\n    println(f\"Archivo: {nombre_archivo + 1}\"); // \"itsuki.exe\"\n}"
            }
          ]
        },
        {
          "id": "fundamental-char-classify",
          "title": "is_digit, is_alpha, is_alnum, is_space, to_upper, to_lower",
          "category": "fundamental",
          "type": "fn",
          "summary": "Clasificación y transformación de caracteres individuales.",
          "signature": "fn is_digit(c: int) -> int; fn is_alpha(c: int) -> int; fn to_upper(c: int) -> int;",
          "what": "Verifica si un carácter es numérico, alfabético, espacio o alfanumérico, y permite transformarlo entre mayúsculas y minúsculas.",
          "how": "Compara rangos ASCII ('0'-'9', 'a'-'z', 'A'-'Z') en instrucciones condicionales de una sola instrucción de CPU.",
          "params": [
            {
              "name": "c",
              "type": "int",
              "desc": "Código ASCII del carácter."
            }
          ],
          "returns": "int (1 si cumple la condición, 0 si no) o el carácter transformado",
          "examples": [
            {
              "title": "is_digit, is_alpha, is_alnum, is_space",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var d: int = is_digit('9'); // 1\n    var a: int = is_alpha('W'); // 1\n    var an: int = is_alnum('7'); // 1\n    var s: int = is_space(' '); // 1\n    println(f\"Digit: {d}, Alpha: {a}, Alnum: {an}, Space: {s}\");\n}"
            },
            {
              "title": "is_upper, is_lower y is_xdigit",
              "code": "var u: int = is_upper('A'); // 1\nvar l: int = is_lower('z'); // 1\nvar x: int = is_xdigit('F'); // 1 (hexadecimal)\nprintln(f\"Upper: {u}, Lower: {l}, Xdigit: {x}\");"
            },
            {
              "title": "to_upper y to_lower: Transformación de caja",
              "code": "var mayus: char = to_upper('m'); // 'M'\nvar minus: char = to_lower('G'); // 'g'\nprintln(f\"Mayuscula: {mayus}, Minuscula: {minus}\");"
            }
          ]
        },
        {
          "id": "fundamental-conversions",
          "title": "atoi, itoa, htoi",
          "category": "fundamental",
          "type": "fn",
          "summary": "Conversión bidireccional entre texto y representaciones numéricas enteras y hexadecimales.",
          "signature": "fn atoi(str: char*) -> int; fn itoa(val: int, dest: char*, radix: int) -> char*;",
          "what": "Convierte cadenas a números enteros (atoi), números a cadenas con base dada (itoa) y texto hexadecimal a entero (htoi).",
          "how": "atoi procesa signo y multiplica por 10 iterativamente. itoa toma el módulo de la base y genera dígitos en orden inverso antes de revertirlos.",
          "params": [
            {
              "name": "str / val",
              "type": "char* | int",
              "desc": "Dato a convertir."
            },
            {
              "name": "dest",
              "type": "char*",
              "desc": "Búfer de destino para itoa."
            },
            {
              "name": "radix",
              "type": "int",
              "desc": "Base numérica (ej. 10 para decimal, 16 para hex, 2 para binario)."
            }
          ],
          "returns": "int convertido o char* al búfer de destino",
          "examples": [
            {
              "title": "atoi: Convertir texto a número entero decimal",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var n: int = atoi(\"2026\");\n    println(f\"Ano computado: {n + 1}\"); // 2027\n}"
            },
            {
              "title": "itoa: Convertir número a texto con radix dado",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var buf_dec: char[32];\n    var buf_bin: char[32];\n    itoa(42, buf_dec, 10); // Base 10 decimal -> \"42\"\n    itoa(42, buf_bin, 2);  // Base 2 binaria -> \"101010\"\n    println(f\"Decimal: {buf_dec} | Binario: {buf_bin}\");\n}"
            },
            {
              "title": "htoi: Convertir cadena hexadecimal a entero",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var valor: int = htoi(\"FF\"); // 255\n    println(f\"0xFF en decimal es: {valor}\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-numeric",
          "title": "abs, min, max, clamp, pow, sqrt, gcd, lcm, rand, srand",
          "category": "fundamental",
          "type": "fn",
          "summary": "Funciones aritméticas y matemáticas fundamentales para enteros en el módulo base.",
          "signature": "abs(x) | min(a,b) | max(a,b) | clamp(v,min,max) | pow(b,e) | sqrt(x) | gcd(a,b) | rand()",
          "what": "Provee cálculos aritméticos esenciales sin requerir incluir bibliotecas externas complejas.",
          "how": "gcd utiliza el algoritmo euclidiano; sqrt utiliza aproximación de raíz entera por búsqueda binaria; rand implementa un generador LCG (Linear Congruential Generator) de 32 bits rápido.",
          "params": [
            {
              "name": "val / x / a / b",
              "type": "int",
              "desc": "Operandos enteros."
            },
            {
              "name": "seed",
              "type": "int",
              "desc": "Semilla del generador pseudoaleatorio para srand."
            }
          ],
          "returns": "int con el cálculo obtenido",
          "examples": [
            {
              "title": "abs, min, max, clamp: Utilidades numéricas",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    var v_abs: int = abs(-50); // 50\n    var v_min: int = min(10, 20); // 10\n    var v_max: int = max(10, 20); // 20\n    var v_clamp: int = clamp(150, 0, 100); // 100\n    println(f\"Abs: {v_abs}, Min: {v_min}, Max: {v_max}, Clamp: {v_clamp}\");\n}"
            },
            {
              "title": "pow y sqrt: Potencias y raíces cuadradas enteras",
              "code": "var potencia: int = pow(2, 8); // 256\nvar raiz: int = sqrt(100); // 10\nprintln(f\"2^8 = {potencia}, Raiz(100) = {raiz}\");"
            },
            {
              "title": "gcd y lcm: Máximo Común Divisor y Mínimo Común Múltiplo",
              "code": "var mcd: int = gcd(24, 36); // 12\nvar mcm: int = lcm(4, 6);   // 12\nprintln(f\"GCD(24,36) = {mcd}, LCM(4,6) = {mcm}\");"
            },
            {
              "title": "rand y srand: Generación pseudoaleatoria rápida",
              "code": "srand(12345); // Inicializar semilla\nvar r1: int = rand() % 100; // Aleatorio entre 0 y 99\nvar r2: int = rand() % 100;\nprintln(f\"Numeros aleatorios: {r1}, {r2}\");"
            }
          ]
        },
        {
          "id": "fundamental-vector",
          "title": "struct Vector & Operaciones",
          "category": "fundamental",
          "type": "struct",
          "summary": "Arreglo dinámico redimensionable de enteros con crecimiento automático.",
          "signature": "vector_init(v, cap) | vector_push(v, val) | vector_pop(v) | vector_get(v, idx) | vector_free(v)",
          "what": "Implementación nativa de un Vector dinámico (equivalente a std::vector en C++ o ArrayList en Java). Crece dinámicamente duplicando su capacidad cuando se llena.",
          "how": "Usa data: int*, size: int, capacity: int. En vector_push, cuando size >= capacity, reserva el doble de memoria con malloc, copia los elementos anteriores, libera el bloque viejo y añade el nuevo valor.",
          "params": [
            {
              "name": "vector_init(v, cap)",
              "type": "función",
              "desc": "Inicializa el vector con la capacidad inicial dada."
            },
            {
              "name": "vector_push(v, val)",
              "type": "función",
              "desc": "Inserta un elemento al final del vector, redimensionando si es necesario."
            },
            {
              "name": "vector_pop(v)",
              "type": "función",
              "desc": "Elimina y devuelve el último elemento del vector."
            },
            {
              "name": "vector_get(v, idx)",
              "type": "función",
              "desc": "Obtiene el elemento en el índice dado con comprobación de límites."
            },
            {
              "name": "vector_free(v)",
              "type": "función",
              "desc": "Libera la memoria interna del arreglo dinámico."
            }
          ],
          "returns": "Estructura Vector y funciones asociadas",
          "examples": [
            {
              "title": "vector_init y vector_push: Creación e inserción",
              "code": "#include <fundamental.huki>\nusing namespace fundamental;\n\nfn main() -> void {\n    var v: struct Vector;\n    vector_init(&v, 4); // Capacidad inicial 4\n\n    vector_push(&v, 10);\n    vector_push(&v, 20);\n    vector_push(&v, 30);\n    println(f\"Elementos en vector: {v.size}\"); // 3\n    vector_free(&v);\n}"
            },
            {
              "title": "vector_get y vector_set: Lectura y mutación indexada",
              "code": "var v: struct Vector;\nvector_init(&v, 2);\nvector_push(&v, 100);\nvector_set(&v, 0, 999); // Cambiar el valor en índice 0\nvar val: int = vector_get(&v, 0); // 999\nprintln(f\"Valor modificado: {val}\");\nvector_free(&v);"
            },
            {
              "title": "vector_pop: Extraer el último elemento",
              "code": "var v: struct Vector;\nvector_init(&v, 4);\nvector_push(&v, 5);\nvector_push(&v, 15);\n\nvar ultimo: int = vector_pop(&v); // 15\nprintln(f\"Extraido: {ultimo}, tamano restante: {v.size}\"); // 1\nvector_free(&v);"
            }
          ]
        },
        {
          "id": "fundamental-qsort",
          "title": "qsort, binary_search, reverse_array",
          "category": "fundamental",
          "type": "fn",
          "summary": "Algoritmos clásicos de ordenamiento rápido, búsqueda binaria e inversión in-place.",
          "signature": "qsort(arr, low, high) | binary_search(arr, n, target) | reverse_array(arr, n)",
          "what": "Ordena arreglos de enteros en tiempo O(N log N) con particionamiento in-place, realiza búsquedas binarias en O(log N) e invierte el orden de arreglos contiguos.",
          "how": "QuickSort utiliza el esquema de partición de Lomuto con llamadas recursivas optimizadas. BinarySearch divide iterativamente los límites left y right. ReverseArray intercambia los punteros extremos hacia el centro.",
          "params": [
            {
              "name": "arr",
              "type": "int*",
              "desc": "Puntero al arreglo de enteros."
            },
            {
              "name": "low",
              "type": "int",
              "desc": "Índice inicial (usualmente 0)."
            },
            {
              "name": "high",
              "type": "int",
              "desc": "Índice final (usualmente longitud - 1)."
            },
            {
              "name": "target",
              "type": "int",
              "desc": "Valor a buscar en el arreglo ordenado."
            }
          ],
          "returns": "void para qsort; índice del elemento encontrado o -1 para binary_search",
          "examples": [
            {
              "title": "qsort: Ordenamiento in-place en O(N log N)",
              "code": "#include <fundamental.huki>\nusing namespace fundamental;\n\nfn main() -> void {\n    var arr: int[6];\n    arr[0] = 45; arr[1] = 12; arr[2] = 85; arr[3] = 32; arr[4] = 89; arr[5] = 39;\n\n    qsort(arr, 0, 5); // Ordena de menor a mayor\n    println(f\"Arreglo ordenado: {arr[0]}, {arr[1]}, {arr[2]}, {arr[3]}, {arr[4]}, {arr[5]}\");\n}"
            },
            {
              "title": "binary_search: Búsqueda binaria en arreglo ordenado",
              "code": "var arr: int[5];\narr[0] = 10; arr[1] = 20; arr[2] = 30; arr[3] = 40; arr[4] = 50;\n\nvar pos: int = binary_search(arr, 5, 40); // Retorna índice 3\nprintln(f\"El numero 40 esta en la posicion: {pos}\");"
            },
            {
              "title": "reverse_array: Invertir el orden de elementos",
              "code": "var arr: int[4];\narr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4;\nreverse_array(arr, 4); // Ahora contiene: 4, 3, 2, 1\nprintln(f\"Invertido: {arr[0]}, {arr[1]}, {arr[2]}, {arr[3]}\");"
            }
          ]
        },
        {
          "id": "fundamental-file",
          "title": "file_exists, file_size, file_read_all, file_write_all, file_append, file_remove",
          "category": "fundamental",
          "type": "fn",
          "summary": "Operaciones de alto nivel de lectura, escritura, anexado y eliminación de archivos.",
          "signature": "file_exists(path) | file_size(path) | file_read_all(p, buf, max) | file_write_all(p, c)",
          "what": "Provee funciones sencillas para interactuar con el sistema de archivos: verificar existencia, tamaño, anexar contenido, volcar texto completo o borrar archivos.",
          "how": "Abre el descriptor mediante fopen() en modo binario ('rb', 'wb', 'ab'), ejecuta fread/fwrite, garantiza terminación nula y cierra el descriptor limpiamente.",
          "params": [
            {
              "name": "path",
              "type": "char*",
              "desc": "Ruta del archivo en el sistema de archivos."
            },
            {
              "name": "content / buf",
              "type": "char*",
              "desc": "Búfer de datos a escribir o donde almacenar la lectura."
            },
            {
              "name": "max_len",
              "type": "int",
              "desc": "Capacidad máxima en bytes del búfer receptor."
            }
          ],
          "returns": "int (1 para éxito / bytes leídos, 0 en caso de error)",
          "examples": [
            {
              "title": "file_write_all y file_read_all: Escritura y lectura completa",
              "code": "#include <fundamental.huki>\nusing namespace fundamental;\n\nfn main() -> void {\n    file_write_all(\"mensaje.txt\", \"Hola desde el sistema de archivos de Itsuki!\");\n\n    var contenido: char[128];\n    var bytes: int = file_read_all(\"mensaje.txt\", contenido, 128);\n    println(f\"Leidos {bytes} bytes: {contenido}\");\n}"
            },
            {
              "title": "file_append: Anexar líneas al final del archivo",
              "code": "file_append(\"registro.log\", \"Evento 1: Servidor iniciado\\n\");\nfile_append(\"registro.log\", \"Evento 2: Cliente conectado\\n\");"
            },
            {
              "title": "file_exists y file_size: Comprobación y tamaño en bytes",
              "code": "if (file_exists(\"registro.log\")) {\n    var tamano: int = file_size(\"registro.log\");\n    println(f\"El archivo existe y mide {tamano} bytes.\");\n}"
            },
            {
              "title": "file_remove: Eliminar un archivo de disco",
              "code": "if (file_remove(\"temporal.tmp\")) {\n    println(\"Archivo temporal eliminado correctamente\");\n}"
            }
          ]
        },
        {
          "id": "fundamental-os",
          "title": "exit, sleep, get_tick_count, time",
          "category": "fundamental",
          "type": "fn",
          "summary": "Interacción con el sistema operativo, control de procesos y temporizadores.",
          "signature": "fn exit(code: int) -> void; fn sleep(ms: int) -> void; fn get_tick_count() -> int;",
          "what": "Termina el proceso actual con código de estado, suspende la ejecución durante N milisegundos o consulta marcas de reloj del sistema.",
          "how": "Llama a las APIs nativas del SO (Sleep() y GetTickCount() en Windows; usleep() y clock_gettime() en Linux).",
          "params": [
            {
              "name": "code",
              "type": "int",
              "desc": "Código de salida del proceso (0 = éxito)."
            },
            {
              "name": "ms",
              "type": "int",
              "desc": "Milisegundos a pausar la ejecución."
            }
          ],
          "returns": "void o entero con milisegundos transcurridos",
          "examples": [
            {
              "title": "sleep: Suspender el hilo actual durante milisegundos",
              "code": "#include <fundamental.huki>\n\nfn main() -> void {\n    println(\"Esperando 500ms...\");\n    sleep(500);\n    println(\"Reanudado!\");\n}"
            },
            {
              "title": "get_tick_count y time: Marcas de tiempo de CPU y Unix",
              "code": "var t_cpu: int = get_tick_count();\nvar t_unix: int = time();\nprintln(f\"Tick de CPU: {t_cpu} ms | Timestamp UNIX: {t_unix}\");"
            },
            {
              "title": "exit: Terminar el proceso con código de salida",
              "code": "if (error_critico) {\n    println(\"Error critico detectado. Saliendo...\");\n    exit(1); // Codigo de fallo != 0\n}"
            }
          ]
        }
      ]
    },
    {
      "id": "result",
      "name": "Módulo: result (Manejo de Errores)",
      "icon": "shield-alert",
      "badge": "Seguridad",
      "items": [
        {
          "id": "result-overview",
          "title": "struct Result & Filosofía de Errores",
          "category": "result",
          "type": "struct",
          "summary": "Sistema de manejo seguro de errores tipo Rust/Go sin excepciones invisibles.",
          "signature": "struct Result { is_ok: int; value: int; error_code: int; error_message: char*; };",
          "what": "En lugar de lanzar excepciones que rompen el flujo o retornar valores mágicos (-1, NULL) ambiguos, las funciones que pueden fallar retornan un struct Result* que encapsula el éxito o la razón exacta del fallo.",
          "how": "La estructura se asigna dinámicamente con malloc(sizeof(struct Result)) computando el tamaño exacto tanto para 32 como 64 bits. Contiene una bandera booleana is_ok, el value resultante en caso de éxito, y un código numérico con mensaje explicativo en caso de error.",
          "examples": [
            {
              "title": "Patrón Result idiomático",
              "code": "#include <fundamental.huki>\n#include <result.huki>\n\nfn abrir_conexion(puerto: int) -> struct Result* {\n    if (puerto < 1024) {\n        return result_err(403, \"Requiere privilegios de administrador\");\n    }\n    return result_ok(puerto);\n}"
            }
          ]
        },
        {
          "id": "result-ok-err",
          "title": "result_ok & result_err",
          "category": "result",
          "type": "fn",
          "summary": "Constructores para empaquetar resultados exitosos o errores con código y mensaje.",
          "signature": "fn result_ok(val: int) -> struct Result*; fn result_err(code: int, msg: char*) -> struct Result*;",
          "what": "result_ok crea un contenedor con is_ok = 1 y almacena el valor devuelto. result_err crea un contenedor con is_ok = 0, código de error y mensaje explicativo.",
          "how": "Asigna memoria con malloc(sizeof(struct Result)), inicializa los campos correspondientes y retorna el puntero estructurado listo para ser consumido.",
          "params": [
            {
              "name": "val",
              "type": "int",
              "desc": "Valor retornado en caso de éxito."
            },
            {
              "name": "code",
              "type": "int",
              "desc": "Código entero representativo del error."
            },
            {
              "name": "msg",
              "type": "char*",
              "desc": "Mensaje descriptivo del error."
            }
          ],
          "returns": "struct Result*",
          "examples": [
            {
              "title": "result_ok: Empaquetar resultado exitoso",
              "code": "#include <fundamental.huki>\n#include <result.huki>\n\nfn dividir(a: int, b: int) -> struct Result* {\n    if (b == 0) {\n        return result_err(101, \"Division por cero no permitida\");\n    }\n    return result_ok(a / b);\n}\n\nfn main() -> void {\n    var res: struct Result* = dividir(10, 2);\n    if (result_is_ok(res)) {\n        println(f\"Resultado: {result_unwrap(res)}\"); // 5\n    }\n    result_free(res);\n}"
            },
            {
              "title": "result_err: Empaquetar fallo con código y mensaje",
              "code": "var fallo: struct Result* = dividir(10, 0);\nprintln(f\"Error [{result_error_code(fallo)}]: {result_error_msg(fallo)}\");\nresult_free(fallo);"
            }
          ]
        },
        {
          "id": "result-unwrap",
          "title": "result_unwrap & result_unwrap_or",
          "category": "result",
          "type": "fn",
          "summary": "Extrae el valor seguro o aplica un valor por defecto si hubo error.",
          "signature": "fn result_unwrap(r: struct Result*) -> int; fn result_unwrap_or(r: struct Result*, default_val: int) -> int;",
          "what": "result_unwrap extrae el valor value asegurando que fue exitoso; si era un error, imprime el diagnóstico y finaliza de forma segura. result_unwrap_or retorna un valor por defecto seguro en caso de fallo.",
          "how": "Verifica r != 0 && r->is_ok == 1. Si se cumple, extrae directamente r->value. En caso contrario, result_unwrap emite a stderr y sale con código 1, mientras que result_unwrap_or retorna default_val sin interrumpir la ejecución.",
          "params": [
            {
              "name": "r",
              "type": "struct Result*",
              "desc": "Puntero al contenedor Result."
            },
            {
              "name": "default_val",
              "type": "int",
              "desc": "Valor de fallback si el resultado contiene un error."
            }
          ],
          "returns": "int (el valor encapsulado o default_val)",
          "examples": [
            {
              "title": "result_unwrap: Extraer valor con verificación de seguridad",
              "code": "var r: struct Result* = result_ok(42);\nvar val: int = result_unwrap(r); // 42 (si fuera error, sale limpiamente)\nprintln(f\"Valor desenvuelto: {val}\");\nresult_free(r);"
            },
            {
              "title": "result_unwrap_or: Extraer valor o retornar fallback por defecto",
              "code": "var r_error: struct Result* = result_err(404, \"No encontrado\");\nvar puerto: int = result_unwrap_or(r_error, 8080); // Retorna 8080 sin abortar\nprintln(f\"Puerto aplicado: {puerto}\");\nresult_free(r_error);"
            }
          ]
        },
        {
          "id": "result-checks",
          "title": "result_is_ok, result_is_err, result_error_msg, result_error_code, result_free",
          "category": "result",
          "type": "fn",
          "summary": "Inspección de estado y liberación de recursos de la estructura Result.",
          "signature": "result_is_ok(r) | result_is_err(r) | result_error_msg(r) | result_free(r)",
          "what": "Funciones utilitarias para consultar el estado sin peligro de segmentation fault y liberar la memoria al terminar.",
          "how": "Manejan punteros nulos de forma robusta retornando 0 o 1 apropiadamente sin colapsar.",
          "params": [
            {
              "name": "r",
              "type": "struct Result*",
              "desc": "Puntero a la estructura Result."
            }
          ],
          "returns": "int booleano, código de error o char* con el mensaje",
          "examples": [
            {
              "title": "result_is_ok y result_is_err: Consultar estado sin abortar",
              "code": "var r: struct Result* = operacion_red();\nif (result_is_ok(r)) {\n    println(\"Operacion completada con exito\");\n} else if (result_is_err(r)) {\n    println(f\"Fallo detectado: {result_error_msg(r)}\");\n}"
            },
            {
              "title": "result_free: Liberar la memoria asignada en el heap",
              "code": "result_free(r); // Libera la estructura struct Result* y sus buffers"
            }
          ]
        }
      ]
    },
    {
      "id": "string-lib",
      "name": "Módulo: string",
      "icon": "file-text",
      "badge": "StdLib",
      "items": [
        {
          "id": "string-struct",
          "title": "struct String (Búfer Dinámico)",
          "category": "string-lib",
          "type": "struct",
          "summary": "Cadena dinámica mutable con longitud rastreada y capacidad auto-expandible.",
          "signature": "struct String { buffer: char*; length: int; capacity: int; };",
          "what": "A diferencia de las cadenas clásicas de C (char*) que requieren medir la longitud manualmente con O(N), struct String mantiene la longitud O(1) y gestiona memoria automáticamente.",
          "how": "Alcanzar el límite de capacidad provoca una reasignación con factor de crecimiento x2, garantizando coste amortizado O(1) en operaciones de append.",
          "examples": [
            {
              "title": "Creación y concatenación dinámica",
              "code": "#include <fundamental.huki>\n#include <string.huki>\n\nfn main() -> void {\n    var s: struct String* = string_new();\n    string_append(s, \"Lenguaje \");\n    string_append(s, \"Itsuki\");\n    string_append_int(s, 5);\n\n    println(string_c_str(s)); // \"Lenguaje Itsuki5\"\n    string_free(s);\n}"
            }
          ]
        },
        {
          "id": "string-methods-all",
          "title": "Métodos de struct String",
          "category": "string-lib",
          "type": "fn",
          "summary": "string_new, string_from, string_append, string_append_char, string_clone, string_equals",
          "signature": "string_new() | string_append(s, txt) | string_c_str(s) | string_equals(s1, s2)",
          "what": "Conjunto completo de primitivas orientadas a objetos sobre el tipo struct String: creación, inserción de texto, enteros, caracteres, consulta de longitud y comparación estricta.",
          "how": "Gestiona búferes contiguos con factor de crecimiento x2. string_c_str asegura que siempre haya un terminador nulo '\\0' al final sin alterar length.",
          "params": [
            {
              "name": "string_new()",
              "type": "constructor",
              "desc": "Crea una cadena vacía con capacidad inicial de 16 bytes."
            },
            {
              "name": "string_from(src)",
              "type": "constructor",
              "desc": "Crea una nueva cadena copiando el texto literal de C src."
            },
            {
              "name": "string_append(s, txt)",
              "type": "método",
              "desc": "Añade texto al final del búfer dinámico."
            },
            {
              "name": "string_append_char(s, c)",
              "type": "método",
              "desc": "Inserta un carácter individual al final."
            },
            {
              "name": "string_length(s)",
              "type": "método",
              "desc": "Retorna la cantidad de caracteres en O(1)."
            },
            {
              "name": "string_clone(s)",
              "type": "método",
              "desc": "Produce una copia independiente en memoria nueva."
            }
          ],
          "returns": "struct String* o valores correspondientes",
          "examples": [
            {
              "title": "string_new y string_from: Inicializar cadenas dinámicas",
              "code": "#include <fundamental.huki>\n#include <string.huki>\n\nfn main() -> void {\n    var s1: struct String* = string_new(); // Vacio\n    var s2: struct String* = string_from(\"Itsuki v5.5\"); // Con texto inicial\n    println(string_c_str(s2));\n    string_free(s1);\n    string_free(s2);\n}"
            },
            {
              "title": "string_append, string_append_char y string_append_int",
              "code": "var s: struct String* = string_from(\"Usuario_\");\nstring_append(s, \"ID\");\nstring_append_char(s, ':');\nstring_append_int(s, 1042);\nprintln(string_c_str(s)); // \"Usuario_ID:1042\"\nstring_free(s);"
            },
            {
              "title": "string_append_str: Concatenar dos objetos String",
              "code": "var a: struct String* = string_from(\"Hola \");\nvar b: struct String* = string_from(\"Mundo\");\nstring_append_str(a, b);\nprintln(string_c_str(a)); // \"Hola Mundo\"\nstring_free(a);\nstring_free(b);"
            },
            {
              "title": "string_get y string_set_char: Lectura y mutación de caracteres",
              "code": "var s: struct String* = string_from(\"pato\");\nstring_set_char(s, 0, 'g');\nprintln(string_c_str(s)); // \"gato\"\nvar primero: int = string_get(s, 0); // 'g'\nstring_free(s);"
            },
            {
              "title": "string_equals y string_clone: Comparación y clonación",
              "code": "var original: struct String* = string_from(\"Alpha\");\nvar clon: struct String* = string_clone(original);\n\nif (string_equals(original, clon)) {\n    println(\"Las cadenas dinamicas son identicas\");\n}\nstring_free(original);\nstring_free(clon);"
            }
          ]
        },
        {
          "id": "string-slice-search",
          "title": "str_substring, str_slice, str_contains, str_starts_with, str_ends_with",
          "category": "string-lib",
          "type": "fn",
          "summary": "Corte y extracción de subcadenas y comprobación de prefijos, sufijos y contenidos.",
          "signature": "str_substring(s, ini, len) | str_slice(s, start, end) | str_contains(h, n) | str_starts_with(s, p)",
          "what": "Funciones no destructivas para extraer porciones de texto o verificar si una cadena comienza, termina o contiene determinado fragmento.",
          "how": "Asigna un nuevo búfer con malloc(len + 1) para subcadenas, asegurando que la cadena fuente original permanezca inmutable.",
          "params": [
            {
              "name": "str_substring(src, start, len)",
              "type": "función",
              "desc": "Extrae len caracteres a partir del índice start."
            },
            {
              "name": "str_slice(src, start, end)",
              "type": "función",
              "desc": "Extrae el rango [start, end) de la cadena."
            },
            {
              "name": "str_contains(h, n)",
              "type": "función",
              "desc": "Devuelve 1 si la aguja n se encuentra en h."
            },
            {
              "name": "str_starts_with(str, prefix)",
              "type": "función",
              "desc": "Devuelve 1 si str inicia con el prefijo prefix."
            }
          ],
          "returns": "char* con la subcadena creada o int con valor booleano (1 o 0)",
          "examples": [
            {
              "title": "str_substring y str_slice: Extraer porciones de texto",
              "code": "#include <fundamental.huki>\n#include <string.huki>\n\nfn main() -> void {\n    var texto: char* = \"LenguajeItsuki\";\n    var sub: char* = str_substring(texto, 8, 6); // \"Itsuki\"\n    var slice: char* = str_slice(texto, 0, 8);   // \"Lenguaje\"\n    println(f\"Sub: {sub} | Slice: {slice}\");\n}"
            },
            {
              "title": "str_contains, str_starts_with y str_ends_with: Predicados",
              "code": "var ruta: char* = \"https://itsuki.org/manual.pdf\";\nvar es_https: int = str_starts_with(ruta, \"https://\"); // 1\nvar es_pdf: int = str_ends_with(ruta, \".pdf\"); // 1\nvar tiene_org: int = str_contains(ruta, \"itsuki\"); // 1\nprintln(f\"Https: {es_https}, PDF: {es_pdf}, Org: {tiene_org}\");"
            },
            {
              "title": "str_index_of, str_last_index_of y str_count_char: Búsqueda y conteo",
              "code": "var frase: char* = \"banana\";\nvar pos_primera: int = str_index_of(frase, \"na\"); // 2\nvar pos_ultima_a: int = str_last_index_of(frase, 'a'); // 5\nvar total_a: int = str_count_char(frase, 'a'); // 3\nprintln(f\"Primera 'na': {pos_primera}, Ultima 'a': {pos_ultima_a}, Total 'a': {total_a}\");"
            }
          ]
        },
        {
          "id": "string-transform",
          "title": "str_trim, str_replace, str_to_upper, str_to_lower, str_pad_left, str_reverse",
          "category": "string-lib",
          "type": "fn",
          "summary": "Transformación, limpieza, reemplazo, relleno y reversión de cadenas.",
          "signature": "str_trim(s) | str_replace(src, find, rep) | str_pad_left(s, len, ch) | str_reverse(s)",
          "what": "Colección exhaustiva de utilidades funcionales para limpiar espacios en blanco, reemplazar patrones, invertir texto y dar formato con padding.",
          "how": "Cada operación asigna un búfer nuevo en memoria para el resultado, garantizando que no existan mutaciones no deseadas sobre las cadenas originales.",
          "params": [
            {
              "name": "str_trim(s)",
              "type": "función",
              "desc": "Remueve espacios en blanco al inicio y al final."
            },
            {
              "name": "str_replace(src, f, r)",
              "type": "función",
              "desc": "Reemplaza todas las apariciones de f por r."
            },
            {
              "name": "str_pad_left(s, len, ch)",
              "type": "función",
              "desc": "Rellena a la izquierda con el carácter ch hasta alcanzar len."
            },
            {
              "name": "str_reverse(s)",
              "type": "función",
              "desc": "Retorna una nueva cadena con los caracteres en orden inverso."
            }
          ],
          "returns": "char* con el texto transformado",
          "examples": [
            {
              "title": "str_concat, str_repeat y str_copy: Generación de cadenas",
              "code": "#include <fundamental.huki>\n#include <string.huki>\n\nfn main() -> void {\n    var union_str: char* = str_concat(\"Itsuki \", \"Compiler\"); // \"Itsuki Compiler\"\n    var estrellas: char* = str_repeat(\"*\", 5); // \"*****\"\n    var copia: char* = str_copy(union_str);\n    println(f\"{estrellas} {copia} {estrellas}\");\n}"
            },
            {
              "title": "str_replace y str_reverse: Reemplazo e inversión",
              "code": "var texto: char* = \"hola mundo\";\nvar reemplazado: char* = str_replace(texto, \"mundo\", \"itsuki\"); // \"hola itsuki\"\nvar invertido: char* = str_reverse(reemplazado);\nprintln(f\"Reemplazado: {reemplazado} | Invertido: {invertido}\");"
            },
            {
              "title": "str_trim, str_trim_left y str_trim_right: Limpieza de espacios",
              "code": "var sucio: char* = \"   espacios   \";\nvar limpio: char* = str_trim(sucio); // \"espacios\"\nprintln(f\"Limpio: '{limpio}'\");"
            },
            {
              "title": "str_pad_left y str_pad_right: Relleno de texto",
              "code": "var codigo: char* = \"42\";\nvar formateado: char* = str_pad_left(codigo, 5, '0'); // \"00042\"\nprintln(f\"Codigo con padding: {formateado}\");"
            },
            {
              "title": "str_compare y str_compare_ignore_case: Comparación alfabética",
              "code": "var c1: int = str_compare(\"abc\", \"abd\"); // < 0\nvar c2: int = str_compare_ignore_case(\"ITSUKI\", \"itsuki\"); // 0 (coinciden)\nprintln(f\"Case-insensitive: {c2}\");"
            },
            {
              "title": "str_from_int y str_to_int: Conversión texto/entero",
              "code": "var t: char* = str_from_int(1234); // \"1234\"\nvar n: int = str_to_int(\"5678\");   // 5678\nprintln(f\"Texto: {t}, Entero: {n}\");"
            }
          ]
        }
      ]
    },
    {
      "id": "math-lib",
      "name": "Módulo: math",
      "icon": "percent",
      "badge": "StdLib",
      "items": [
        {
          "id": "math-constants",
          "title": "Constantes Matemáticas",
          "category": "math-lib",
          "type": "const",
          "summary": "PI_APPROX, E_APPROX, SQRT2_APPROX, TRIG_SCALE, MAX_INT, MIN_INT.",
          "signature": "const int PI_APPROX = 31416; const int TRIG_SCALE = 1000; ...",
          "what": "Constantes numéricas universales escaladas para permitir cálculos matemáticos rápidos de alta precisión utilizando aritmética entera de 32 bits.",
          "how": "PI_APPROX (31416) y E_APPROX (27183) están escalados por 10000. TRIG_SCALE (1000) permite representar valores trigonométricos entre -1.0 y 1.0 como enteros entre -1000 y 1000.",
          "examples": [
            {
              "title": "Uso de constantes escaladas",
              "code": "#include <fundamental.huki>\n#include <math.huki>\n\nfn main() -> void {\n    println(f\"Pi aproximado: {math::PI_APPROX} / 10000\");\n    println(f\"Escala trigonometrica: {math::TRIG_SCALE}\");\n}"
            }
          ]
        },
        {
          "id": "math-trig",
          "title": "Trigonometría (sin_deg, cos_deg, tan_deg)",
          "category": "math-lib",
          "type": "fn",
          "summary": "Cálculo de seno, coseno y tangente en grados sexagesimales escalados x1000.",
          "signature": "fn math::sin_deg(deg: int) -> int; fn math::cos_deg(deg: int) -> int;",
          "what": "Calcula las razones trigonométricas de un ángulo dado directamente en grados (0° a 360°), evitando conversiones engorrosas a radianes y sobrecostos de FPU.",
          "how": "Utiliza aproximaciones polinomiales de Chebyshev y tablas de dispersión enteras escaladas por TRIG_SCALE = 1000 (1.0 = 1000).",
          "params": [
            {
              "name": "deg",
              "type": "int",
              "desc": "Ángulo en grados sexagesimales (ej. 0, 30, 45, 90, 180)."
            }
          ],
          "returns": "int escalado x1000 (ej. sin_deg(90) retorna 1000, sin_deg(30) retorna 500)",
          "examples": [
            {
              "title": "sin_deg, cos_deg y tan_deg: Trigonometría en grados sexagesimales",
              "code": "#include <fundamental.huki>\n#include <math.huki>\nusing namespace math;\n\nfn main() -> void {\n    // Valores escalados por TRIG_SCALE = 1000\n    var s0: int = sin_deg(0);     // 0\n    var s30: int = sin_deg(30);   // 500 (0.5 * 1000)\n    var s90: int = sin_deg(90);   // 1000 (1.0 * 1000)\n    var c0: int = cos_deg(0);     // 1000\n    var t45: int = tan_deg(45);   // ~1000 (1.0 * 1000)\n\n    println(f\"Sin(30): {s30}/1000 | Sin(90): {s90}/1000 | Cos(0): {c0}/1000\");\n}"
            }
          ]
        },
        {
          "id": "math-algebra",
          "title": "Potencias, Raíces y Logaritmos (pow, sqrt, cbrt, log2, log10)",
          "category": "math-lib",
          "type": "fn",
          "summary": "Operaciones algebraicas: potencias enteras, raíces cuadradas y cúbicas, y logaritmos base 2 y 10.",
          "signature": "pow(b, e) | sqrt(x) | cbrt(x) | hypot(a, b) | log2(x) | is_power_of_two(x)",
          "what": "Provee funciones algebraicas enteras optimizadas para cálculo rápido en gráficos, física y algoritmos.",
          "how": "pow utiliza exponenciación binaria O(log N). sqrt utiliza el método babilónico entero con convergencia cuadrática. log2 utiliza instrucciones de conteo de bits (bsr en x86).",
          "params": [
            {
              "name": "base / x / a / b",
              "type": "int",
              "desc": "Valores numéricos de entrada."
            },
            {
              "name": "exp",
              "type": "int",
              "desc": "Exponente entero no negativo."
            }
          ],
          "returns": "int con el resultado entero",
          "examples": [
            {
              "title": "pow, sqrt y cbrt: Potencias, raíces cuadradas y cúbicas",
              "code": "#include <fundamental.huki>\n#include <math.huki>\nusing namespace math;\n\nfn main() -> void {\n    var p: int = pow(3, 4); // 81\n    var r2: int = sqrt(144); // 12\n    var r3: int = cbrt(27);  // 3\n    println(f\"3^4 = {p}, Raiz(144) = {r2}, Raiz3(27) = {r3}\");\n}"
            },
            {
              "title": "hypot, log2 y log10: Hipotenusa y logaritmos enteros",
              "code": "var h: int = hypot(6, 8); // 10\nvar l2: int = log2(1024); // 10\nvar l10: int = log10(10000); // 4\nprintln(f\"Hipotenusa(6,8): {h}, Log2(1024): {l2}, Log10(10000): {l10}\");"
            },
            {
              "title": "is_power_of_two y next_power_of_two: Potencias binarias",
              "code": "var es_pot2: int = is_power_of_two(16); // 1\nvar prox_pot2: int = next_power_of_two(17); // 32\nprintln(f\"Es potencia de 2: {es_pot2}, Proxima potencia: {prox_pot2}\");"
            },
            {
              "title": "clamp, lerp y map_range: Acotado y mapeo de valores",
              "code": "var acotado: int = clamp(120, 0, 100); // 100\nvar interp: int = lerp(0, 100, 50); // 50 (50% entre 0 y 100)\nvar mapeado: int = map_range(5, 0, 10, 0, 100); // 50\nprintln(f\"Clamp: {acotado}, Lerp: {interp}, Map: {mapeado}\");"
            },
            {
              "title": "abs, sign, min, max, min3 y max3",
              "code": "var s: int = sign(-42); // -1\nvar m3: int = min3(15, 8, 23); // 8\nvar mx3: int = max3(15, 8, 23); // 23\nprintln(f\"Signo: {s}, Min3: {m3}, Max3: {mx3}\");"
            }
          ]
        },
        {
          "id": "math-number-theory",
          "title": "Teoría de Números y Combinatoria",
          "category": "math-lib",
          "type": "fn",
          "summary": "gcd, lcm, is_prime, next_prime, factorial, combinations, permutations, fibonacci.",
          "signature": "gcd(a, b) | is_prime(n) | factorial(n) | combinations(n, k) | fibonacci(n)",
          "what": "Funciones avanzadas para números primos, divisores, análisis combinatorio y sucesiones matemáticas.",
          "how": "is_prime evalúa primalidad en O(sqrt N) con descartes rápidos para múltiplos de 2 y 3. combinations calcula n! / (k! * (n-k)!) simplificando factores para prevenir desbordamientos.",
          "params": [
            {
              "name": "n / a / b / k",
              "type": "int",
              "desc": "Parámetros enteros de cómputo."
            }
          ],
          "returns": "int con el resultado",
          "examples": [
            {
              "title": "gcd y lcm: Divisibilidad de números",
              "code": "#include <fundamental.huki>\n#include <math.huki>\nusing namespace math;\n\nfn main() -> void {\n    var divisor: int = gcd(48, 18); // 6\n    var multiplo: int = lcm(4, 5);  // 20\n    println(f\"GCD(48,18): {divisor}, LCM(4,5): {multiplo}\");\n}"
            },
            {
              "title": "is_even y is_odd: Comprobación de paridad",
              "code": "var par: int = is_even(42); // 1\nvar impar: int = is_odd(42); // 0\nprintln(f\"Es par: {par}, Es impar: {impar}\");"
            },
            {
              "title": "is_prime y next_prime: Números primos",
              "code": "var primo: int = is_prime(31); // 1\nvar siguiente: int = next_prime(31); // 37\nprintln(f\"¿31 es primo? {primo}, siguiente: {siguiente}\");"
            },
            {
              "title": "factorial, combinations y permutations: Combinatoria",
              "code": "var fact5: int = factorial(5); // 120\nvar comb: int = combinations(6, 2); // 15\nvar perm: int = permutations(5, 2); // 20\nprintln(f\"5! = {fact5}, C(6,2) = {comb}, P(5,2) = {perm}\");"
            },
            {
              "title": "fibonacci: Término N de la sucesión",
              "code": "var fib8: int = fibonacci(8); // 21\nprintln(f\"Fibonacci(8) = {fib8}\");"
            }
          ]
        },
        {
          "id": "math-geometry",
          "title": "Geometría 2D (distance_2d, manhattan_distance, áreas y perímetros)",
          "category": "math-lib",
          "type": "fn",
          "summary": "Cálculo de distancias euclidianas y Manhattan, áreas de rectángulos, triángulos y círculos.",
          "signature": "distance_2d(x1, y1, x2, y2) | area_rectangle(w, h) | area_circle_approx(r)",
          "what": "Colección de fórmulas geométricas para desarrollo de videojuegos 2D, motores de colisiones y simulaciones físicas.",
          "how": "distance_2d calcula sqrt(dx*dx + dy*dy). area_circle_approx multiplica (PI_APPROX * r * r) / 10000 garantizando precisión entera.",
          "params": [
            {
              "name": "x1, y1, x2, y2",
              "type": "int",
              "desc": "Coordenadas cartesianas de los dos puntos."
            },
            {
              "name": "w, h, r",
              "type": "int",
              "desc": "Dimensiones de ancho, alto o radio."
            }
          ],
          "returns": "int con la distancia o superficie calculada",
          "examples": [
            {
              "title": "distance_2d y manhattan_distance: Distancias",
              "code": "#include <fundamental.huki>\n#include <math.huki>\nusing namespace math;\n\nfn main() -> void {\n    var d_euc: int = distance_2d(0, 0, 3, 4); // 5\n    var d_man: int = manhattan_distance(0, 0, 3, 4); // 7\n    println(f\"Euclidiana: {d_euc}, Manhattan: {d_man}\");\n}"
            },
            {
              "title": "area_rectangle y perimeter_rectangle: Rectángulos",
              "code": "var a_rect: int = area_rectangle(10, 5); // 50\nvar p_rect: int = perimeter_rectangle(10, 5); // 30\nprintln(f\"Area: {a_rect}, Perimetro: {p_rect}\");"
            },
            {
              "title": "area_triangle y area_circle_approx: Figuras geométricas",
              "code": "var a_tri: int = area_triangle(10, 8); // 40\nvar a_cir: int = area_circle_approx(5); // ~78 (Pi * 25)\nprintln(f\"Triangulo: {a_tri}, Circulo r=5: {a_cir}\");"
            }
          ]
        },
        {
          "id": "math-random",
          "title": "Generación Aleatoria (rand_range, rand_choice, rand_bool)",
          "category": "math-lib",
          "type": "fn",
          "summary": "Generación de enteros pseudoaleatorios acotados a rangos, decisiones booleanas y selección binaria.",
          "signature": "fn math::rand_range(min: int, max: int) -> int; fn math::rand_bool() -> int;",
          "what": "Produce valores numéricos no deterministas útiles para juegos, aleatoriedad procedural y pruebas de estrés.",
          "how": "Normaliza la salida del generador pseudoaleatorio lineal uniforme mediante módulo acotado (min + rand() % (max - min + 1)).",
          "params": [
            {
              "name": "min_val / max_val",
              "type": "int",
              "desc": "Límites inferior y superior inclusivos."
            }
          ],
          "returns": "int con el valor aleatorio seleccionado",
          "examples": [
            {
              "title": "rand_range: Entero aleatorio en rango [min, max]",
              "code": "#include <fundamental.huki>\n#include <math.huki>\nusing namespace math;\n\nfn main() -> void {\n    var dado: int = rand_range(1, 6);\n    println(f\"Tirada de dado: {dado}\");\n}"
            },
            {
              "title": "rand_choice: Elegir aleatoriamente entre dos números",
              "code": "var premio: int = rand_choice(100, 500);\nprintln(f\"Premio seleccionado: {premio}\");"
            },
            {
              "title": "rand_bool: Generar decisión booleana 0 o 1",
              "code": "var moneda: int = rand_bool();\nif (moneda == 1) {\n    println(\"Cara\");\n} else {\n    println(\"Cruz\");\n}"
            }
          ]
        }
      ]
    },
    {
      "id": "time-lib",
      "name": "Módulo: time",
      "icon": "clock",
      "badge": "StdLib",
      "items": [
        {
          "id": "time-now-clocks",
          "title": "time::now, time::sec, time::ms, time::clock_ms, time::sleep",
          "category": "time-lib",
          "type": "fn",
          "summary": "Marcas de tiempo UNIX en segundos y milisegundos, pausas de ejecución y cálculo de diferencias.",
          "signature": "time::now() | time::ms() | time::clock_ms() | time::sleep(ms) | time::diff_ms(t0, t1)",
          "what": "Permite consultar el reloj del sistema, pausar la ejecución del hilo y calcular la diferencia exacta entre dos marcas temporales.",
          "how": "Obtiene el tiempo UNIX consultando el sistema operativo mediante time() o GetSystemTimeAsFileTime en Windows, y calcula lapsos de tiempo milisegundo a milisegundo.",
          "params": [
            {
              "name": "time::now()",
              "type": "función",
              "desc": "Retorna el timestamp UNIX actual en segundos."
            },
            {
              "name": "time::ms()",
              "type": "función",
              "desc": "Retorna la marca de tiempo en milisegundos."
            },
            {
              "name": "time::sleep(ms)",
              "type": "función",
              "desc": "Pausa el hilo durante ms milisegundos."
            },
            {
              "name": "time::diff_ms(ini, fin)",
              "type": "función",
              "desc": "Calcula fin - ini manejando desbordamientos."
            }
          ],
          "returns": "int con el valor temporal",
          "examples": [
            {
              "title": "time::now, time::sec y time::ms: Marcas de tiempo",
              "code": "#include <fundamental.huki>\n#include <time.huki>\n\nfn main() -> void {\n    var ts: int = time::now();\n    var ms: int = time::ms();\n    println(f\"Segundos Epoch: {ts} | Milisegundos: {ms}\");\n}"
            },
            {
              "title": "time::clock_ms, time::sleep y time::diff_ms: Medir lapsos",
              "code": "var inicio: int = time::clock_ms();\ntime::sleep(150); // Pausa 150 ms\nvar fin: int = time::clock_ms();\nprintln(f\"Demora: {time::diff_ms(inicio, fin)} ms\");"
            },
            {
              "title": "time::sleep_sec: Pausar durante segundos completos",
              "code": "println(\"Pausando 2 segundos...\");\ntime::sleep_sec(2);\nprintln(\"Continuando...\");"
            }
          ]
        },
        {
          "id": "time-datetime-struct",
          "title": "struct DateTime & Conversión de Tiempos",
          "category": "time-lib",
          "type": "struct",
          "summary": "Desglose de timestamps en año, mes, día, hora, minutos y segundos civil.",
          "signature": "struct DateTime { year: int; month: int; day: int; hour: int; min: int; sec: int; ... };",
          "what": "Representa una fecha y hora legible por humanos. Provee funciones para convertir timestamps a DateTime y viceversa con time::to_datetime y time::to_timestamp.",
          "how": "Ejecuta los algoritmos de descomposición gregoriana considerando años bisiestos y cálculo de días de la semana y del año.",
          "params": [
            {
              "name": "time::to_datetime(ts, dt)",
              "type": "función",
              "desc": "Llena la estructura dt con los campos desglosados del timestamp ts."
            },
            {
              "name": "time::to_timestamp(dt)",
              "type": "función",
              "desc": "Convierte una estructura DateTime en segundos UNIX."
            },
            {
              "name": "time::local(dt)",
              "type": "función",
              "desc": "Obtiene la fecha y hora local actual directamente en dt."
            }
          ],
          "returns": "Estructura DateTime completada",
          "examples": [
            {
              "title": "time::to_datetime: Descomponer timestamp en struct DateTime",
              "code": "#include <fundamental.huki>\n#include <time.huki>\n\nfn main() -> void {\n    var dt: struct DateTime;\n    time::to_datetime(time::now(), &dt);\n    println(f\"Ano: {dt.year}, Mes: {dt.month}, Dia: {dt.day}\");\n    println(f\"Hora: {dt.hour}:{dt.min}:{dt.sec}\");\n}"
            },
            {
              "title": "time::local y time::utc: Fecha local o UTC directa",
              "code": "var local_dt: struct DateTime;\ntime::local(&local_dt);\nprintln(f\"Hora local: {local_dt.hour}:{local_dt.min}:{local_dt.sec}\");"
            },
            {
              "title": "time::to_timestamp: Convertir struct DateTime a segundos Epoch",
              "code": "var dt: struct DateTime;\ntime::local(&dt);\nvar ts_recompuesto: int = time::to_timestamp(&dt);\nprintln(f\"Timestamp generado: {ts_recompuesto}\");"
            }
          ]
        },
        {
          "id": "time-calendar-ops",
          "title": "Cálculos de Calendario (is_leap_year, days_in_month, day_of_week, day_name)",
          "category": "time-lib",
          "type": "fn",
          "summary": "Años bisiestos, días por mes, día de la semana y nombres de meses y días en español.",
          "signature": "is_leap_year(year) | days_in_month(year, month) | day_of_week(y, m, d) | day_name(wday)",
          "what": "Utilidades para calendarios y agendas: validar si un año es bisiesto, saber cuántos días tiene un mes específico y obtener el nombre del día en texto.",
          "how": "Aplica la regla gregoriana: año divisible por 4 y no por 100, excepto si es divisible por 400. day_of_week implementa la congruencia de Zeller.",
          "params": [
            {
              "name": "year",
              "type": "int",
              "desc": "Año completo (ej. 2026)."
            },
            {
              "name": "month",
              "type": "int",
              "desc": "Mes del año (1 = Enero, 12 = Diciembre)."
            },
            {
              "name": "day",
              "type": "int",
              "desc": "Día del mes (1 a 31)."
            }
          ],
          "returns": "int con la cantidad de días o bandera booleana; char* con el nombre",
          "examples": [
            {
              "title": "time::is_leap_year y time::days_in_month: Años y meses",
              "code": "#include <fundamental.huki>\n#include <time.huki>\n\nfn main() -> void {\n    var b2024: int = time::is_leap_year(2024); // 1\n    var b2025: int = time::is_leap_year(2025); // 0\n    var dias_feb: int = time::days_in_month(2024, 2); // 29\n    println(f\"¿2024 bisiesto? {b2024}, Febrero tuvo {dias_feb} dias.\");\n}"
            },
            {
              "title": "time::day_of_week y time::day_of_year: Días del calendario",
              "code": "var dow: int = time::day_of_week(2026, 10, 20); // 0 = Domingo, 1 = Lunes, 2 = Martes\nvar doy: int = time::day_of_year(2026, 10, 20); // Dia del ano\nprintln(f\"Dia semana: {dow}, Dia del ano: {doy}\");"
            },
            {
              "title": "time::day_name y time::month_name: Nombres en texto",
              "code": "var nombre_dia: char* = time::day_name(2); // \"Martes\"\nvar nombre_mes: char* = time::month_name(10); // \"Octubre\"\nprintln(f\"Hoy es {nombre_dia} de {nombre_mes}\");"
            }
          ]
        },
        {
          "id": "time-formatting",
          "title": "Formato de Cadenas (format, format_date, format_time, str_now)",
          "category": "time-lib",
          "type": "fn",
          "summary": "Conversión de estructuras temporales a texto legible formateado en búferes.",
          "signature": "time::format(dt, buf, max) | time::format_date(dt, buf, max) | time::str_now(buf, max)",
          "what": "Escribe representaciones estándar de fecha y hora (ej. '2026-10-20 16:30:00' o '2026-10-20') directamente en un búfer de texto.",
          "how": "Utiliza snprintf para ensamblar los dígitos con ceros iniciales garantizando terminación nula y protección contra desbordamientos.",
          "params": [
            {
              "name": "dt",
              "type": "struct DateTime*",
              "desc": "Puntero a la estructura con los datos temporales."
            },
            {
              "name": "buf",
              "type": "char*",
              "desc": "Búfer receptor del texto formateado."
            },
            {
              "name": "max_len",
              "type": "int",
              "desc": "Tamaño máximo en bytes del búfer."
            }
          ],
          "returns": "char* al búfer de destino",
          "examples": [
            {
              "title": "time::format: Formato completo 'YYYY-MM-DD HH:MM:SS'",
              "code": "#include <fundamental.huki>\n#include <time.huki>\n\nfn main() -> void {\n    var dt: struct DateTime;\n    time::local(&dt);\n    var buf: char[32];\n    time::format(&dt, buf, 32);\n    println(f\"Fecha completa: {buf}\");\n}"
            },
            {
              "title": "time::format_date y time::format_time: Solo fecha o solo hora",
              "code": "var dt: struct DateTime;\ntime::local(&dt);\nvar buf_fecha: char[16];\nvar buf_hora: char[16];\ntime::format_date(&dt, buf_fecha, 16); // \"2026-10-20\"\ntime::format_time(&dt, buf_hora, 16); // \"18:45:00\"\nprintln(f\"Fecha: {buf_fecha} | Hora: {buf_hora}\");"
            },
            {
              "title": "time::str_now: Cadena inmediata con la hora actual",
              "code": "var ahora: char[32];\ntime::str_now(ahora, 32);\nprintln(f\"Marca temporal: {ahora}\");"
            }
          ]
        },
        {
          "id": "time-benchmark",
          "title": "struct Benchmark & Medición de Rendimiento",
          "category": "time-lib",
          "type": "struct",
          "summary": "Cronometrado de bloques de código y micro-benchmarking en milisegundos.",
          "signature": "benchmark_start(b) | benchmark_stop(b) | benchmark_elapsed(b)",
          "what": "Estructura optimizada para medir con precisión cuántos milisegundos toma ejecutar una función o algoritmo.",
          "how": "Captura marcas de tiempo con time::clock_ms() al inicio y al final, calculando la diferencia sin desviaciones por cambio de zona horaria.",
          "examples": [
            {
              "title": "Medición precisa con struct Benchmark",
              "code": "#include <fundamental.huki>\n#include <time.huki>\n\nfn main() -> void {\n    var b: struct Benchmark;\n    time::benchmark_start(&b);\n\n    var suma: int = 0;\n    for (var i: int = 0; i < 500000; i++) {\n        suma += i;\n    }\n\n    var duracion: int = time::benchmark_stop(&b);\n    println(f\"Calculo terminado en {duracion} ms. (Suma={suma})\");\n}"
            }
          ]
        }
      ]
    },
    {
      "id": "ctypes-lib",
      "name": "Módulo: ctypes",
      "icon": "type",
      "badge": "StdLib",
      "items": [
        {
          "id": "ctypes-classification",
          "title": "Clasificación de Caracteres ASCII (is_alnum, is_alpha, is_space, etc.)",
          "category": "ctypes-lib",
          "type": "fn",
          "summary": "is_alnum, is_alpha, is_lower, is_upper, is_digit, is_xdigit, is_space, is_ascii, is_vowel.",
          "signature": "ctypes::is_alpha(c) | ctypes::is_digit(c) | ctypes::is_space(c) | ctypes::is_vowel(c)",
          "what": "Determina si un código ASCII pertenece a una categoría gramatical específica (dígitos, letras, espacios, vocales, caracteres de control, gráficos, etc.).",
          "how": "Realiza comparaciones directas de rangos y máscaras de bits ultra rápidas en instrucciones condicionales de una sola instrucción de máquina x86.",
          "params": [
            {
              "name": "c",
              "type": "int",
              "desc": "Código ASCII del carácter a evaluar."
            }
          ],
          "returns": "int (1 si cumple la condición, 0 en caso contrario)",
          "examples": [
            {
              "title": "is_alpha, is_digit, is_alnum, is_space, is_ascii",
              "code": "#include <fundamental.huki>\n#include <ctypes.huki>\nusing namespace ctypes;\n\nfn main() -> void {\n    println(f\"is_alpha('A'): {is_alpha('A')}\"); // 1\n    println(f\"is_digit('7'): {is_digit('7')}\"); // 1\n    println(f\"is_space(' '): {is_space(' ')}\"); // 1\n    println(f\"is_ascii(65): {is_ascii(65)}\");   // 1\n}"
            },
            {
              "title": "is_vowel y is_consonant: Vocales y consonantes",
              "code": "println(f\"¿'e' es vocal? {is_vowel('e')}\"); // 1\nprintln(f\"¿'k' es consonante? {is_consonant('k')}\"); // 1"
            },
            {
              "title": "is_xdigit, is_octdigit y is_binary: Bases numéricas",
              "code": "var es_hex: int = is_xdigit('E'); // 1\nvar es_oct: int = is_octdigit('7'); // 1\nvar es_bin: int = is_binary('1'); // 1\nprintln(f\"Hex: {es_hex}, Oct: {es_oct}, Bin: {es_bin}\");"
            },
            {
              "title": "is_lower, is_upper, is_punct, is_print",
              "code": "var min: int = is_lower('m'); // 1\nvar may: int = is_upper('M'); // 1\nvar punct: int = is_punct('.'); // 1\nprintln(f\"Lower: {min}, Upper: {may}, Punct: {punct}\");"
            }
          ]
        },
        {
          "id": "ctypes-conversion",
          "title": "Conversión de Caracteres (to_lower, to_upper, digit_to_int, etc.)",
          "category": "ctypes-lib",
          "type": "fn",
          "summary": "to_lower, to_upper, toggle_case, digit_to_int, xdigit_to_int, int_to_digit.",
          "signature": "ctypes::to_lower(c) | ctypes::toggle_case(c) | ctypes::digit_to_int(c) | ctypes::xdigit_to_int(c)",
          "what": "Convierte caracteres entre mayúsculas y minúsculas, invierte su capitalización o convierte caracteres numéricos ('0'-'9', 'A'-'F') en sus valores numéricos enteros equivalentes.",
          "how": "Aplica sumas y restas de offsets ASCII ('a' - 'A' = 32) u operaciones bitwise AND/OR con 0x20 para transformaciones instantáneas.",
          "params": [
            {
              "name": "c",
              "type": "int",
              "desc": "Carácter ASCII a transformar o convertir a valor entero."
            }
          ],
          "returns": "int con el carácter transformado o el valor numérico (0-15)",
          "examples": [
            {
              "title": "to_lower, to_upper y toggle_case: Modificación de caja",
              "code": "#include <fundamental.huki>\n#include <ctypes.huki>\nusing namespace ctypes;\n\nfn main() -> void {\n    var min: char = to_lower('R'); // 'r'\n    var may: char = to_upper('r'); // 'R'\n    var inv: char = toggle_case('a'); // 'A'\n    println(f\"Min: {min}, May: {may}, Invertido: {inv}\");\n}"
            },
            {
              "title": "digit_to_int y xdigit_to_int: Carácter a valor numérico",
              "code": "var n: int = digit_to_int('8'); // 8\nvar h: int = xdigit_to_int('B'); // 11\nprintln(f\"Digito: {n}, Hexadecimal B: {h}\");"
            },
            {
              "title": "int_to_digit y int_to_xdigit: Valor numérico a carácter",
              "code": "var c_dec: char = int_to_digit(7); // '7'\nvar c_hex: char = int_to_xdigit(14, 1); // 'E'\nprintln(f\"Caracter decimal: {c_dec}, Hex: {c_hex}\");"
            }
          ]
        },
        {
          "id": "ctypes-string-predicates",
          "title": "Predicados y Conteo sobre Cadenas (str_is_digit, str_count_alpha, etc.)",
          "category": "ctypes-lib",
          "type": "fn",
          "summary": "str_is_alpha, str_is_digit, str_is_alnum, str_is_space, str_count_digits, str_count_alpha.",
          "signature": "str_is_digit(s) | str_is_alpha(s) | str_count_digits(s) | str_count_spaces(s)",
          "what": "Evalúa si una cadena completa está compuesta exclusivamente de números, letras o espacios, y cuenta la ocurrencia de cada tipo.",
          "how": "Itera sobre cada byte de la cadena hasta el terminador nulo aplicándole la función de clasificación correspondiente sin reservas de heap.",
          "params": [
            {
              "name": "s",
              "type": "char*",
              "desc": "Puntero a la cadena de caracteres terminada en nulo."
            }
          ],
          "returns": "int (1 si toda la cadena cumple, 0 si no; o entero con el conteo)",
          "examples": [
            {
              "title": "str_is_digit, str_is_alpha, str_is_alnum, str_is_space",
              "code": "#include <fundamental.huki>\n#include <ctypes.huki>\nusing namespace ctypes;\n\nfn main() -> void {\n    var solo_nums: int = str_is_digit(\"987654\"); // 1\n    var solo_letras: int = str_is_alpha(\"Itsuki\"); // 1\n    var mixto: int = str_is_alnum(\"User2026\"); // 1\n    println(f\"Solo digitos: {solo_nums}, Letras: {solo_letras}, Alfanum: {mixto}\");\n}"
            },
            {
              "title": "str_count_digits, str_count_alpha, str_count_spaces: Conteo",
              "code": "var frase: char* = \"Itsuki 5.5 tiene 64 bits\";\nvar digitos: int = str_count_digits(frase); // 4\nvar letras: int = str_count_alpha(frase);   // 14\nvar espacios: int = str_count_spaces(frase); // 4\nprintln(f\"Digitos: {digitos}, Letras: {letras}, Espacios: {espacios}\");"
            }
          ]
        }
      ]
    },
    {
      "id": "setjmp-lib",
      "name": "Módulo: setjmp (Excepciones)",
      "icon": "zap",
      "badge": "Sistema",
      "items": [
        {
          "id": "setjmp-primitives",
          "title": "setjmp & longjmp (Saltos No Locales)",
          "category": "setjmp-lib",
          "type": "fn",
          "summary": "struct jmp_buf, setjmp(env), longjmp(env, val) y control de flujo de bajo nivel.",
          "signature": "setjmp(env: jmp_buf) -> int; longjmp(env: jmp_buf, val: int) -> void;",
          "what": "Permite guardar el contexto de ejecución de la CPU (puntero de instrucción, puntero de pila y registros callee-saved) y regresar a ese punto desde cualquier profundidad de llamada de funciones ante un error crítico.",
          "how": "Usa itsuki_setjmp e itsuki_longjmp en ensamblador x86/x86_64. Guarda %rbp, %rsp, %rbx, %r12-%r15 y la dirección de retorno en el arreglo struct jmp_buf.",
          "params": [
            {
              "name": "env",
              "type": "struct jmp_buf",
              "desc": "Búfer de 32 enteros donde se preserva el estado de los registros de CPU."
            },
            {
              "name": "val",
              "type": "int",
              "desc": "Valor de retorno que recibirá setjmp cuando la CPU regrese del salto."
            }
          ],
          "returns": "int (0 en la primera llamada de registro; val cuando se salta desde longjmp)",
          "examples": [
            {
              "title": "setjmp y longjmp: Manejo de errores no locales",
              "code": "#include <fundamental.huki>\n#include <setjmp.huki>\n\nvar entorno: struct jmp_buf;\n\nfn operacion_compleja(x: int) -> void {\n    if (x < 0) {\n        longjmp(entorno, 101); // Saltar de regreso\n    }\n    println(\"Operacion exitosa\");\n}\n\nfn main() -> void {\n    var codigo: int = setjmp(entorno);\n    if (codigo == 0) {\n        println(\"Punto de restauracion guardado\");\n        operacion_compleja(-5);\n    } else {\n        println(f\"Recuperado tras error no local con codigo: {codigo}\");\n    }\n}"
            }
          ]
        },
        {
          "id": "setjmp-try-catch",
          "title": "struct TryContext & Manejo Estructurado Try/Catch",
          "category": "setjmp-lib",
          "type": "struct",
          "summary": "try_init, try_throw, try_get_code, try_get_message para manejo de excepciones estructurado.",
          "signature": "try_init(ctx) | try_throw(ctx, code, msg) | try_get_code(ctx) | try_get_message(ctx)",
          "what": "Implementa un modelo estructurado de excepciones (Try/Catch/Throw) nativo para Itsuki sobre jmp_buf sin requerir tablas pesadas de desenrollado DWARF o C++ ABI.",
          "how": "Encapsula un jmp_buf junto con error_code y error_message. try_throw asigna el mensaje, guarda el código numérico y ejecuta longjmp hacia el punto de registro.",
          "params": [
            {
              "name": "ctx",
              "type": "struct TryContext*",
              "desc": "Puntero a la estructura de contexto del bloque Try."
            },
            {
              "name": "error_code",
              "type": "int",
              "desc": "Código entero identificador del error."
            },
            {
              "name": "msg",
              "type": "char*",
              "desc": "Mensaje de texto describiendo la causa del error."
            }
          ],
          "returns": "void o información del error capturado",
          "examples": [
            {
              "title": "struct TryContext, try_init, try_throw, try_get_code, try_get_message",
              "code": "#include <fundamental.huki>\n#include <setjmp.huki>\n\nvar ctx: struct TryContext;\n\nfn conectar_servidor(ip: char*) -> void {\n    if (ip == 0) {\n        try_throw(&ctx, 500, \"Direccion IP invalida (NULL)\");\n    }\n    println(\"Conectado!\");\n}\n\nfn main() -> void {\n    try_init(&ctx);\n\n    if (setjmp(ctx.env) == 0) {\n        conectar_servidor(0); // Provoca excepcion\n    } else {\n        println(f\"Excepcion capturada: [{try_get_code(&ctx)}] {try_get_message(&ctx)}\");\n    }\n}"
            }
          ]
        }
      ]
    },
    {
      "id": "c-lib",
      "name": "Módulo: c.huki (Biblioteca C Estándar)",
      "icon": "terminal",
      "badge": "Interop",
      "items": [
        {
          "id": "c-io-files",
          "title": "Archivos en C (fopen, fclose, fread, fwrite, fseek, ftell)",
          "category": "c-lib",
          "type": "fn",
          "summary": "Manejo completo de descriptores de archivos FILE* de C estándar mediante punteros void*.",
          "signature": "fopen(path, mode) | fclose(fp) | fread(ptr, sz, n, fp) | fwrite(ptr, sz, n, fp) | fseek(fp, off, orig)",
          "what": "Acceso total y sin restricciones a la API de archivos en C (stdio.h): fopen, fclose, fread, fwrite, fputs, fgets, fseek, ftell, feof, fflush, remove y rename.",
          "how": "Se mapea directamente a los símbolos nativos de la biblioteca C (msvcrt / glibc) a través de la convención de llamadas nativa extern \"C\".",
          "params": [
            {
              "name": "filename / path",
              "type": "char*",
              "desc": "Ruta del archivo en disco."
            },
            {
              "name": "mode",
              "type": "char*",
              "desc": "Modo de apertura: 'r', 'w', 'a', 'rb', 'wb', 'r+', etc."
            },
            {
              "name": "stream / fp",
              "type": "void*",
              "desc": "Puntero opaco al descriptor de archivo FILE*."
            }
          ],
          "returns": "void* al descriptor FILE*, o int con bytes leídos / estado",
          "examples": [
            {
              "title": "fopen, fread, fwrite y fclose: Archivos binarios en C",
              "code": "#include <fundamental.huki>\n#include <c.huki>\n\nfn main() -> void {\n    var fp: void* = fopen(\"datos.bin\", \"wb\");\n    if (fp != 0) {\n        var buf_out: char[8] = \"DATOS\";\n        fwrite(buf_out, 1, 5, fp);\n        fclose(fp);\n    }\n\n    fp = fopen(\"datos.bin\", \"rb\");\n    if (fp != 0) {\n        var buf_in: char[8];\n        var leidos: int = fread(buf_in, 1, 5, fp);\n        buf_in[leidos] = 0;\n        fclose(fp);\n        println(f\"Leido de archivo: {buf_in}\");\n    }\n}"
            },
            {
              "title": "fputs, fgets, fseek, ftell y feof: Operaciones con streams",
              "code": "var fp: void* = fopen(\"lineas.txt\", \"w+\");\nfputs(\"Primera linea\\n\", fp);\nfseek(fp, 0, 0); // Regresar al inicio del archivo\nvar linea: char[64];\nfgets(linea, 64, fp);\nprintln(f\"Leido: {linea}\");\nvar tam: int = ftell(fp);\nfclose(fp);"
            },
            {
              "title": "remove y rename: Eliminar y renombrar en disco",
              "code": "rename(\"viejo.txt\", \"nuevo.txt\");\nremove(\"temporal.dat\");"
            }
          ]
        },
        {
          "id": "c-stdio-strings",
          "title": "E/S Formateada y Cadenas C (sprintf, snprintf, strcmp, strstr, etc.)",
          "category": "c-lib",
          "type": "fn",
          "summary": "sprintf, snprintf, strlen, strcpy, strncpy, strcat, strcmp, strncmp, strchr, strstr.",
          "signature": "sprintf(buf, fmt, ...) | snprintf(buf, max, fmt, ...) | strlen(s) | strstr(haystack, needle)",
          "what": "Vínculos directos a las funciones clásicas de manipulación de cadenas de la biblioteca estándar de C.",
          "how": "Invoca las implementaciones optimizadas con instrucciones vectoriales del compilador de C del sistema operativo.",
          "params": [
            {
              "name": "buffer",
              "type": "char*",
              "desc": "Búfer de destino para sprintf/snprintf."
            },
            {
              "name": "maxlen",
              "type": "int",
              "desc": "Número máximo de caracteres a escribir protegiendo el búfer."
            },
            {
              "name": "fmt",
              "type": "char*",
              "desc": "Cadena de formato estándar de C."
            }
          ],
          "returns": "int con longitud escrita o entero de comparación",
          "examples": [
            {
              "title": "sprintf y snprintf: Formateo seguro a búfer de memoria",
              "code": "#include <fundamental.huki>\n#include <c.huki>\n\nfn main() -> void {\n    var buffer: char[64];\n    snprintf(buffer, 64, \"Registro #%04d: Usuario %s\", 7, \"Apolo\");\n    puts(buffer);\n}"
            },
            {
              "title": "puts y getchar: Entrada y salida rápida de libc",
              "code": "puts(\"Linea enviada con libc puts\");\nvar c: int = getchar();"
            }
          ]
        },
        {
          "id": "c-memory-system",
          "title": "Memoria y Sistema Operativo (system, getenv, atol, qsort, clock)",
          "category": "c-lib",
          "type": "fn",
          "summary": "system, exit, getenv, atol, qsort de libc, clock, time, malloc, calloc, realloc, free.",
          "signature": "system(cmd) | getenv(name) | atol(str) | clock() | time(timer) | qsort(base, num, sz, comp)",
          "what": "Permite ejecutar comandos en la shell del sistema operativo (system), leer variables de entorno (getenv), medir ciclos de reloj de CPU (clock) y ordenar con la función qsort de libc.",
          "how": "Llama a la biblioteca de C enlazada en el binario final (libc.so o msvcrt.dll) sin intermediarios.",
          "params": [
            {
              "name": "command / cmd",
              "type": "char*",
              "desc": "Comando a ejecutar en la consola del sistema."
            },
            {
              "name": "name",
              "type": "char*",
              "desc": "Nombre de la variable de entorno a consultar."
            }
          ],
          "returns": "int con código de estado o char* con el valor de la variable de entorno",
          "examples": [
            {
              "title": "system y getenv: Comandos del SO y variables de entorno",
              "code": "#include <fundamental.huki>\n#include <c.huki>\n\nfn main() -> void {\n    var user: char* = getenv(\"USERNAME\");\n    println(f\"Usuario activo: {user}\");\n\n    // Ejecutar comando nativo de shell\n    system(\"echo Ejecutado desde Itsuki via system()\");\n}"
            },
            {
              "title": "clock y atol: Medición de ciclos y enteros largos",
              "code": "var c_ini: int = clock();\nvar n_largo: int = atol(\"987654321\");\nvar c_fin: int = clock();\nprintln(f\"Numero: {n_largo}, Ciclos: {c_fin - c_ini}\");"
            }
          ]
        }
      ]
    },
    {
      "id": "interop",
      "name": "Interoperabilidad & Bajo Nivel",
      "icon": "terminal",
      "badge": "Sistema",
      "items": [
        {
          "id": "interop-c",
          "title": "Interoperabilidad directa con C/C++",
          "category": "interop",
          "type": "guide",
          "summary": "Llamar funciones C mediante 'extern' y compilar código C y Suki conjuntamente.",
          "signature": "extern fn nombre_en_c(param: tipo) -> tipo;",
          "what": "Itsuki no necesita envoltorios complejos ni capas de traducción (FFI lento): al emitir código nativo compatible con la ABI estándar de C, puede invocar cualquier biblioteca o función C directamente a velocidad de ensamblador.",
          "how": "Las declaraciones extern le indican al parser y al type-checker que la función existe externamente. El generador emite una llamada estándar call nombre_en_c y el enlazador (GCC) resuelve el símbolo contra archivos .c, bibliotecas .a o DLLs del sistema.",
          "examples": [
            {
              "title": "Invocación directa de función C",
              "code": "// En su archivo .suki:\n#include <fundamental.huki>\n\nextern fn mi_funcion_c(x: int, y: int) -> int;\n\nfn main() -> void {\n    var res: int = mi_funcion_c(10, 20);\n    println(f\"Resultado de C: {res}\");\n}\n\n// Para compilar todo junto:\n// itsuki run main.suki codigo_c.c"
            }
          ]
        },
        {
          "id": "interop-asm",
          "title": "Ensamblador Inline (__asm__)",
          "category": "interop",
          "type": "syntax",
          "summary": "Incrustar instrucciones de procesador x86/x86_64 directamente en el código.",
          "signature": "__asm__(\"instruccion\");",
          "what": "Permite inyectar instrucciones ensamblador específicas de la arquitectura de la CPU para optimizaciones extremas, lectura de registros especiales (ej. TSC) o instrucciones vectoriales.",
          "how": "El nodo AST_INLINE_ASM pasa el texto verbatim al archivo de salida .s sin alterarlo, preservando comentarios y directivas.",
          "examples": [
            {
              "title": "Uso de inline assembly",
              "code": "fn main() -> void {\n    __asm__(\"    nop\");\n    __asm__(\"    # Instruccion ensamblador nativa\");\n    println(\"Codigo ensamblador ejecutado correctamente\");\n}"
            }
          ]
        }
      ]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ITSUKI_DOCS;
}
