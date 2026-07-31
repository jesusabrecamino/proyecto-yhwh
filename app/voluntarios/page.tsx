"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function Voluntarios() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("voluntarios")
      .insert([
        {
          nombre,
          telefono,
          correo,
          mensaje,
        },
      ]);

    if (error) {
  console.error(error);

  await Swal.fire({
    icon: "error",
    title: "No pudimos enviar tu solicitud",
    text: "Por favor, inténtalo nuevamente.",
    confirmButtonColor: "#991b1b",
  });

  return;
}

await Swal.fire({
  icon: "success",
  title: "¡Gracias por querer servir!",
  html: `
    <p>Hemos recibido correctamente tus datos.</p>
    <p style="margin-top:12px;">
      Gracias por disponer tu tiempo y corazón para servir en este encuentro.
    </p>
    <p style="margin-top:12px;">
      <strong>¡Bendiciones!</strong>
    </p>
  `,
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#B8860B",
});

setNombre("");
setTelefono("");
setCorreo("");
setMensaje("");
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] py-20 px-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12">

        <h1
          className="text-5xl text-center text-red-900 mb-6"
          style={{ fontFamily: "var(--font-title)" }}
        >
          Formulario de Voluntarios
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Gracias por querer servir en este encuentro.
        </p>

        <form onSubmit={enviar} className="space-y-6">

          <input
            type="text"
            placeholder="Nombre completo"
            required
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
          />

          <input
            type="text"
            placeholder="Teléfono"
            required
            value={telefono}
            onChange={(e)=>setTelefono(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={correo}
            onChange={(e)=>setCorreo(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
          />

          <textarea
            placeholder="¿Hay algo que quieras comentarnos?"
            rows={5}
            value={mensaje}
            onChange={(e)=>setMensaje(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
          />

          <button
            className="w-full rounded-xl bg-[#B8860B] py-4 text-white font-bold hover:bg-[#9b6d00]"
          >
            Enviar solicitud
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