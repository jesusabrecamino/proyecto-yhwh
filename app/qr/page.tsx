"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h1 className="text-3xl font-bold text-red-700 mb-6">
        Escanea para inscribirte
      </h1>

      <QRCodeSVG
        value="https://proyecto-yhwh-eight.vercel.app"
        size={300}
      />

      <p className="mt-6 text-gray-600 text-center">
        Encuentro de Matrimonios y Parejas
        <br />
        Iglesia Jesús Abre Caminos
      </p>
    </main>
  );
}