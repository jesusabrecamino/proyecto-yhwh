"use client";

import Swal from "sweetalert2";

export default function Donaciones() {

  const copiarDatos = async () => {
    const datos = `Titular: IGLESIA DE CRISTO JESUS ABRE CAMINOS
RUT: 652589111
Banco: Mercado Pago
Tipo de cuenta: Vista
Número de cuenta: 1069639057
Correo: iglesiajac@gmail.com`;

    try {
  await navigator.clipboard.writeText(datos);

  await Swal.fire({
    icon: "success",
    title: "¡Datos bancarios copiados!",
    html: `
      <p>Los datos para realizar la transferencia fueron copiados correctamente.</p>
      <p style="margin-top:12px;">
        Ahora puedes pegarlos directamente en tu aplicación bancaria.
      </p>
      <p style="margin-top:12px;">
        <strong>¡Muchas gracias por tu disposición a apoyar!</strong>
      </p>
    `,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#B8860B",
  });

} catch {
  await Swal.fire({
    icon: "error",
    title: "No pudimos copiar los datos",
    text: "Puedes copiar los datos bancarios manualmente desde esta página.",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#991b1b",
  });
}
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-16">

      <div className="mx-auto max-w-3xl">

        {/* ENCABEZADO */}
        <div className="mb-10 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[6px] text-[#B8860B]">
            Iglesia Jesús Abre Caminos
          </p>

          <h1
            className="mb-6 text-5xl text-red-900 md:text-6xl"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Quiero apoyar
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Si deseas colaborar con este encuentro, puedes hacerlo mediante
            una transferencia bancaria. Cada aporte será recibido con gratitud
            y destinado a apoyar la realización de esta actividad.
          </p>

        </div>

        {/* TARJETA DATOS BANCARIOS */}
        <div className="overflow-hidden rounded-3xl border border-[#e5d7b5] bg-white shadow-xl">

          <div className="bg-red-900 px-8 py-6 text-center">

            <h2
              className="text-3xl text-white"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Datos para transferencia
            </h2>

          </div>

          <div className="space-y-5 p-8 md:p-10">

            {/* TITULAR */}
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Titular de la cuenta
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                IGLESIA DE CRISTO JESUS ABRE CAMINOS
              </p>
            </div>

            {/* RUT */}
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                RUT
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                652589111
              </p>
            </div>

            {/* BANCO */}
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Banco
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                Mercado Pago
              </p>
            </div>

            {/* TIPO DE CUENTA */}
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Tipo de cuenta
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                Vista
              </p>
            </div>

            {/* NÚMERO DE CUENTA */}
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Número de cuenta
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                1069639057
              </p>
            </div>

                        {/* CORREO */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Correo
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-800">
                iglesiajac@gmail.com
              </p>
            </div>

          </div>

          {/* BOTÓN COPIAR */}
          <div className="px-8 pb-10 md:px-10">

            <button
              onClick={copiarDatos}
              className="w-full rounded-2xl bg-[#B8860B] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#9b6d00] hover:scale-[1.02]"
            >
              📋 Copiar datos bancarios
            </button>

          </div>

        </div>

        {/* MENSAJE FINAL */}
        <div className="mt-10 text-center">

          <p
            className="text-2xl text-red-900"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Gracias por sembrar y ser parte de este encuentro.
          </p>

          <p className="mt-3 text-gray-600">
            Que el Señor bendiga cada corazón dispuesto a colaborar.
          </p>

          <a
            href="/"
            className="mt-8 inline-block rounded-full border border-red-900 px-8 py-3 font-semibold text-red-900 transition hover:bg-red-900 hover:text-white"
          >
            ← Volver al encuentro
          </a>

        </div>

      </div>

    </main>
  );
}