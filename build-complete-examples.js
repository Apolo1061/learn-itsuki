const fs = require('fs');
const path = require('path');

// Cargamos la base actual para preservar la estructura
const currentDocs = require('./docs-data.js');

// Mapa exhaustivo de ejemplos específicos para cada módulo y función
const comprehensiveExamples = {
  // === FUNDAMENTAL ===
  "fundamental-println": [
    {
      title: "Uso básico de println",
      code: `#include <fundamental.huki>

fn main() -> void {
    println("Hola mundo desde Itsuki");
    println(42);
    println(3.14159);
}`
    },
    {
      title: "println con expresiones dinámicas",
      code: `var base: int = 10;
var altura: int = 5;
println(f"El area del rectangulo es: {base * altura}");`
    }
  ],

  "fundamental-print": [
    {
      title: "Prompt interactivo en la misma línea con print",
      code: `#include <fundamental.huki>

fn main() -> void {
    print("Introduce tu nombre: ");
    // El cursor permanece en la misma línea para la entrada del usuario
}`
    },
    {
      title: "Construcción de barra de progreso con print",
      code: `for (var i: int = 0; i < 5; i++) {
    print("#");
}
println(" [100%]");`
    }
  ],

  "fundamental-printf": [
    {
      title: "printf con especificadores %s, %d, %x y %f",
      code: `#include <fundamental.huki>

fn main() -> void {
    var usuario: char* = "Apolo";
    var nivel: int = 42;
    var mascara: int = 255;
    printf("Jugador: %s | Nivel: %03d | Hex: 0x%02X\\n", usuario, nivel, mascara);
}`
    }
  ],

  "fundamental-putchar-getchar": [
    {
      title: "putchar: Emitir un carácter ASCII a stdout",
      code: `#include <fundamental.huki>

fn main() -> void {
    putchar(73); // 'I'
    putchar(84); // 'T'
    putchar(83); // 'S'
    putchar(85); // 'U'
    putchar(75); // 'K'
    putchar(73); // 'I'
    putchar(10); // '\\n'
}`
    },
    {
      title: "getchar: Leer un carácter desde teclado",
      code: `#include <fundamental.huki>

fn main() -> void {
    print("Presiona una tecla y Enter: ");
    var c: int = getchar();
    println(f"Codigo ASCII recibido: {c}");
}`
    },
    {
      title: "puts: Imprimir cadena con salto de línea automático",
      code: `#include <fundamental.huki>

fn main() -> void {
    puts("Mensaje emitido a velocidad nativa con puts");
}`
    }
  ],

  "fundamental-read-str": [
    {
      title: "read_str: Capturar una línea de texto del usuario",
      code: `#include <fundamental.huki>

fn main() -> void {
    var nombre: char[64];
    print("¿Cual es tu nombre? ");
    read_str(nombre);
    println(f"Bienvenido a Itsuki, {nombre}!");
}`
    },
    {
      title: "read_int: Leer un valor numérico entero",
      code: `#include <fundamental.huki>

fn main() -> void {
    var edad: int = 0;
    print("Ingresa tu edad: ");
    read_int(&edad);
    println(f"El proximo ano tendras {edad + 1} anos.");
}`
    }
  ],

  "fundamental-malloc": [
    {
      title: "malloc: Reservar memoria contigua en el heap",
      code: `#include <fundamental.huki>

fn main() -> void {
    // Reservar espacio para 5 enteros de 32 bits
    var arr: int* = malloc(sizeof(int) * 5);
    if (arr != 0) {
        arr[0] = 10;
        arr[1] = 20;
        println(f"Valor inicial: {arr[0]}");
        free(arr);
    }
}`
    },
    {
      title: "free: Liberar la memoria para evitar fugas",
      code: `var buffer: int* = malloc(1024);
// ... operaciones con el buffer ...
free(buffer); // Devuelve los 1024 bytes al sistema operativo`
    }
  ],

  "fundamental-calloc-realloc": [
    {
      title: "calloc: Reservar memoria inicializada a cero",
      code: `#include <fundamental.huki>

fn main() -> void {
    // Reserva 4 elementos de tipo int garantizando que todos sean 0
    var limpio: int* = calloc(4, sizeof(int));
    println(f"Elemento 0 es cero garantizado: {limpio[0]}");
    free(limpio);
}`
    },
    {
      title: "realloc: Expandir un bloque de memoria dinámicamente",
      code: `#include <fundamental.huki>

fn main() -> void {
    var datos: int* = malloc(sizeof(int) * 2);
    datos[0] = 100;
    datos[1] = 200;

    // Expandir a 4 elementos preservando datos[0] y datos[1]
    datos = realloc(datos, sizeof(int) * 4);
    datos[2] = 300;
    datos[3] = 400;

    println(f"Datos expandidos: {datos[0]}, {datos[2]}, {datos[3]}");
    free(datos);
}`
    }
  ],

  "fundamental-memset-memcpy": [
    {
      title: "memset: Rellenar memoria con un valor de byte",
      code: `#include <fundamental.huki>

fn main() -> void {
    var buffer: char[16];
    memset(buffer, 'A', 15);
    buffer[15] = 0; // Terminador nulo
    println(buffer); // "AAAAAAAAAAAAAAA"
}`
    },
    {
      title: "memcpy: Copiar bloques contiguos de memoria rápidamente",
      code: `#include <fundamental.huki>

fn main() -> void {
    var origen: int[3];
    origen[0] = 7; origen[1] = 14; origen[2] = 21;

    var destino: int[3];
    memcpy(destino, origen, sizeof(int) * 3);
    println(f"Copia exitosa: {destino[0]}, {destino[1]}, {destino[2]}");
}`
    },
    {
      title: "memmove: Copia segura incluso con búferes solapados",
      code: `var texto: char[16] = "1234567890";
// Mover los primeros 5 bytes 2 posiciones hacia la derecha (solapados)
memmove(texto + 2, texto, 5);
println(texto);`
    },
    {
      title: "memcmp: Comparar bytes de dos regiones de memoria",
      code: `var b1: int[2]; b1[0] = 1; b1[1] = 2;
var b2: int[2]; b2[0] = 1; b2[1] = 2;

if (memcmp(b1, b2, sizeof(int) * 2) == 0) {
    println("Los bloques de memoria son exactamente identicos");
}`
    }
  ],

  "fundamental-strlen": [
    {
      title: "strlen: Medir longitud de una cadena de caracteres",
      code: `#include <fundamental.huki>

fn main() -> void {
    var frase: char* = "Lenguaje Itsuki v5.5";
    var len: int = strlen(frase);
    println(f"La frase tiene {len} caracteres.");
}`
    },
    {
      title: "strdup: Duplicar cadena en memoria heap nueva",
      code: `#include <fundamental.huki>

fn main() -> void {
    var original: char* = "Cadena original";
    var clon: char* = strdup(original);
    println(f"Clon en heap: {clon}");
    free(clon); // Obligatorio liberar tras strdup
}`
    }
  ],

  "fundamental-string-ops": [
    {
      title: "strcpy: Copiar cadena completa a un búfer destino",
      code: `#include <fundamental.huki>

fn main() -> void {
    var destino: char[32];
    strcpy(destino, "Texto copiado con strcpy");
    println(destino);
}`
    },
    {
      title: "strncpy: Copia segura acotada a N caracteres",
      code: `var buf: char[10];
strncpy(buf, "TextoMuyLargoQueNoCabe", 9);
buf[9] = 0; // Asegurar byte nulo
println(buf); // "TextoMuyL"`
    },
    {
      title: "strcat: Concatenar cadena al final de otra",
      code: `var saludo: char[32] = "Hola ";
strcat(saludo, "Mundo!");
println(saludo); // "Hola Mundo!"`
    },
    {
      title: "strncat: Concatenar hasta un máximo de N caracteres",
      code: `var prefijo: char[32] = "Archivo_";
strncat(prefijo, "reporte_anual_2026.log", 7);
println(prefijo); // "Archivo_reporte"`
    },
    {
      title: "strcmp: Comparación léxica de dos cadenas",
      code: `var pass1: char* = "secreto123";
var pass2: char* = "secreto123";

if (strcmp(pass1, pass2) == 0) {
    println("Acceso concedido: las contrasenas coinciden");
}`
    },
    {
      title: "strncmp: Comparar solo los primeros N caracteres",
      code: `if (strncmp("https://itsuki.org", "https://", 8) == 0) {
    println("El protocolo es HTTPS seguro");
}`
    },
    {
      title: "strstr: Buscar la primera aparición de una subcadena",
      code: `var haystack: char* = "Compilador Itsuki nativo para x86_64";
var needle: char* = strstr(haystack, "Itsuki");
if (needle != 0) {
    println(f"Subcadena hallada: {needle}");
}`
    }
  ],

  "fundamental-char-at": [
    {
      title: "char_at: Leer carácter en un índice específico",
      code: `#include <fundamental.huki>

fn main() -> void {
    var str: char* = "Itsuki";
    var c0: int = char_at(str, 0); // 'I' (ASCII 73)
    var c3: int = char_at(str, 3); // 'u' (ASCII 117)
    println(f"Primer caracter: {c0}, Cuarto: {c3}");
}`
    },
    {
      title: "set_char_at: Mutar un carácter en el índice indicado",
      code: `#include <fundamental.huki>

fn main() -> void {
    var texto: char[16] = "gato";
    set_char_at(texto, 0, 'p');
    println(texto); // "pato"
}`
    },
    {
      title: "strchr: Encontrar la primera aparición de un carácter",
      code: `var ruta: char* = "/usr/local/bin/itsuki";
var primer_slash: char* = strchr(ruta, '/');
println(primer_slash);`
    },
    {
      title: "strrchr: Encontrar la última aparición de un carácter (reversa)",
      code: `var ruta: char* = "C:\\\\itsuki\\\\bin\\\\itsuki.exe";
var nombre_archivo: char* = strrchr(ruta, '\\\\');
if (nombre_archivo != 0) {
    println(f"Archivo: {nombre_archivo + 1}"); // "itsuki.exe"
}`
    }
  ],

  "fundamental-char-classify": [
    {
      title: "is_digit, is_alpha, is_alnum, is_space",
      code: `#include <fundamental.huki>

fn main() -> void {
    var d: int = is_digit('9'); // 1
    var a: int = is_alpha('W'); // 1
    var an: int = is_alnum('7'); // 1
    var s: int = is_space(' '); // 1
    println(f"Digit: {d}, Alpha: {a}, Alnum: {an}, Space: {s}");
}`
    },
    {
      title: "is_upper, is_lower y is_xdigit",
      code: `var u: int = is_upper('A'); // 1
var l: int = is_lower('z'); // 1
var x: int = is_xdigit('F'); // 1 (hexadecimal)
println(f"Upper: {u}, Lower: {l}, Xdigit: {x}");`
    },
    {
      title: "to_upper y to_lower: Transformación de caja",
      code: `var mayus: char = to_upper('m'); // 'M'
var minus: char = to_lower('G'); // 'g'
println(f"Mayuscula: {mayus}, Minuscula: {minus}");`
    }
  ],

  "fundamental-conversions": [
    {
      title: "atoi: Convertir texto a número entero decimal",
      code: `#include <fundamental.huki>

fn main() -> void {
    var n: int = atoi("2026");
    println(f"Ano computado: {n + 1}"); // 2027
}`
    },
    {
      title: "itoa: Convertir número a texto con radix dado",
      code: `#include <fundamental.huki>

fn main() -> void {
    var buf_dec: char[32];
    var buf_bin: char[32];
    itoa(42, buf_dec, 10); // Base 10 decimal -> "42"
    itoa(42, buf_bin, 2);  // Base 2 binaria -> "101010"
    println(f"Decimal: {buf_dec} | Binario: {buf_bin}");
}`
    },
    {
      title: "htoi: Convertir cadena hexadecimal a entero",
      code: `#include <fundamental.huki>

fn main() -> void {
    var valor: int = htoi("FF"); // 255
    println(f"0xFF en decimal es: {valor}");
}`
    }
  ],

  "fundamental-numeric": [
    {
      title: "abs, min, max, clamp: Utilidades numéricas",
      code: `#include <fundamental.huki>

fn main() -> void {
    var v_abs: int = abs(-50); // 50
    var v_min: int = min(10, 20); // 10
    var v_max: int = max(10, 20); // 20
    var v_clamp: int = clamp(150, 0, 100); // 100
    println(f"Abs: {v_abs}, Min: {v_min}, Max: {v_max}, Clamp: {v_clamp}");
}`
    },
    {
      title: "pow y sqrt: Potencias y raíces cuadradas enteras",
      code: `var potencia: int = pow(2, 8); // 256
var raiz: int = sqrt(100); // 10
println(f"2^8 = {potencia}, Raiz(100) = {raiz}");`
    },
    {
      title: "gcd y lcm: Máximo Común Divisor y Mínimo Común Múltiplo",
      code: `var mcd: int = gcd(24, 36); // 12
var mcm: int = lcm(4, 6);   // 12
println(f"GCD(24,36) = {mcd}, LCM(4,6) = {mcm}");`
    },
    {
      title: "rand y srand: Generación pseudoaleatoria rápida",
      code: `srand(12345); // Inicializar semilla
var r1: int = rand() % 100; // Aleatorio entre 0 y 99
var r2: int = rand() % 100;
println(f"Numeros aleatorios: {r1}, {r2}");`
    }
  ],

  "fundamental-vector": [
    {
      title: "vector_init y vector_push: Creación e inserción",
      code: `#include <fundamental.huki>
using namespace fundamental;

fn main() -> void {
    var v: struct Vector;
    vector_init(&v, 4); // Capacidad inicial 4

    vector_push(&v, 10);
    vector_push(&v, 20);
    vector_push(&v, 30);
    println(f"Elementos en vector: {v.size}"); // 3
    vector_free(&v);
}`
    },
    {
      title: "vector_get y vector_set: Lectura y mutación indexada",
      code: `var v: struct Vector;
vector_init(&v, 2);
vector_push(&v, 100);
vector_set(&v, 0, 999); // Cambiar el valor en índice 0
var val: int = vector_get(&v, 0); // 999
println(f"Valor modificado: {val}");
vector_free(&v);`
    },
    {
      title: "vector_pop: Extraer el último elemento",
      code: `var v: struct Vector;
vector_init(&v, 4);
vector_push(&v, 5);
vector_push(&v, 15);

var ultimo: int = vector_pop(&v); // 15
println(f"Extraido: {ultimo}, tamano restante: {v.size}"); // 1
vector_free(&v);`
    }
  ],

  "fundamental-qsort": [
    {
      title: "qsort: Ordenamiento in-place en O(N log N)",
      code: `#include <fundamental.huki>
using namespace fundamental;

fn main() -> void {
    var arr: int[6];
    arr[0] = 45; arr[1] = 12; arr[2] = 85; arr[3] = 32; arr[4] = 89; arr[5] = 39;

    qsort(arr, 0, 5); // Ordena de menor a mayor
    println(f"Arreglo ordenado: {arr[0]}, {arr[1]}, {arr[2]}, {arr[3]}, {arr[4]}, {arr[5]}");
}`
    },
    {
      title: "binary_search: Búsqueda binaria en arreglo ordenado",
      code: `var arr: int[5];
arr[0] = 10; arr[1] = 20; arr[2] = 30; arr[3] = 40; arr[4] = 50;

var pos: int = binary_search(arr, 5, 40); // Retorna índice 3
println(f"El numero 40 esta en la posicion: {pos}");`
    },
    {
      title: "reverse_array: Invertir el orden de elementos",
      code: `var arr: int[4];
arr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4;
reverse_array(arr, 4); // Ahora contiene: 4, 3, 2, 1
println(f"Invertido: {arr[0]}, {arr[1]}, {arr[2]}, {arr[3]}");`
    }
  ],

  "fundamental-file": [
    {
      title: "file_write_all y file_read_all: Escritura y lectura completa",
      code: `#include <fundamental.huki>
using namespace fundamental;

fn main() -> void {
    file_write_all("mensaje.txt", "Hola desde el sistema de archivos de Itsuki!");

    var contenido: char[128];
    var bytes: int = file_read_all("mensaje.txt", contenido, 128);
    println(f"Leidos {bytes} bytes: {contenido}");
}`
    },
    {
      title: "file_append: Anexar líneas al final del archivo",
      code: `file_append("registro.log", "Evento 1: Servidor iniciado\\n");
file_append("registro.log", "Evento 2: Cliente conectado\\n");`
    },
    {
      title: "file_exists y file_size: Comprobación y tamaño en bytes",
      code: `if (file_exists("registro.log")) {
    var tamano: int = file_size("registro.log");
    println(f"El archivo existe y mide {tamano} bytes.");
}`
    },
    {
      title: "file_remove: Eliminar un archivo de disco",
      code: `if (file_remove("temporal.tmp")) {
    println("Archivo temporal eliminado correctamente");
}`
    }
  ],

  "fundamental-os": [
    {
      title: "sleep: Suspender el hilo actual durante milisegundos",
      code: `#include <fundamental.huki>

fn main() -> void {
    println("Esperando 500ms...");
    sleep(500);
    println("Reanudado!");
}`
    },
    {
      title: "get_tick_count y time: Marcas de tiempo de CPU y Unix",
      code: `var t_cpu: int = get_tick_count();
var t_unix: int = time();
println(f"Tick de CPU: {t_cpu} ms | Timestamp UNIX: {t_unix}");`
    },
    {
      title: "exit: Terminar el proceso con código de salida",
      code: `if (error_critico) {
    println("Error critico detectado. Saliendo...");
    exit(1); // Codigo de fallo != 0
}`
    }
  ],

  // === RESULT ===
  "result-ok-err": [
    {
      title: "result_ok: Empaquetar resultado exitoso",
      code: `#include <fundamental.huki>
#include <result.huki>

fn dividir(a: int, b: int) -> struct Result* {
    if (b == 0) {
        return result_err(101, "Division por cero no permitida");
    }
    return result_ok(a / b);
}

fn main() -> void {
    var res: struct Result* = dividir(10, 2);
    if (result_is_ok(res)) {
        println(f"Resultado: {result_unwrap(res)}"); // 5
    }
    result_free(res);
}`
    },
    {
      title: "result_err: Empaquetar fallo con código y mensaje",
      code: `var fallo: struct Result* = dividir(10, 0);
println(f"Error [{result_error_code(fallo)}]: {result_error_msg(fallo)}");
result_free(fallo);`
    }
  ],

  "result-unwrap": [
    {
      title: "result_unwrap: Extraer valor con verificación de seguridad",
      code: `var r: struct Result* = result_ok(42);
var val: int = result_unwrap(r); // 42 (si fuera error, sale limpiamente)
println(f"Valor desenvuelto: {val}");
result_free(r);`
    },
    {
      title: "result_unwrap_or: Extraer valor o retornar fallback por defecto",
      code: `var r_error: struct Result* = result_err(404, "No encontrado");
var puerto: int = result_unwrap_or(r_error, 8080); // Retorna 8080 sin abortar
println(f"Puerto aplicado: {puerto}");
result_free(r_error);`
    }
  ],

  "result-checks": [
    {
      title: "result_is_ok y result_is_err: Consultar estado sin abortar",
      code: `var r: struct Result* = operacion_red();
if (result_is_ok(r)) {
    println("Operacion completada con exito");
} else if (result_is_err(r)) {
    println(f"Fallo detectado: {result_error_msg(r)}");
}`
    },
    {
      title: "result_free: Liberar la memoria asignada en el heap",
      code: `result_free(r); // Libera la estructura struct Result* y sus buffers`
    }
  ],

  // === STRING LIB ===
  "string-methods-all": [
    {
      title: "string_new y string_from: Inicializar cadenas dinámicas",
      code: `#include <fundamental.huki>
#include <string.huki>

fn main() -> void {
    var s1: struct String* = string_new(); // Vacio
    var s2: struct String* = string_from("Itsuki v5.5"); // Con texto inicial
    println(string_c_str(s2));
    string_free(s1);
    string_free(s2);
}`
    },
    {
      title: "string_append, string_append_char y string_append_int",
      code: `var s: struct String* = string_from("Usuario_");
string_append(s, "ID");
string_append_char(s, ':');
string_append_int(s, 1042);
println(string_c_str(s)); // "Usuario_ID:1042"
string_free(s);`
    },
    {
      title: "string_append_str: Concatenar dos objetos String",
      code: `var a: struct String* = string_from("Hola ");
var b: struct String* = string_from("Mundo");
string_append_str(a, b);
println(string_c_str(a)); // "Hola Mundo"
string_free(a);
string_free(b);`
    },
    {
      title: "string_get y string_set_char: Lectura y mutación de caracteres",
      code: `var s: struct String* = string_from("pato");
string_set_char(s, 0, 'g');
println(string_c_str(s)); // "gato"
var primero: int = string_get(s, 0); // 'g'
string_free(s);`
    },
    {
      title: "string_equals y string_clone: Comparación y clonación",
      code: `var original: struct String* = string_from("Alpha");
var clon: struct String* = string_clone(original);

if (string_equals(original, clon)) {
    println("Las cadenas dinamicas son identicas");
}
string_free(original);
string_free(clon);`
    }
  ],

  "string-slice-search": [
    {
      title: "str_substring y str_slice: Extraer porciones de texto",
      code: `#include <fundamental.huki>
#include <string.huki>

fn main() -> void {
    var texto: char* = "LenguajeItsuki";
    var sub: char* = str_substring(texto, 8, 6); // "Itsuki"
    var slice: char* = str_slice(texto, 0, 8);   // "Lenguaje"
    println(f"Sub: {sub} | Slice: {slice}");
}`
    },
    {
      title: "str_contains, str_starts_with y str_ends_with: Predicados",
      code: `var ruta: char* = "https://itsuki.org/manual.pdf";
var es_https: int = str_starts_with(ruta, "https://"); // 1
var es_pdf: int = str_ends_with(ruta, ".pdf"); // 1
var tiene_org: int = str_contains(ruta, "itsuki"); // 1
println(f"Https: {es_https}, PDF: {es_pdf}, Org: {tiene_org}");`
    },
    {
      title: "str_index_of, str_last_index_of y str_count_char: Búsqueda y conteo",
      code: `var frase: char* = "banana";
var pos_primera: int = str_index_of(frase, "na"); // 2
var pos_ultima_a: int = str_last_index_of(frase, 'a'); // 5
var total_a: int = str_count_char(frase, 'a'); // 3
println(f"Primera 'na': {pos_primera}, Ultima 'a': {pos_ultima_a}, Total 'a': {total_a}");`
    }
  ],

  "string-transform": [
    {
      title: "str_concat, str_repeat y str_copy: Generación de cadenas",
      code: `#include <fundamental.huki>
#include <string.huki>

fn main() -> void {
    var union_str: char* = str_concat("Itsuki ", "Compiler"); // "Itsuki Compiler"
    var estrellas: char* = str_repeat("*", 5); // "*****"
    var copia: char* = str_copy(union_str);
    println(f"{estrellas} {copia} {estrellas}");
}`
    },
    {
      title: "str_replace y str_reverse: Reemplazo e inversión",
      code: `var texto: char* = "hola mundo";
var reemplazado: char* = str_replace(texto, "mundo", "itsuki"); // "hola itsuki"
var invertido: char* = str_reverse(reemplazado);
println(f"Reemplazado: {reemplazado} | Invertido: {invertido}");`
    },
    {
      title: "str_trim, str_trim_left y str_trim_right: Limpieza de espacios",
      code: `var sucio: char* = "   espacios   ";
var limpio: char* = str_trim(sucio); // "espacios"
println(f"Limpio: '{limpio}'");`
    },
    {
      title: "str_pad_left y str_pad_right: Relleno de texto",
      code: `var codigo: char* = "42";
var formateado: char* = str_pad_left(codigo, 5, '0'); // "00042"
println(f"Codigo con padding: {formateado}");`
    },
    {
      title: "str_compare y str_compare_ignore_case: Comparación alfabética",
      code: `var c1: int = str_compare("abc", "abd"); // < 0
var c2: int = str_compare_ignore_case("ITSUKI", "itsuki"); // 0 (coinciden)
println(f"Case-insensitive: {c2}");`
    },
    {
      title: "str_from_int y str_to_int: Conversión texto/entero",
      code: `var t: char* = str_from_int(1234); // "1234"
var n: int = str_to_int("5678");   // 5678
println(f"Texto: {t}, Entero: {n}");`
    }
  ],

  // === MATH LIB ===
  "math-trig": [
    {
      title: "sin_deg, cos_deg y tan_deg: Trigonometría en grados sexagesimales",
      code: `#include <fundamental.huki>
#include <math.huki>
using namespace math;

fn main() -> void {
    // Valores escalados por TRIG_SCALE = 1000
    var s0: int = sin_deg(0);     // 0
    var s30: int = sin_deg(30);   // 500 (0.5 * 1000)
    var s90: int = sin_deg(90);   // 1000 (1.0 * 1000)
    var c0: int = cos_deg(0);     // 1000
    var t45: int = tan_deg(45);   // ~1000 (1.0 * 1000)

    println(f"Sin(30): {s30}/1000 | Sin(90): {s90}/1000 | Cos(0): {c0}/1000");
}`
    }
  ],

  "math-algebra": [
    {
      title: "pow, sqrt y cbrt: Potencias, raíces cuadradas y cúbicas",
      code: `#include <fundamental.huki>
#include <math.huki>
using namespace math;

fn main() -> void {
    var p: int = pow(3, 4); // 81
    var r2: int = sqrt(144); // 12
    var r3: int = cbrt(27);  // 3
    println(f"3^4 = {p}, Raiz(144) = {r2}, Raiz3(27) = {r3}");
}`
    },
    {
      title: "hypot, log2 y log10: Hipotenusa y logaritmos enteros",
      code: `var h: int = hypot(6, 8); // 10
var l2: int = log2(1024); // 10
var l10: int = log10(10000); // 4
println(f"Hipotenusa(6,8): {h}, Log2(1024): {l2}, Log10(10000): {l10}");`
    },
    {
      title: "is_power_of_two y next_power_of_two: Potencias binarias",
      code: `var es_pot2: int = is_power_of_two(16); // 1
var prox_pot2: int = next_power_of_two(17); // 32
println(f"Es potencia de 2: {es_pot2}, Proxima potencia: {prox_pot2}");`
    },
    {
      title: "clamp, lerp y map_range: Acotado y mapeo de valores",
      code: `var acotado: int = clamp(120, 0, 100); // 100
var interp: int = lerp(0, 100, 50); // 50 (50% entre 0 y 100)
var mapeado: int = map_range(5, 0, 10, 0, 100); // 50
println(f"Clamp: {acotado}, Lerp: {interp}, Map: {mapeado}");`
    },
    {
      title: "abs, sign, min, max, min3 y max3",
      code: `var s: int = sign(-42); // -1
var m3: int = min3(15, 8, 23); // 8
var mx3: int = max3(15, 8, 23); // 23
println(f"Signo: {s}, Min3: {m3}, Max3: {mx3}");`
    }
  ],

  "math-number-theory": [
    {
      title: "gcd y lcm: Divisibilidad de números",
      code: `#include <fundamental.huki>
#include <math.huki>
using namespace math;

fn main() -> void {
    var divisor: int = gcd(48, 18); // 6
    var multiplo: int = lcm(4, 5);  // 20
    println(f"GCD(48,18): {divisor}, LCM(4,5): {multiplo}");
}`
    },
    {
      title: "is_even y is_odd: Comprobación de paridad",
      code: `var par: int = is_even(42); // 1
var impar: int = is_odd(42); // 0
println(f"Es par: {par}, Es impar: {impar}");`
    },
    {
      title: "is_prime y next_prime: Números primos",
      code: `var primo: int = is_prime(31); // 1
var siguiente: int = next_prime(31); // 37
println(f"¿31 es primo? {primo}, siguiente: {siguiente}");`
    },
    {
      title: "factorial, combinations y permutations: Combinatoria",
      code: `var fact5: int = factorial(5); // 120
var comb: int = combinations(6, 2); // 15
var perm: int = permutations(5, 2); // 20
println(f"5! = {fact5}, C(6,2) = {comb}, P(5,2) = {perm}");`
    },
    {
      title: "fibonacci: Término N de la sucesión",
      code: `var fib8: int = fibonacci(8); // 21
println(f"Fibonacci(8) = {fib8}");`
    }
  ],

  "math-geometry": [
    {
      title: "distance_2d y manhattan_distance: Distancias",
      code: `#include <fundamental.huki>
#include <math.huki>
using namespace math;

fn main() -> void {
    var d_euc: int = distance_2d(0, 0, 3, 4); // 5
    var d_man: int = manhattan_distance(0, 0, 3, 4); // 7
    println(f"Euclidiana: {d_euc}, Manhattan: {d_man}");
}`
    },
    {
      title: "area_rectangle y perimeter_rectangle: Rectángulos",
      code: `var a_rect: int = area_rectangle(10, 5); // 50
var p_rect: int = perimeter_rectangle(10, 5); // 30
println(f"Area: {a_rect}, Perimetro: {p_rect}");`
    },
    {
      title: "area_triangle y area_circle_approx: Figuras geométricas",
      code: `var a_tri: int = area_triangle(10, 8); // 40
var a_cir: int = area_circle_approx(5); // ~78 (Pi * 25)
println(f"Triangulo: {a_tri}, Circulo r=5: {a_cir}");`
    }
  ],

  "math-random": [
    {
      title: "rand_range: Entero aleatorio en rango [min, max]",
      code: `#include <fundamental.huki>
#include <math.huki>
using namespace math;

fn main() -> void {
    var dado: int = rand_range(1, 6);
    println(f"Tirada de dado: {dado}");
}`
    },
    {
      title: "rand_choice: Elegir aleatoriamente entre dos números",
      code: `var premio: int = rand_choice(100, 500);
println(f"Premio seleccionado: {premio}");`
    },
    {
      title: "rand_bool: Generar decisión booleana 0 o 1",
      code: `var moneda: int = rand_bool();
if (moneda == 1) {
    println("Cara");
} else {
    println("Cruz");
}`
    }
  ],

  // === TIME LIB ===
  "time-now-clocks": [
    {
      title: "time::now, time::sec y time::ms: Marcas de tiempo",
      code: `#include <fundamental.huki>
#include <time.huki>

fn main() -> void {
    var ts: int = time::now();
    var ms: int = time::ms();
    println(f"Segundos Epoch: {ts} | Milisegundos: {ms}");
}`
    },
    {
      title: "time::clock_ms, time::sleep y time::diff_ms: Medir lapsos",
      code: `var inicio: int = time::clock_ms();
time::sleep(150); // Pausa 150 ms
var fin: int = time::clock_ms();
println(f"Demora: {time::diff_ms(inicio, fin)} ms");`
    },
    {
      title: "time::sleep_sec: Pausar durante segundos completos",
      code: `println("Pausando 2 segundos...");
time::sleep_sec(2);
println("Continuando...");`
    }
  ],

  "time-datetime-struct": [
    {
      title: "time::to_datetime: Descomponer timestamp en struct DateTime",
      code: `#include <fundamental.huki>
#include <time.huki>

fn main() -> void {
    var dt: struct DateTime;
    time::to_datetime(time::now(), &dt);
    println(f"Ano: {dt.year}, Mes: {dt.month}, Dia: {dt.day}");
    println(f"Hora: {dt.hour}:{dt.min}:{dt.sec}");
}`
    },
    {
      title: "time::local y time::utc: Fecha local o UTC directa",
      code: `var local_dt: struct DateTime;
time::local(&local_dt);
println(f"Hora local: {local_dt.hour}:{local_dt.min}:{local_dt.sec}");`
    },
    {
      title: "time::to_timestamp: Convertir struct DateTime a segundos Epoch",
      code: `var dt: struct DateTime;
time::local(&dt);
var ts_recompuesto: int = time::to_timestamp(&dt);
println(f"Timestamp generado: {ts_recompuesto}");`
    }
  ],

  "time-calendar-ops": [
    {
      title: "time::is_leap_year y time::days_in_month: Años y meses",
      code: `#include <fundamental.huki>
#include <time.huki>

fn main() -> void {
    var b2024: int = time::is_leap_year(2024); // 1
    var b2025: int = time::is_leap_year(2025); // 0
    var dias_feb: int = time::days_in_month(2024, 2); // 29
    println(f"¿2024 bisiesto? {b2024}, Febrero tuvo {dias_feb} dias.");
}`
    },
    {
      title: "time::day_of_week y time::day_of_year: Días del calendario",
      code: `var dow: int = time::day_of_week(2026, 10, 20); // 0 = Domingo, 1 = Lunes, 2 = Martes
var doy: int = time::day_of_year(2026, 10, 20); // Dia del ano
println(f"Dia semana: {dow}, Dia del ano: {doy}");`
    },
    {
      title: "time::day_name y time::month_name: Nombres en texto",
      code: `var nombre_dia: char* = time::day_name(2); // "Martes"
var nombre_mes: char* = time::month_name(10); // "Octubre"
println(f"Hoy es {nombre_dia} de {nombre_mes}");`
    }
  ],

  "time-formatting": [
    {
      title: "time::format: Formato completo 'YYYY-MM-DD HH:MM:SS'",
      code: `#include <fundamental.huki>
#include <time.huki>

fn main() -> void {
    var dt: struct DateTime;
    time::local(&dt);
    var buf: char[32];
    time::format(&dt, buf, 32);
    println(f"Fecha completa: {buf}");
}`
    },
    {
      title: "time::format_date y time::format_time: Solo fecha o solo hora",
      code: `var dt: struct DateTime;
time::local(&dt);
var buf_fecha: char[16];
var buf_hora: char[16];
time::format_date(&dt, buf_fecha, 16); // "2026-10-20"
time::format_time(&dt, buf_hora, 16); // "18:45:00"
println(f"Fecha: {buf_fecha} | Hora: {buf_hora}");`
    },
    {
      title: "time::str_now: Cadena inmediata con la hora actual",
      code: `var ahora: char[32];
time::str_now(ahora, 32);
println(f"Marca temporal: {ahora}");`
    }
  ],

  "time-benchmark": [
    {
      title: "Medición precisa con struct Benchmark",
      code: `#include <fundamental.huki>
#include <time.huki>

fn main() -> void {
    var b: struct Benchmark;
    time::benchmark_start(&b);

    var suma: int = 0;
    for (var i: int = 0; i < 500000; i++) {
        suma += i;
    }

    var duracion: int = time::benchmark_stop(&b);
    println(f"Calculo terminado en {duracion} ms. (Suma={suma})");
}`
    }
  ],

  // === CTYPES LIB ===
  "ctypes-classification": [
    {
      title: "is_alpha, is_digit, is_alnum, is_space, is_ascii",
      code: `#include <fundamental.huki>
#include <ctypes.huki>
using namespace ctypes;

fn main() -> void {
    println(f"is_alpha('A'): {is_alpha('A')}"); // 1
    println(f"is_digit('7'): {is_digit('7')}"); // 1
    println(f"is_space(' '): {is_space(' ')}"); // 1
    println(f"is_ascii(65): {is_ascii(65)}");   // 1
}`
    },
    {
      title: "is_vowel y is_consonant: Vocales y consonantes",
      code: `println(f"¿'e' es vocal? {is_vowel('e')}"); // 1
println(f"¿'k' es consonante? {is_consonant('k')}"); // 1`
    },
    {
      title: "is_xdigit, is_octdigit y is_binary: Bases numéricas",
      code: `var es_hex: int = is_xdigit('E'); // 1
var es_oct: int = is_octdigit('7'); // 1
var es_bin: int = is_binary('1'); // 1
println(f"Hex: {es_hex}, Oct: {es_oct}, Bin: {es_bin}");`
    },
    {
      title: "is_lower, is_upper, is_punct, is_print",
      code: `var min: int = is_lower('m'); // 1
var may: int = is_upper('M'); // 1
var punct: int = is_punct('.'); // 1
println(f"Lower: {min}, Upper: {may}, Punct: {punct}");`
    }
  ],

  "ctypes-conversion": [
    {
      title: "to_lower, to_upper y toggle_case: Modificación de caja",
      code: `#include <fundamental.huki>
#include <ctypes.huki>
using namespace ctypes;

fn main() -> void {
    var min: char = to_lower('R'); // 'r'
    var may: char = to_upper('r'); // 'R'
    var inv: char = toggle_case('a'); // 'A'
    println(f"Min: {min}, May: {may}, Invertido: {inv}");
}`
    },
    {
      title: "digit_to_int y xdigit_to_int: Carácter a valor numérico",
      code: `var n: int = digit_to_int('8'); // 8
var h: int = xdigit_to_int('B'); // 11
println(f"Digito: {n}, Hexadecimal B: {h}");`
    },
    {
      title: "int_to_digit y int_to_xdigit: Valor numérico a carácter",
      code: `var c_dec: char = int_to_digit(7); // '7'
var c_hex: char = int_to_xdigit(14, 1); // 'E'
println(f"Caracter decimal: {c_dec}, Hex: {c_hex}");`
    }
  ],

  "ctypes-string-predicates": [
    {
      title: "str_is_digit, str_is_alpha, str_is_alnum, str_is_space",
      code: `#include <fundamental.huki>
#include <ctypes.huki>
using namespace ctypes;

fn main() -> void {
    var solo_nums: int = str_is_digit("987654"); // 1
    var solo_letras: int = str_is_alpha("Itsuki"); // 1
    var mixto: int = str_is_alnum("User2026"); // 1
    println(f"Solo digitos: {solo_nums}, Letras: {solo_letras}, Alfanum: {mixto}");
}`
    },
    {
      title: "str_count_digits, str_count_alpha, str_count_spaces: Conteo",
      code: `var frase: char* = "Itsuki 5.5 tiene 64 bits";
var digitos: int = str_count_digits(frase); // 4
var letras: int = str_count_alpha(frase);   // 14
var espacios: int = str_count_spaces(frase); // 4
println(f"Digitos: {digitos}, Letras: {letras}, Espacios: {espacios}");`
    }
  ],

  // === SETJMP LIB ===
  "setjmp-primitives": [
    {
      title: "setjmp y longjmp: Manejo de errores no locales",
      code: `#include <fundamental.huki>
#include <setjmp.huki>

var entorno: struct jmp_buf;

fn operacion_compleja(x: int) -> void {
    if (x < 0) {
        longjmp(entorno, 101); // Saltar de regreso
    }
    println("Operacion exitosa");
}

fn main() -> void {
    var codigo: int = setjmp(entorno);
    if (codigo == 0) {
        println("Punto de restauracion guardado");
        operacion_compleja(-5);
    } else {
        println(f"Recuperado tras error no local con codigo: {codigo}");
    }
}`
    }
  ],

  "setjmp-try-catch": [
    {
      title: "struct TryContext, try_init, try_throw, try_get_code, try_get_message",
      code: `#include <fundamental.huki>
#include <setjmp.huki>

var ctx: struct TryContext;

fn conectar_servidor(ip: char*) -> void {
    if (ip == 0) {
        try_throw(&ctx, 500, "Direccion IP invalida (NULL)");
    }
    println("Conectado!");
}

fn main() -> void {
    try_init(&ctx);

    if (setjmp(ctx.env) == 0) {
        conectar_servidor(0); // Provoca excepcion
    } else {
        println(f"Excepcion capturada: [{try_get_code(&ctx)}] {try_get_message(&ctx)}");
    }
}`
    }
  ],

  // === C LIB ===
  "c-io-files": [
    {
      title: "fopen, fread, fwrite y fclose: Archivos binarios en C",
      code: `#include <fundamental.huki>
#include <c.huki>

fn main() -> void {
    var fp: void* = fopen("datos.bin", "wb");
    if (fp != 0) {
        var buf_out: char[8] = "DATOS";
        fwrite(buf_out, 1, 5, fp);
        fclose(fp);
    }

    fp = fopen("datos.bin", "rb");
    if (fp != 0) {
        var buf_in: char[8];
        var leidos: int = fread(buf_in, 1, 5, fp);
        buf_in[leidos] = 0;
        fclose(fp);
        println(f"Leido de archivo: {buf_in}");
    }
}`
    },
    {
      title: "fputs, fgets, fseek, ftell y feof: Operaciones con streams",
      code: `var fp: void* = fopen("lineas.txt", "w+");
fputs("Primera linea\\n", fp);
fseek(fp, 0, 0); // Regresar al inicio del archivo
var linea: char[64];
fgets(linea, 64, fp);
println(f"Leido: {linea}");
var tam: int = ftell(fp);
fclose(fp);`
    },
    {
      title: "remove y rename: Eliminar y renombrar en disco",
      code: `rename("viejo.txt", "nuevo.txt");
remove("temporal.dat");`
    }
  ],

  "c-stdio-strings": [
    {
      title: "sprintf y snprintf: Formateo seguro a búfer de memoria",
      code: `#include <fundamental.huki>
#include <c.huki>

fn main() -> void {
    var buffer: char[64];
    snprintf(buffer, 64, "Registro #%04d: Usuario %s", 7, "Apolo");
    puts(buffer);
}`
    },
    {
      title: "puts y getchar: Entrada y salida rápida de libc",
      code: `puts("Linea enviada con libc puts");
var c: int = getchar();`
    }
  ],

  "c-memory-system": [
    {
      title: "system y getenv: Comandos del SO y variables de entorno",
      code: `#include <fundamental.huki>
#include <c.huki>

fn main() -> void {
    var user: char* = getenv("USERNAME");
    println(f"Usuario activo: {user}");

    // Ejecutar comando nativo de shell
    system("echo Ejecutado desde Itsuki via system()");
}`
    },
    {
      title: "clock y atol: Medición de ciclos y enteros largos",
      code: `var c_ini: int = clock();
var n_largo: int = atol("987654321");
var c_fin: int = clock();
println(f"Numero: {n_largo}, Ciclos: {c_fin - c_ini}");`
    }
  ]
};

// Inyectar los ejemplos ampliados en cada tema correspondiente
let updatedCount = 0;
currentDocs.categories.forEach(cat => {
  cat.items.forEach(item => {
    if (comprehensiveExamples[item.id]) {
      item.examples = comprehensiveExamples[item.id];
      updatedCount++;
    }
  });
});

const fileContent = `/**
 * ITSUKI PROGRAMMING LANGUAGE - EXHAUSTIVE DOCUMENTATION DATABASE
 * DevDocs-style comprehensive reference data
 * All 8 Standard Libraries + Language Core + Full Technical Pipeline
 * Every single function includes distinct, copyable, working code examples!
 */

const ITSUKI_DOCS = ${JSON.stringify(currentDocs, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ITSUKI_DOCS;
}
`;

fs.writeFileSync(path.join(__dirname, 'docs-data.js'), fileContent, 'utf8');
console.log(`Successfully updated docs-data.js with complete code examples across ${updatedCount} articles!`);
