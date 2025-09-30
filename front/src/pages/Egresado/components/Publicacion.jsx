import React, { useState } from "react";
import { ThumbsUp, MessageCircle, Share, MoreHorizontal, X, Bookmark, Link, Flag } from "lucide-react";

function Publicacion({ post, isLiked, perfilesUsuarios, onLike, onDelete, onAddComment }) {
  const [menuActivo, setMenuActivo] = useState(false);
  const comentariosRapidos = ["¡Qué buena noticia! 🎉", "Felicidades 👏", "Éxitos 💪"];

  const obtenerImagenPerfil = (autor, perfilImgEspecifico = null) => {
    if (perfilImgEspecifico) return perfilImgEspecifico;
    return perfilesUsuarios[autor] || null;
  };

  const manejarMenu = (accion) => {
    if (accion === "guardar") alert(`Guardaste la publicación de ${post.autor}`);
    if (accion === "copiar") {
      navigator.clipboard.writeText(post.contenido);
      alert("Contenido copiado al portapapeles");
    }
    if (accion === "reportar") alert(`Reportaste la publicación de ${post.autor}`);
    setMenuActivo(false);
  };

  return (
    <article className="bg-white rounded-2xl p-5 relative">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {obtenerImagenPerfil(post.autor, post.perfilImg) ? (
            <img
              src={obtenerImagenPerfil(post.autor, post.perfilImg)}
              alt="Perfil"
              className="w-11 h-11 rounded-full object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {post.autor.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-green-700">{post.autor}</h4>
            <time className="text-xs text-gray-400">Hace poco</time>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setMenuActivo(!menuActivo)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <MoreHorizontal size={20} />
            </button>
            
            {menuActivo && (
              <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[180px] z-20">
                <button
                  onClick={() => manejarMenu("guardar")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Bookmark size={16} className="text-gray-400" />
                  <span>Guardar publicación</span>
                </button>
                
                <button
                  onClick={() => manejarMenu("copiar")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Link size={16} className="text-gray-400" />
                  <span>Copiar enlace</span>
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={() => manejarMenu("reportar")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Flag size={16} />
                  <span>Reportar publicación</span>
                </button>
              </div>
            )}
          </div>
          
          {post.autor === "Tú" && (
            <button
              onClick={() => onDelete(post.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      <p className="text-gray-700 mt-3 leading-relaxed">{post.contenido}</p>

      {post.imagen && (
        <img
          src={post.imagen}
          alt="Adjunto"
          className="mt-3 rounded-xl max-h-64 w-full object-cover"
        />
      )}

      {post.video && (
        <video controls className="mt-3 rounded-xl max-h-64 w-full object-cover">
          <source src={post.video} type="video/mp4" />
        </video>
      )}

      <footer className="mt-4 flex items-center justify-around text-gray-500 text-sm">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1 transition ${
            isLiked ? "text-green-600 font-semibold" : "hover:text-green-600"
          }`}
        >
          <ThumbsUp size={16} /> Me gusta ({post.likes})
        </button>
        <button className="flex items-center gap-1 hover:text-green-600 transition">
          <MessageCircle size={16} /> Comentar ({post.comentarios.length})
        </button>
        <button className="flex items-center gap-1 hover:text-green-600 transition">
          <Share size={16} /> Compartir
        </button>
      </footer>

      {post.comentarios.length > 0 && (
        <div className="mt-4 pt-3 space-y-3 border-t border-gray-100">
          {post.comentarios.map((comentario, i) => (
            <div key={i} className="text-sm text-gray-700 flex items-start gap-3">
              {obtenerImagenPerfil(comentario.autor, comentario.perfilImg) ? (
                <img
                  src={obtenerImagenPerfil(comentario.autor, comentario.perfilImg)}
                  alt="Perfil"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-medium flex-shrink-0">
                  {comentario.autor.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2">
                  <p className="font-medium text-green-700 text-xs">{comentario.autor}</p>
                  <p className="text-gray-800 mt-1">{comentario.texto}</p>
                </div>
                <time className="text-xs text-gray-400 mt-1 block pl-1">Hace poco</time>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        {comentariosRapidos.map((c, i) => (
          <button
            key={i}
            onClick={() => onAddComment(post.id, c)}
            className="text-xs text-green-700 hover:text-green-600 transition"
          >
            {c}
          </button>
        ))}
      </div>
    </article>
  );
}

export default Publicacion;