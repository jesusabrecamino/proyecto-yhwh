"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function Inscripcion() {
  // PERSONA 1
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  // PERSONA 2
  const [nombrePareja, setNombrePareja] = useState("");
  const [telefonoPareja, setTelefonoPareja] = useState("");
  const [correoPareja, setCorreoPareja] = useState("");

  // OBSERVACIONES
  const [observaciones, setObservaciones] = useState("");

  // EVITAR DOBLE ENVÍO
  const [enviando, setEnviando] = useState(false);

  async function guardarInscripcion(e: React.FormEvent) {
    e.preventDefault();

    if (enviando) return;

    setEnviando(true);

    try {
      // ==========================================
      // COMPROBAR DATOS DE PERSONA 1
      // ==========================================

      const { data: existente, error: errorBusqueda } = await supabase
        .from("inscripciones")
        .select("id")
        .or(`teléfono.eq.${telefono},correo.eq.${correo}`);

      if (errorBusqueda) {
        console.error("Error buscando inscripción:", errorBusqueda);

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No fue posible comprobar la inscripción. Inténtalo nuevamente.",
          confirmButtonColor: "#b91c1c",
        });

        return;
      }

      if (existente && existente.length > 0) {
        await Swal.fire({
          icon: "warning",
          title: "Esta pareja ya podría estar inscrita",
          text: "El teléfono o el correo de la Persona 1 ya se encuentran registrados.",
          confirmButtonColor: "#b91c1c",
        });

        return;
      }

      // ==========================================
      // CREAR PRIMERO LA INSCRIPCIÓN
      // SUPABASE GENERARÁ EL ID
      // ==========================================

      const { data: nuevaInscripcion, error: errorInsertar } = await supabase
        .from("inscripciones")
        .insert([
          {
            nombre,
            teléfono: telefono,
            correo,

            nombre_pareja: nombrePareja,
            telefono_pareja: telefonoPareja || null,
            correo_pareja: correoPareja || null,
            observaciones: observaciones || null,
          },
        ])
        .select("id")
        .single();

      if (errorInsertar || !nuevaInscripcion) {
        console.error("Error creando inscripción:", errorInsertar);

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No fue posible completar la inscripción.",
          confirmButtonColor: "#b91c1c",
        });

        return;
      }

      // ==========================================
      // CREAR CÓDIGO UTILIZANDO EL ID REAL
      // ==========================================

      const codigo = `YHWH-${String(nuevaInscripcion.id).padStart(
        6,
        "0"
      )}`;

      // ==========================================
      // GUARDAR CÓDIGO EN EL MISMO REGISTRO
      // ==========================================

      const { error: errorCodigo } = await supabase
        .from("inscripciones")
        .update({
          codigo,
        })
        .eq("id", nuevaInscripcion.id);

      if (errorCodigo) {
        console.error("Error guardando código:", errorCodigo);

        // Si no logramos completar el código,
        // eliminamos el registro incompleto.
        await supabase
          .from("inscripciones")
          .delete()
          .eq("id", nuevaInscripcion.id);

        await Swal.fire({
          icon: "error",
          title: "No se pudo completar la inscripción",
          text: "No fue posible generar el código de inscripción. Inténtalo nuevamente.",
          confirmButtonColor: "#b91c1c",
        });

        return;
      }

      // ==========================================
      // INSCRIPCIÓN COMPLETADA
      // ==========================================

      await Swal.fire({
        icon: "success",
        title: "¡Inscripción realizada!",
        html: `
          <p>La inscripción de la pareja fue registrada correctamente.</p>

          <p style="margin-top:12px;">
            <strong>${nombre} y ${nombrePareja}</strong>
          </p>

          <p style="margin-top:12px;">
            Código de inscripción:
          </p>

          <p style="
            font-size:20px;
            font-weight:bold;
            margin-top:5px;
            color:#b91c1c;
          ">
            ${codigo}
          </p>

          <p style="margin-top:15px;">
            ¡Les esperamos con mucho cariño, Bendiciones!
          </p>
        `,
        confirmButtonColor: "#16a34a",
      });

      // ==========================================
      // ENVIAR CORREO DE CONFIRMACIÓN
      // ==========================================

      try {
        const respuestaCorreo = await fetch("/api/enviar-correo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            nombrePareja,
            correo,
            codigo,
          }),
        });

        if (!respuestaCorreo.ok) {
          console.error(
            "El correo de confirmación no pudo ser enviado."
          );
        }
      } catch (errorCorreo) {
        console.error(
          "Error enviando correo:",
          errorCorreo
        );
      }

      // ==========================================
      // LIMPIAR FORMULARIO
      // ==========================================

      setNombre("");
      setTelefono("");
      setCorreo("");

      setNombrePareja("");
      setTelefonoPareja("");
      setCorreoPareja("");

      setObservaciones("");
    } catch (error) {
      console.error("Error inesperado:", error);

      await Swal.fire({
        icon: "error",
        title: "Ocurrió un problema",
        text: "No fue posible completar la inscripción. Inténtalo nuevamente.",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-red-700 flex items-center justify-center px-4 py-10 md:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center text-red-700 mb-3">
          Inscripción al Encuentro
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Una inscripción corresponde a una pareja.
        </p>

        <form
          onSubmit={guardarInscripcion}
          className="space-y-6"
        >

          {/* PERSONA 1 */}

          <section>
            <div className="mb-4">
              <p className="text-sm font-bold uppercase tracking-wider text-red-700">
                Persona 1
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Datos principales de contacto
              </p>
            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nombre y apellido"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
                required
              />

              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
                required
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
                required
              />

            </div>
          </section>

          <div className="border-t border-gray-200" />

          {/* PERSONA 2 */}

          <section>
            <div className="mb-4">

              <p className="text-sm font-bold uppercase tracking-wider text-red-700">
                Persona 2
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Datos de quien asistirá contigo
              </p>

            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nombre y apellido"
                value={nombrePareja}
                onChange={(e) =>
                  setNombrePareja(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
                required
              />

              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                value={telefonoPareja}
                onChange={(e) =>
                  setTelefonoPareja(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
              />

              <input
                type="email"
                placeholder="Correo electrónico (opcional)"
                value={correoPareja}
                onChange={(e) =>
                  setCorreoPareja(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100"
              />

            </div>
          </section>

          <div className="border-t border-gray-200" />

          {/* OBSERVACIONES */}

          <section>

            <div className="mb-3">

              <p className="text-sm font-bold uppercase tracking-wider text-red-700">
                Observaciones
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Puedes indicarnos alguna necesidad especial. Este campo es opcional.
              </p>

            </div>

            <textarea
              placeholder="Observaciones o necesidades especiales (opcional)"
              value={observaciones}
              onChange={(e) =>
                setObservaciones(e.target.value)
              }
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-600 placeholder:opacity-100 resize-none"
            />

          </section>

          {/* BOTÓN */}

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-red-700 text-white py-4 rounded-lg font-bold hover:bg-red-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {enviando
              ? "Registrando inscripción..."
              : "Confirmar inscripción de la pareja"}
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