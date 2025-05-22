"use client"; 
import { useEffect, useState } from "react";

// Componente principal
export default function Page() {
 const [productos] = useState([
  {
    id: 1,
    nombre: ' BOSS White Sneakers',
    precio: 80000,
    imagen: '/images/BOSS White Sneakers.jpeg',
    categoria: 'Dama',
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

  const [carrito, setCarrito] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [comentarioInput, setComentarioInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");

  useEffect(() => {
    aplicarBusqueda();
  }, [filtro, busqueda]);

  const login = () => {
    const user = usuarios.find(
      u => u.usuario === userInput && u.contraseña === passInput
    );
    if (user) {
      setUsuarioActual(user);
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  const register = () => {
    if (userInput && passInput) {
      setUsuarios([...usuarios, { usuario: userInput, contraseña: passInput }]);
      alert("¡Usuario registrado correctamente!");
    }
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  const aplicarBusqueda = () => {
    let filtrados = filtro === "todos"
      ? productos
      : productos.filter(p => p.categoria === filtro);

    let resultados = filtrados.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    setProductosFiltrados(resultados);
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    if (comentarioInput.trim()) {
      setComentarios([...comentarios, comentarioInput.trim()]);
      setComentarioInput("");
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1 >MomentumShoes</h1>

      {/* Login y registro */}
      <div>
        <input
          type="text"
          placeholder="Usuario"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
        />
        <button onClick={login}>Iniciar sesión</button>
        <button onClick={register}>Registrate</button>
        {usuarioActual && (
          <p style={{ fontWeight: 'bold' }}>
            ¡Hola {usuarioActual.usuario}! Explora nuestra colección exclusiva.
          </p>
        )}
      </div>

      {/* Filtros */}
      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Dama">Dama</option>
          <option value="Caballero">Caballero</option>
        </select>
      </div>

      {/* Productos */}
      <div className="producto-grid" style={{ marginTop: 20 }}>
        {productosFiltrados.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.imagen} alt={p.nombre} className="producto-img" />
            <h3>{p.nombre}</h3>
            <p><strong>${p.precio}</strong></p>
            <p>{p.descripcion}</p>
            <button onClick={() => agregarAlCarrito(p)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <h2>Carrito</h2>
      <div>
        {carrito.map((p, i) => (
          <div key={i}>
            {p.nombre} - ${p.precio}{" "}
            <button onClick={() => eliminarDelCarrito(i)}>Eliminar</button>
          </div>
        ))}
        <p><strong>Total:</strong> ${total}</p>
      </div>

      {/* Comentarios */}
      <h2>Comentarios</h2>
      <form onSubmit={agregarComentario}>
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={comentarioInput}
          onChange={(e) => setComentarioInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <div>
        {comentarios.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
    </div>
  );
}
