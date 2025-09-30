import React, { useState } from "react";
import SidebarIzquierda from "./components/SidebarIzquierda";
import SidebarDerecha from "./components/SidebarDerecha";
import FeedPrincipal from "./components/FeedPrincipal";
import CrearPublicacion from "./components/CrearPublicacion";
function ForoEgresados() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: "Ana Pérez",
      contenido: "¡Feliz de compartir mi nuevo proyecto con ustedes! 🚀",
      likes: 12,
      comentarios: [
        { 
          texto: "¡Felicitaciones Ana! 🎉", 
          autor: "Carlos López",
          perfilImg: null 
        },
        { 
          texto: "Se ve increíble 👏", 
          autor: "María García",
          perfilImg: null 
        }
      ],
      imagen: null,
      video: null,
      perfilImg: null,
    },
    {
      id: 2,
      autor: "Carlos López",
      contenido: "¿Alguien tiene recursos para mejorar en React? 🤔",
      likes: 5,
      comentarios: [
        { 
          texto: "Te paso un curso buenazo 🔗", 
          autor: "Ana Pérez",
          perfilImg: null 
        },
        { 
          texto: "Yo también ando en eso 💻", 
          autor: "Pedro Martínez",
          perfilImg: null 
        }
      ],
      imagen: null,
      video: null,
      perfilImg: null,
    },
  ]);

  const [perfil, setPerfil] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [perfilesUsuarios, setPerfilesUsuarios] = useState({
    "Ana Pérez": null,
    "Carlos López": null,
    "María García": null,
    "Pedro Martínez": null,
    "Tú": null
  });

  const agregarPost = (nuevoPost) => {
    setPosts([nuevoPost, ...posts]);
  };

  const darLike = (id) => {
    if (likedPosts.includes(id)) {
      setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes - 1 } : p)));
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
      setLikedPosts([...likedPosts, id]);
    }
  };

  const eliminarPost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    setLikedPosts(likedPosts.filter((postId) => postId !== id));
  };

  const agregarComentario = (id, texto) => {
    const nuevoComentario = {
      texto: texto,
      autor: "Tú",
      perfilImg: perfil || null
    };

    setPosts(
      posts.map((p) =>
        p.id === id ? { 
          ...p, 
          comentarios: [...p.comentarios, nuevoComentario] 
        } : p
      )
    );
  };

  const cambiarPerfil = (nuevaImagen) => {
    setPerfil(nuevaImagen);
    setPerfilesUsuarios(prev => ({
      ...prev,
      "Tú": nuevaImagen
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6">
        <SidebarIzquierda 
          perfil={perfil}
          cambiarPerfil={cambiarPerfil}
        />
        
        <main className="md:col-span-6 space-y-6">
          <CrearPublicacion 
            perfil={perfil}
            agregarPost={agregarPost}
          />
          
          <FeedPrincipal 
            posts={posts}
            perfil={perfil}
            likedPosts={likedPosts}
            perfilesUsuarios={perfilesUsuarios}
            darLike={darLike}
            eliminarPost={eliminarPost}
            agregarComentario={agregarComentario}
            cambiarPerfil={cambiarPerfil}
          />
        </main>

        <SidebarDerecha />
      </div>
    </div>
  );
}

export { ForoEgresados };
export default ForoEgresados;