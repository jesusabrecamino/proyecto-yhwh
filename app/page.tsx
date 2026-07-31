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
  document.title = "JS FUNCIONANDO";
  
  const targetDate = new Date("2026-08-15T18:00:00-04:00");

  function actualizarContador() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  }

  // Calcular inmediatamente al abrir la página
  actualizarContador();

  // Actualizar cada segundo
  const interval = setInterval(actualizarContador, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen py-16">

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
  <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 sm:px-8 py-3 backdrop-blur-md">
    <span
      className="text-sm sm:text-lg md:text-2xl font-semibold uppercase tracking-[4px] sm:tracking-[6px] md:tracking-[8px] text-white"
      style={{
        textShadow: "0 2px 15px rgba(0,0,0,.8)",
      }}
    >
      Iglesia Jesús Abre Caminos
    </span>
  </span>
</div>

            <h1
  className="text-[3rem] sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-[0.95] font-bold text-[#D4AF37]"
  style={{
    fontFamily: "var(--font-title)",
    textShadow: "0 3px 12px rgba(0,0,0,.45)",
  }}
>
  Encuentro de
  <br />
  Matrimonios
  <br className="md:hidden" />
  <span className="md:hidden"> y Parejas</span>
  <span className="hidden md:inline"> y Parejas</span>
</h1>

            <div className="mt-8 max-w-2xl mx-auto">


  <p
    className="text-lg sm:text-xl md:text-3xl italic leading-relaxed text-white"
    style={{ fontFamily: "var(--font-title)" }}
  >
    "Las muchas aguas no podrán apagar el amor,
    <br />
    ni lo ahogarán los ríos."
  </p>

  <p
  className="mt-4 md:mt-5 text-white text-lg md:text-2xl tracking-wide"
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
            <div className="mt-10 md:mt-16">

  <p className="uppercase tracking-[4px] md:tracking-[8px] text-[#D4AF37] text-xs md:text-sm font-semibold mb-4 md:mb-8">
    Faltan para nuestro encuentro
  </p>

  <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-3xl mx-auto">

    {/* DÍAS */}
    <div className="rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-3 md:py-6 shadow-xl">
      <div className="text-2xl md:text-5xl font-bold text-[#D4AF37]">
        {timeLeft.days}
      </div>
      <div className="mt-1 md:mt-2 text-white uppercase tracking-normal md:tracking-[3px] text-[9px] md:text-sm">
        Días
      </div>
    </div>

    {/* HORAS */}
    <div className="rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-3 md:py-6 shadow-xl">
      <div className="text-2xl md:text-5xl font-bold text-[#D4AF37]">
        {timeLeft.hours}
      </div>
      <div className="mt-1 md:mt-2 text-white uppercase tracking-normal md:tracking-[3px] text-[9px] md:text-sm">
        Horas
      </div>
    </div>

    {/* MINUTOS */}
    <div className="rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-3 md:py-6 shadow-xl">
      <div className="text-2xl md:text-5xl font-bold text-[#D4AF37]">
        {timeLeft.minutes}
      </div>
      <div className="mt-1 md:mt-2 text-white uppercase tracking-normal md:tracking-[3px] text-[9px] md:text-sm">
        Minutos
      </div>
    </div>

    {/* SEGUNDOS */}
    <div className="rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 py-3 md:py-6 shadow-xl">
      <div className="text-2xl md:text-5xl font-bold text-[#D4AF37]">
        {timeLeft.seconds}
      </div>
      <div className="mt-1 md:mt-2 text-white uppercase tracking-normal md:tracking-[3px] text-[9px] md:text-sm">
        Segundos
      </div>
    </div>

  </div>

</div>

          </div>

        </div>

      </section>

{/* BIENVENIDA */}

<section className="bg-gradient-to-b from-white to-[#f8f4ee] py-14 md:py-24">

  <div className="mx-auto w-full max-w-[1700px] px-5 sm:px-6 md:px-10">

    <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1.25fr_1fr]">

      {/* FOTO */}
      <div className="flex items-center justify-center lg:justify-end lg:pr-6">

        <div className="relative w-full max-w-[700px]">

          <Image
            src="/imagenes/pastores.png"
            alt="Pastores"
            width={900}
            height={900}
            className="h-auto w-full object-contain"
          />

        </div>

      </div>

      {/* TEXTO */}
      <div className="w-full min-w-0 max-w-2xl">

        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[3px] text-red-700 sm:text-sm sm:tracking-[4px] lg:text-left lg:tracking-[6px]">
          Una invitación para ustedes
        </p>

        <h2
          className="mb-6 text-center text-4xl leading-tight text-red-900 sm:text-5xl lg:mb-8 lg:text-left lg:text-6xl xl:text-7xl"
          style={{ fontFamily: "var(--font-title)" }}
        >
          <span className="mb-3 block text-3xl sm:text-4xl lg:mb-4 lg:text-5xl">
            Pastores
          </span>

          <span className="block break-words">
            Nicolás Quintanilla
          </span>

          <span className="my-1 block text-3xl sm:text-4xl lg:my-2 lg:text-5xl">
            &
          </span>

          <span className="block break-words">
            Jennifer Carrasco
          </span>
        </h2>

        <div className="mx-auto mb-7 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] lg:mx-0 lg:mb-10 lg:w-56"></div>

        <p className="text-base leading-7 text-gray-700 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
          Como matrimonio pastoral queremos extenderles una invitación muy especial.
          Hemos preparado este encuentro con oración, cariño y el deseo de que cada
          pareja viva un tiempo de renovación, comunión y crecimiento junto al Señor.
        </p>

        <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8 lg:mt-6 lg:text-xl lg:leading-9">
          Será una oportunidad para compartir, aprender, fortalecer el matrimonio y
          recordar que cuando Cristo está en el centro del hogar, el amor siempre
          encuentra un nuevo comienzo.
        </p>

        <p
          className="mt-7 text-center text-xl text-red-800 sm:text-2xl lg:mt-8 lg:text-left"
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

<div className="fixed bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl">

  <div
    className="
      rounded-2xl
      bg-white/80
      md:bg-white/5
      backdrop-blur-xl
      md:backdrop-blur-2xl
      border border-white/30
      shadow-[0_10px_40px_rgba(0,0,0,.18)]
      p-2
      md:p-3
    "
  >

    <div className="grid grid-cols-3 gap-2 md:gap-3">

      <a
        href="/inscripcion"
        className="flex items-center justify-center rounded-xl bg-red-700 py-3.5 px-2 text-center text-sm sm:text-base md:py-4 md:text-base text-white font-semibold transition hover:bg-red-800"
      >
        📅 <span className="ml-1">Reservar</span>
        <span className="hidden md:inline">&nbsp;cupo</span>
      </a>

      <a
        href="/voluntarios"
        className="flex items-center justify-center rounded-xl bg-[#B8860B] py-3.5 px-2 text-center text-sm sm:text-base md:py-4 md:text-base text-white font-semibold transition hover:bg-[#9b6d00]"
      >
        ❤️ <span className="ml-1">Servir</span>
        <span className="hidden md:inline">&nbsp;como voluntario</span>
      </a>

      <a
        href="/donaciones"
        className="flex items-center justify-center rounded-xl bg-green-700 py-3.5 px-2 text-center text-sm sm:text-base md:py-4 md:text-base text-white font-semibold transition hover:bg-green-800"
      >
        💚 <span className="ml-1">Donar</span>
      </a>

    </div>

  </div>

</div>

</main>
  );
}