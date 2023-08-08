import { Link } from "react-router-dom";
import React from "react";

// Icons
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai"
import { AiOutlineUser, AiOutlineShop } from "react-icons/ai"

/*
La función SidebarItem():
Aquí se define una parte de la barra lateral de la aplicación. En React, los componentes son piezas de código que pueden reutilizarse para construir la interfaz de usuario.
Esta función devuelve un elemento visual (en React se llama JSX) que contiene un icono de icon y el texto que viene de la variable text.
Esta parte se puede repetir fácilmente para crear varios elementos similares en la barra lateral.

NOTA: En React, los componentes se llaman como en las etiquetas HTML, pero es como si llamara a la función normalmente, por ejemplo:

SidebarItem() == <SidebarItem /> == <SidebarItem><SidebarItem/>

Entonces, cuando ve que se llama <SidebarItem />, es lo mismo que SidebarItem()
Otra cosa es que los <div/> también son funciones pero no vemos la declaración de ninguna función llamada div, eso es porque React la crea para nosotros, hace eso, son todas las etiquetas HTML.
*/
export function SidebarItem({ text, icon, to }) {
  return (
    <Link to={to} className="sidebar-item">
      <div className="sidebar-item-content">
        <div className="sidebar-item-center">
          <div className="sidebar-item-icon">{icon}</div>
          <div className="sidebar-item-text">{text}</div>
        </div>
      </div>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        NetReady
      </div>
      <SidebarItem to="/stock" text="Stock" icon={<AiOutlineShop />} />
      <SidebarItem to="/orders" text="Pedidos" icon={<AiOutlineCheckCircle />} />
      <SidebarItem to="/customers" text="Clientes" icon={<AiOutlineUser />} />
      <SidebarItem to="/catalog" text="Catálogo Online" icon={<AiOutlineCheckCircle />} />
      <SidebarItem to="/control" text="Control y seguimiento" icon={<AiOutlineFieldTime />} />
    </div>
  )
}

export default Sidebar