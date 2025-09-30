import React, { useState } from "react";
import { Globe, Video, Image, Smile } from "lucide-react";

function CrearPublicacion({ perfil, agregarPost }) {
  const [nuevoPost, setNuevoPost] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [tipoPublicacion, setTipoPublicacion] = useState("texto");
  const [mostrarEmojis, setMostrarEmojis] = useState(false);

  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
    "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
    "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
    "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
    "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
    "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈",
    "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾",
    "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿",
    "😾", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞",
    "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍",
    "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲"];

  const handleArchivoChange = (e, tipo) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setTipoPublicacion(tipo);
    }
  };

  const agregarEmoji = (emoji) => {
    setNuevoPost(prev => prev + emoji);
    setMostrarEmojis(false);
  };

  const handlePublicar = () => {
    if (nuevoPost.trim() === "" && !archivo) return;

    let nuevo = {
      id: Date.now(),
      autor: "Tú",
      contenido: nuevoPost,
      likes: 0,
      comentarios: [],
      imagen: null,
      video: null,
      perfilImg: perfil || null,
    };

    if (archivo) {
      if (archivo.type.startsWith("image/")) {
        nuevo.imagen = URL.createObjectURL(archivo);
      } else if (archivo.type.startsWith("video/")) {
        nuevo.video = URL.createObjectURL(archivo);
      }
    }

    agregarPost(nuevo);
    setNuevoPost("");
    setArchivo(null);
    setTipoPublicacion("texto");
  };

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {perfil ? (
            <img src={perfil} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              G
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800">Gonzalo Quineche</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Globe size={12} />
              <span>Publicar para Cualquiera</span>
            </div>
          </div>
        </div>
      </div>

      <textarea
        className="w-full border-0 rounded-xl p-3 focus:outline-none focus:ring-0 resize-none min-h-[100px] text-black text-lg placeholder-gray-400"
        placeholder="¿Sobre qué quieres hablar? 😊"
        value={nuevoPost}
        onChange={(e) => setNuevoPost(e.target.value)}
      />

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => setMostrarEmojis(!mostrarEmojis)}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
        >
          <Smile size={20} />
          <span className="text-sm">Emojis</span>
        </button>
      </div>

      {mostrarEmojis && (
        <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 max-h-48 overflow-y-auto">
          <div className="grid grid-cols-8 gap-1">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => agregarEmoji(emoji)}
                className="text-lg hover:scale-110 transition-transform p-1 hover:bg-white rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {archivo && (
        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">📂 {archivo.name}</span>
            <button onClick={() => setArchivo(null)} className="text-gray-400 hover:text-red-500">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            tipoPublicacion === "video" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
          }`}>
            <Video size={18} />
            <span className="text-sm">Video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleArchivoChange(e, "video")}
            />
          </label>

          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            tipoPublicacion === "foto" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
          }`}>
            <Image size={18} />
            <span className="text-sm">Foto</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleArchivoChange(e, "foto")}
            />
          </label>
        </div>

        <button
          onClick={handlePublicar}
          disabled={!nuevoPost.trim() && !archivo}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            nuevoPost.trim() || archivo
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-[1.02]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}

export default CrearPublicacion;