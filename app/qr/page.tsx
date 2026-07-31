"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2] p-8">

      <div className="w-full max-w-xl rounded-3xl border border-[#e5d7b5] bg-white p-10 text-center shadow-2xl">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[5px] text-[#B8860B]">
          Iglesia Jesús Abre Caminos
        </p>

        <h1
          className="text-4xl md:text-5xl text-red-900 mb-4"
          style={{ fontFamily: "var(--font-title)" }}
        >
          Encuentro de
          <br />
          Matrimonios y Parejas
        </h1>

        <p className="mb-8 text-gray-600 text-lg">
          Escanea el código para conocer todos los detalles del encuentro.
        </p>

        {/* QR */}
        <div className="inline-block rounded-3xl border-2 border-[#D4AF37] bg-white p-6 shadow-lg">

          <QRCodeSVG
            value="https://proyecto-yhwh-eight.vercel.app"
            size={300}
            level="H"
            includeMargin={true}
          />

        </div>

        <p className="mt-8 text-xl font-semibold text-red-900">
          15 de Agosto de 2026 • 18:00 hrs
        </p>

        <p className="mt-2 text-gray-600">
          Av. Garibaldi 643, Batuco
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Desde nuestro sitio podrás reservar tu cupo,
          ofrecerte para servir y encontrar toda la información del encuentro.
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-full border border-red-900 px-8 py-3 font-semibold text-red-900 transition hover:bg-red-900 hover:text-white"
        >
          ← Volver al encuentro
        </a>

      </div>

    </main>
  );
}