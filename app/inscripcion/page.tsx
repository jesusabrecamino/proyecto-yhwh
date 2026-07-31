"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function Inscripcion() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  async function guardarInscripcion(e: React.FormEvent) {
    e.preventDefault();

    const { data: existente, error: errorBusqueda } = await supabase
  .from("inscripciones")
  .select("*")
  .or(`teléfono.eq.${telefono},correo.eq.${correo}`);

console.log("Existente:", existente);
console.log("Error búsqueda:", errorBusqueda);

if (existente && existente.length > 0) {
  await Swal.fire({
    icon: "warning",
    title: "Ya estás inscrito",
    text: "El teléfono o el correo ya se encuentran registrados.",
    confirmButtonColor: "#b91c1c",
  });

  return;
}

// Obtener el último ID registrado
const { data: ultimoRegistro } = await supabase
  .from("inscripciones")
  .select("id")
  .order("id", { ascending: false })
  .limit(1)
  .single();

const siguienteNumero = ultimoRegistro
  ? ultimoRegistro.id + 1
  : 1;

const codigo = `YHWH-${String(siguienteNumero).padStart(6, "0")}`;

const { error } = await supabase.from("inscripciones").insert([
  {
    nombre,
    teléfono: telefono,
    correo,
    codigo,
  },
]);

    if (error) {
  console.error(error);

  await Swal.fire({
    icon: "error",
    title: "Error",
    text: "No fue posible completar la inscripción.",
    confirmButtonColor: "#b91c1c",
  });
} else {
  await Swal.fire({
    icon: "success",
    title: "¡Inscripción realizada!",
    text: "Tu inscripción fue registrada correctamente.",
    confirmButtonColor: "#16a34a",
  });
await fetch("/api/enviar-correo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nombre,
    correo,
    codigo,
  }),
});
  setNombre("");
  setTelefono("");
  setCorreo("");
}
}
  return (
    <main className="min-h-screen bg-red-700 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
          Inscripción al Encuentro
        </h1>

        <form onSubmit={guardarInscripcion} className="space-y-5">
          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition"
          >
            Confirmar inscripción
                    </button>

        </form>

        {/* VOLVER AL ENCUENTRO */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block rounded-full border border-red-700 px-8 py-3 font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
          >
            ← Volver al encuentro
          </a>
        </div>

      </div>
    </main>
  );
}