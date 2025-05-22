"use client"; // Esta línea le dice a Next.js que este componente se ejecuta en el navegador (lado cliente)
import { useEffect, useState } from "react"; // Importamos los hooks que necesitamos de React

// Este es nuestro componente principal - es como una función que devuelve lo que se ve en la página
export default function Page() {
 // useState es como una caja donde guardamos información que puede cambiar
 // En este caso, creamos una lista de productos con toda su información
 const [productos] = useState([
  {
    id: 1, // Número único para identificar cada producto
    nombre: ' BOSS White Sneakers', // El nombre del producto
    precio: 80000, // Cuánto cuesta
    imagen: '/images/BOSS White Sneakers.jpeg', // Dónde está guardada la foto
    categoria: 'Dama', // Si es para mujeres o hombres
    descripcion: 'Elegancia deportiva en su máxima expresión. Estos tenis BOSS combinan diseño moderno, materiales de alta calidad y una estética limpia ideal para quienes saben que el estilo está en los detalles.'
  },
  {
    id: 2,
    nombre: 'Nike Dunk Low',
    precio: 80000,
    imagen: '/images/Nike Dunk Low.jpeg',
    categoria: 'Caballero',
    descripcion: 'Explora el lado más exclusivo del streetwear con estos Nike Dunk Low en tonos chocolate y crema. Un diseño que mezcla lo clásico con lo moderno. '
  },
  {
    id: 3,
    nombre: 'Air Jordan 1 Mid Retro',
    precio: 80000,
    imagen: '/images/Air Jordan 1 Mid Retro.jpeg',
    categoria: 'Caballero',
    descripcion: 'Luce el legado de una de las siluetas más icónicas del mundo sneaker: los Air Jordan 1 Mid Retro. Con un diseño elegante en blanco y negro, estos tenis no solo combinan con todo, ¡también hablan por ti! '
  },
  {
    id: 4,
    nombre: 'Dolce & Gabbana White Edition',
    precio: 80000,
    imagen: '/images/Dolce & Gabbana White Edition.jpeg', 
    categoria: 'Dama',
    descripcion: 'El lujo se encuentra con el diseño urbano en estas impresionantes D&G White Edition. Totalmente blancos, con detalles en alto relieve y un acabado impecable que transmite elegancia en cada paso.'
  },
  {
    id: 5,
    nombre: 'Nike Air Jordan Black Reflective',
    precio: 80000,
    imagen: '/images/Nike Air Jordan Black Reflective.jpeg', 
    categoria: 'Dama',
    descripcion: 'Luce el poder del negro con estos Air Jordan de edición especial. Un diseño sobrio pero con detalles reflectivos en las agujetas y costuras que capturan la luz y todas las miradas.'
  },
 

  {
    id: 6,
    nombre: 'Nike Air Low',
    precio: 80000,
    imagen: '/images/Nike Air Low.jpeg',
    categoria: 'Dama',
    descripcion: 'Dale un giro dulce y moderno a tu outfit con estas Nike Air en rosa pastel, el par perfecto para destacar con elegancia y frescura.' },
  { 
    id: 7,
    nombre: 'Nike Air Runner Black Edition ',
    precio: 80000,
    imagen: '/images/Nike Air Runner Black Edition.jpeg',
    categoria: 'Caballero',
    descripcion: 'Diseñadas para quienes no se detienen, las Nike Air Runner Black Edition combinan tecnología, confort y un diseño agresivo que impone presencia.' },
  {
    id: 8,
    nombre: 'PUMA Classic Heritage',
    precio: 80000,
    imagen: '/images/PUMA Classic Heritage.jpeg', 
    categoria: 'Caballero',
    descripcion: 'Luce el poder de lo retro con estos PUMA Classic Heritage, una silueta que mezcla lo deportivo y lo urbano con total elegancia.' },
 
   {
    id: 9,
    nombre: 'NIKE SKATE ',
    precio: 80000,
    imagen: '/images/NIKE SKATE DAMA Y CABALLERO.jpg', 
    categoria: 'Dama',
    descripcion: 'Versátiles y con estilo urbano, los Nike Skate para dama y caballero ofrecen comodidad y agarre ideal para el día a día o para la tabla. Diseño clásico que nunca pasa de moda.' },
 
   {
    id: 10,
    nombre: 'DC II TABLA',
    precio: 80000,
    imagen: '/images/DC II Tabla.jpeg', 
    categoria: 'Caballero',
    descripcion: 'Inspirados en el skate clásico, los DC II Tabla combinan durabilidad, agarre superior y estilo callejero. Perfectos para quienes viven sobre la tabla o el asfalto.' },
 

]);

  // Aquí creamos más "cajitas" para guardar información que va cambiando:
  const [carrito, setCarrito] = useState([]); // Lista de productos que el usuario quiere comprar
  const [usuarios, setUsuarios] = useState([]); // Lista de todos los usuarios registrados
  const [usuarioActual, setUsuarioActual] = useState(null); // El usuario que está conectado ahora (null = nadie)
  const [productosFiltrados, setProductosFiltrados] = useState(productos); // Los productos que se muestran después de filtrar
  const [filtro, setFiltro] = useState("todos"); // Qué categoría está seleccionada ("todos", "Dama", "Caballero")
  const [busqueda, setBusqueda] = useState(""); // Lo que el usuario escribió en la caja de búsqueda
  const [comentarios, setComentarios] = useState([]); // Lista de comentarios que escriben los usuarios
  const [comentarioInput, setComentarioInput] = useState(""); // Lo que está escribiendo el usuario en el comentario
  const [userInput, setUserInput] = useState(""); // El nombre de usuario que está escribiendo
  const [passInput, setPassInput] = useState(""); // La contraseña que está escribiendo

  // useEffect es como decir "cuando algo cambie, haz esto"
  // En este caso, cuando cambien el filtro o la búsqueda, aplicar los filtros
  useEffect(() => {
    aplicarBusqueda(); // Llamamos a la función que filtra los productos
  }, [filtro, busqueda]); // Solo se ejecuta cuando cambien estas dos cosas

  // Función para iniciar sesión
  const login = () => {
    // Buscar en la lista de usuarios si existe uno con el nombre y contraseña que escribió
    const user = usuarios.find(
      u => u.usuario === userInput && u.contraseña === passInput
    );
    if (user) {
      // Si encontramos el usuario, lo guardamos como usuario actual
      setUsuarioActual(user);
    } else {
      // Si no lo encontramos, mostramos un mensaje de error
      alert("Usuario o contraseña incorrectos.");
    }
  };

  // Función para registrar un nuevo usuario
  const register = () => {
    // Verificamos que haya escrito algo en ambas cajas
    if (userInput && passInput) {
      // Agregamos el nuevo usuario a la lista (... significa "todos los que ya estaban")
      setUsuarios([...usuarios, { usuario: userInput, contraseña: passInput }]);
      alert("¡Usuario registrado correctamente!");
    }
  };

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    // Agregamos el producto a la lista del carrito
    setCarrito([...carrito, producto]);
  };

  // Función para quitar un producto del carrito
  const eliminarDelCarrito = (index) => {
    // Creamos una copia del carrito actual
    const nuevo = [...carrito];
    // Quitamos el elemento en la posición "index"
    nuevo.splice(index, 1);
    // Guardamos el carrito sin ese elemento
    setCarrito(nuevo);
  };

  // Función que filtra los productos según lo que busque el usuario
  const aplicarBusqueda = () => {
    // Primero filtramos por categoría
    let filtrados = filtro === "todos"
      ? productos // Si seleccionó "todos", mostramos todos los productos
      : productos.filter(p => p.categoria === filtro); // Si no, solo los de esa categoría

    // Después filtramos por lo que escribió en la búsqueda
    let resultados = filtrados.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) // Convertimos a minúsculas para comparar mejor
    );

    // Guardamos los productos que quedaron después de filtrar
    setProductosFiltrados(resultados);
  };

  // Función para agregar un comentario
  const agregarComentario = (e) => {
    e.preventDefault(); // Evita que la página se recargue cuando envía el formulario
    if (comentarioInput.trim()) { // trim() quita los espacios al inicio y final
      // Agregamos el comentario a la lista
      setComentarios([...comentarios, comentarioInput.trim()]);
      // Limpiamos la caja de texto
      setComentarioInput("");
    }
  };

  // Calculamos el total del carrito sumando los precios de todos los productos
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  // Aquí empieza lo que se ve en la página (el HTML)
  return (
    <div style={{ padding: 20 }}> {/* Un contenedor con un poco de espacio alrededor */}
      <h1 >MomentumShoes</h1> {/* El título de la tienda */}

      {/* Sección para iniciar sesión y registrarse */}
      <div>
        {/* Caja para escribir el nombre de usuario */}
        <input
          type="text"
          placeholder="Usuario" // Texto que aparece cuando está vacía
          value={userInput} // Lo que está escrito ahora
          onChange={(e) => setUserInput(e.target.value)} // Cuando escriba algo, lo guardamos
        />
        {/* Caja para escribir la contraseña */}
        <input
          type="password" // type="password" hace que se vean puntitos en vez de letras
          placeholder="Contraseña"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
        />
        {/* Botones para iniciar sesión y registrarse */}
        <button onClick={login}>Iniciar sesión</button> {/* Cuando le den clic, ejecuta la función login */}
        <button onClick={register}>Registrate</button>
        {/* Si hay un usuario conectado, mostramos un saludo */}
        {usuarioActual && ( // && significa "si es verdadero, entonces muestra esto"
          <p style={{ fontWeight: 'bold' }}>
            ¡Hola {usuarioActual.usuario}! Explora nuestra colección exclusiva.
          </p>
        )}
      </div>

      {/* Sección de filtros y búsqueda */}
      <div style={{ marginTop: 20 }}> {/* marginTop: 20 significa espacio arriba */}
        {/* Caja para buscar productos por nombre */}
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} // Cada vez que escriba, actualiza la búsqueda
        />
        {/* Lista desplegable para filtrar por categoría */}
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Dama">Dama</option>
          <option value="Caballero">Caballero</option>
        </select>
      </div>

      {/* Sección donde se muestran los productos */}
      <div className="producto-grid" style={{ marginTop: 20 }}>
        {/* map() es como decir "para cada producto en la lista, haz esto:" */}
        {productosFiltrados.map(p => (
          <div key={p.id} className="product-card"> {/* key={p.id} ayuda a React a identificar cada producto */}
            <img src={p.imagen} alt={p.nombre} className="producto-img" /> {/* Imagen del producto */}
            <h3>{p.nombre}</h3> {/* Nombre del producto */}
            <p><strong>${p.precio}</strong></p> {/* Precio del producto - strong hace que se vea en negritas */}
            <p>{p.descripcion}</p> {/* Descripción del producto */}
            <button onClick={() => agregarAlCarrito(p)}>Agregar al carrito</button> {/* Botón para agregar al carrito */}
          </div>
        ))}
      </div>

      {/* Sección del carrito de compras */}
      <h2>Carrito</h2>
      <div>
        {/* Mostramos cada producto en el carrito */}
        {carrito.map((p, i) => ( // i es el índice (posición) del producto en la lista
          <div key={i}>
            {p.nombre} - ${p.precio}{" "} {/* El {" "} es un espacio */}
            <button onClick={() => eliminarDelCarrito(i)}>Eliminar</button> {/* Botón para eliminar este producto del carrito */}
          </div>
        ))}
        <p><strong>Total:</strong> ${total}</p> {/* Mostramos el total de todos los productos */}
      </div>

      {/* Sección de comentarios */}
      <h2>Comentarios</h2>
      {/* Formulario para escribir comentarios */}
      <form onSubmit={agregarComentario}> {/* onSubmit se ejecuta cuando presionan Enter o el botón */}
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={comentarioInput}
          onChange={(e) => setComentarioInput(e.target.value)}
        />
        <button type="submit">Enviar</button> {/* type="submit" hace que active el onSubmit del form */}
      </form>
      {/* Mostramos todos los comentarios que han escrito */}
      <div>
        {comentarios.map((c, i) => (
          <div key={i}>{c}</div> // c es el contenido del comentario, i es su posición
        ))}
      </div>
    </div>
  );
}
