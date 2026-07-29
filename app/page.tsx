import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-900 to-red-700 text-white flex flex-col items-center justify-center p-8">
<Image
  src="/imagenes/logo.png"
  alt="Logo"
  width={180}
  height={180}
  className="mb-8"
/>
      <h1 className="text-5xl font-bold text-center">
        Encuentro de Matrimonios y Parejas
      </h1>

      <p className="mt-6 text-2xl">
        ❤️ Evento totalmente gratuito
      </p>

      <p className="mt-2 text-xl">
        Sábado 15 de Agosto - 18:00 hrs
      </p>

      <p className="mt-2 text-lg">
        Garibaldi 643, Batuco - Lampa
      </p>

<a
  href="/inscripcion"
  className="mt-10 bg-white text-red-700 px-8 py-4 rounded-full text-xl font-bold hover:bg-red-100 transition inline-block"
>
  Reservar mi cupo
</a>

<Image
  src="/imagenes/afiche.jpeg"
  alt="Afiche del evento"
  width={700}
  height={1000}
  className="mt-12 rounded-xl shadow-2xl"
/>
    </main>
  );
}