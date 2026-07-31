"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

useEffect(() => {
  const targetDate = new Date("2026-08-15T18:00:00");

  const interval = setInterval(() => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) return;

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-screen">

        <Image
          src="/imagenes/invitacion.jpeg"
          alt="Encuentro de Matrimonios"
          fill
          priority
          className="object-cover"
        />

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Contenido */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">

          <div className="max-w-3xl text-center text-white">

            <div className="mb-8">
  <span className="inline-block rounded-full border border-white/30 bg-white/10 px-8 py-3 backdrop-blur-md">
    <span
      className="text-xl md:text-2xl font-semibold uppercase tracking-[8px] text-white"
      style={{
        textShadow: "0 2px 15px rgba(0,0,0,.8)",
      }}
    >
      Iglesia Jesús Abre Caminos
    </span>
  </span>
</div>

            <h1
  className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.95] font-bold text-[#D4AF37]"
  style={{
    fontFamily: "var(--font-title)",
    textShadow: "0 3px 12px rgba(0,0,0,.45)",
  }}
>
  Encuentro de
  <br />
  Matrimonios y Parejas
</h1>

            <div className="mt-8 max-w-2xl mx-auto">


  <p
    className="text-2xl md:text-3xl italic leading-relaxed text-white"
    style={{ fontFamily: "var(--font-title)" }}
  >
    "Las muchas aguas no podrán apagar el amor,
    <br />
    ni lo ahogarán los ríos."
  </p>

  <p
  className="mt-5 text-white text-2xl tracking-wide"
  style={{ fontFamily: "var(--font-title)" }}
>
  Cantares 8:7
</p>


</div>

            <a
              href="/inscripcion"
              className="inline-block mt-10 rounded-full bg-red-700 px-10 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-red-800 hover:scale-105"
            >
              Reservar mi cupo
            </a>
            <div className="mt-16">

  <p className="uppercase tracking-[8px] text-[#D4AF37] text-sm font-semibold mb-8">
    Faltan para nuestro encuentro
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">

    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-6 shadow-xl">
      <div className="text-5xl font-bold text-[#D4AF37]">
        {timeLeft.days}
      </div>
      <div className="mt-2 text-white uppercase tracking-[3px] text-sm">
        Días
      </div>
    </div>

    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-6 shadow-xl">
      <div className="text-5xl font-bold text-[#D4AF37]">
        {timeLeft.hours}
      </div>
      <div className="mt-2 text-white uppercase tracking-[3px] text-sm">
        Horas
      </div>
    </div>

    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-6 shadow-xl">
      <div className="text-5xl font-bold text-[#D4AF37]">
        {timeLeft.minutes}
      </div>
      <div className="mt-2 text-white uppercase tracking-[3px] text-sm">
        Minutos
      </div>
    </div>

    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-6 shadow-xl">
      <div className="text-5xl font-bold text-[#D4AF37]">
        {timeLeft.seconds}
      </div>
      <div className="mt-2 text-white uppercase tracking-[3px] text-sm">
        Segundos
      </div>
    </div>

  </div>

</div>

          </div>

        </div>

      </section>

{/* BIENVENIDA */}

<section className="bg-gradient-to-b from-white to-[#f8f4ee] py-24">

  <div className="mx-auto max-w-[1700px] px-10">

    <div className="grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">

      {/* Foto */}
<div className="flex justify-end items-center pr-6">

  <div className="relative w-full max-w-[700px]">

    <Image
      src="/imagenes/pastores.png"
      alt="Pastores"
      width={900}
      height={900}
      className="w-full h-auto object-contain"
    />

  </div>

</div>

{/* Texto */}
<div className="max-w-2xl">

        <p className="uppercase tracking-[6px] text-red-700 font-semibold mb-4">
          Una invitación para ustedes
        </p>

        <h2
  className="text-5xl lg:text-6xl xl:text-7xl text-red-900 mb-8 leading-none"
  style={{ fontFamily: "var(--font-title)" }}
>
  <span className="block text-4xl lg:text-5xl mb-4">
    Pastores
  </span>

  <span className="block">
    Nicolás&nbsp;Quintanilla
  </span>

  <span className="block text-4xl lg:text-5xl my-2">
    &
  </span>

  <span className="block">
    Jennifer&nbsp;Carrasco
  </span>
</h2>

{/* ← AQUÍ PEGA ESTE BLOQUE */}
<div className="w-56 h-[3px] rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] mb-10"></div>

        <p className="text-xl leading-9 text-gray-700">
  Como matrimonio pastoral queremos extenderles una invitación muy especial.
  Hemos preparado este encuentro con oración, cariño y el deseo de que cada
  pareja viva un tiempo de renovación, comunión y crecimiento junto al Señor.
</p>

<p className="mt-6 text-xl leading-9 text-gray-700">
  Será una oportunidad para compartir, aprender, fortalecer el matrimonio y
  recordar que cuando Cristo está en el centro del hogar, el amor siempre
  encuentra un nuevo comienzo.
</p>

<p
  className="mt-8 text-2xl text-red-800"
  style={{ fontFamily: "var(--font-title)" }}
>
  ¡Será una alegría recibirles!
</p>

      </div>

    </div>

  </div>

</section>
{/* INFORMACIÓN */}

<section className="bg-[#faf7f2] py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2
      className="text-center text-5xl text-red-900 mb-5"
      style={{ fontFamily: "var(--font-title)" }}
    >
      Todo está preparado
    </h2>

    <p className="text-center text-gray-600 text-lg mb-16">
      Les esperamos para vivir una noche especial junto al Señor.
    </p>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">📅</div>
        <h3 className="font-bold text-red-900 text-xl mb-2">Fecha</h3>
        <p className="text-gray-700">
          15 de Agosto<br />2026
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">🕕</div>
        <h3 className="font-bold text-red-900 text-xl mb-2">Hora</h3>
        <p className="text-gray-700">
          18:00 hrs
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">📍</div>
        <h3 className="font-bold text-red-900 text-xl mb-2">Lugar</h3>
        <p className="text-gray-700">
          Av. Garibaldi 643<br />
          Batuco
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">❤️</div>
        <h3 className="font-bold text-red-900 text-xl mb-2">Entrada</h3>
        <p className="text-gray-700">
          Gratuita<br />
          Con inscripción
        </p>
      </div>

        </div>

    {/* GOOGLE CALENDAR */}
    <div className="mt-14 text-center">

      <p className="mb-5 text-gray-600">
        Guarda la fecha para que no olvides nuestro encuentro.
      </p>

      <a
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Encuentro%20de%20Matrimonios%20y%20Parejas&dates=20260815T220000Z/20260815T230000Z&details=Encuentro%20de%20Matrimonios%20y%20Parejas%20-%20Iglesia%20Jes%C3%BAs%20Abre%20Caminos&location=Av.%20Garibaldi%20643%2C%20Batuco%2C%20Chile"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-full bg-red-700 px-9 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-red-800 hover:scale-105"
      >
        📅 Agregar a Google Calendar
      </a>

      <p className="mt-4 text-sm text-gray-500">
        Sábado 15 de agosto de 2026 • 18:00 hrs
      </p>

    </div>

  </div>

</section>

      {/* INVITACIÓN */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-6xl px-6">

          <h2
            className="text-center text-5xl text-red-800 mb-16"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Nuestra Invitación
          </h2>

          <div className="flex justify-center">

  <div className="relative rounded-[34px] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

    {/* Marco exterior */}
    <div className="rounded-[28px] border border-[#c9a84f] p-2">

      {/* Marco interior */}
      <div className="rounded-[24px] border border-[#efe2b0] p-2 bg-white">

        <Image
          src="/imagenes/afiche.jpeg"
          alt="Afiche"
          width={650}
          height={900}
          className="rounded-[18px]"
        />

      </div>

    </div>

  </div>

</div>

        </div>

      </section>
      {/* UBICACIÓN */}

<section className="bg-[#faf7f2] py-24">

  <div className="mx-auto max-w-7xl px-6">

    <h2
      className="text-center text-5xl text-red-900 mb-5"
      style={{ fontFamily: "var(--font-title)" }}
    >
      ¿Cómo llegar?
    </h2>

    <p className="text-center text-gray-600 text-xl mb-14">
      Les esperamos en Iglesia Jesús Abre Caminos
    </p>

    <div className="overflow-hidden rounded-3xl shadow-2xl border border-[#d8c39b]">

      <iframe
        src="https://www.google.com/maps?q=Av.+Garibaldi+643,+Batuco,+Chile&output=embed"
        width="100%"
        height="520"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

    </div>

    <div className="mt-8 text-center">

      <p className="text-2xl text-red-900 font-semibold">
        📍 Av. Garibaldi 643, Batuco
      </p>

      <p className="mt-2 text-gray-600">
        Región Metropolitana • Chile
      </p>

      <a
        href="https://maps.google.com/?q=Av.+Garibaldi+643,+Batuco,+Chile"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 rounded-full bg-red-700 px-8 py-4 text-white font-semibold hover:bg-red-800 transition"
      >
        Abrir en Google Maps
      </a>

    </div>

  </div>

</section>
{/* MAPA */}
<section>
  ...
</section>

{/* BARRA FLOTANTE */}

<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">

  <div
  className="
    rounded-2xl
    bg-white/5
    backdrop-blur-2xl
    border border-white/20
    shadow-[0_10px_40px_rgba(0,0,0,.18)]
    p-3
  "
>

    <div className="grid grid-cols-3 gap-3">

      <a
        href="/inscripcion"
        className="rounded-xl bg-red-700/90 py-4 text-center text-white font-semibold transition hover:bg-red-800"
      >
        📅 Reservar cupo
      </a>

      <a
        href="/voluntarios"
        className="rounded-xl bg-[#B8860B]/90 py-4 text-center text-white font-semibold transition hover:bg-[#9b6d00]"
      >
        ❤️ Quiero servir
      </a>

      <a
        href="/donaciones"
        className="rounded-xl bg-green-700/90 py-4 text-center text-white font-semibold transition hover:bg-green-800"
      >
        💚 Donar
      </a>

    </div>

  </div>

</div>

</main>
  );
}