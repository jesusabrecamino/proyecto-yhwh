"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

export default function Admin() {
  
const [inscripciones, setInscripciones] = useState<any[]>([]);
const [usuario, setUsuario] = useState("");
const [password, setPassword] = useState("");
const [logueado, setLogueado] = useState(false); 
const [busqueda, setBusqueda] = useState(""); 
const totalInscripciones = inscripciones.length;

const hoy = new Date().toLocaleDateString("es-CL");

const inscripcionesHoy = inscripciones.filter(
  (p) =>
    new Date(p.created_at).toLocaleDateString("es-CL") === hoy
).length;

const ultimaInscripcion =
  inscripciones.length > 0 ? inscripciones[0] : null;

  async function cargarInscripciones() {
    const { data, error } = await supabase
      .from("inscripciones")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInscripciones(data);
    }
  }
async function eliminarInscripcion(id: number) {
  const resultado = await Swal.fire({
    title: "¿Eliminar inscripción?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!resultado.isConfirmed) return;

  const { error } = await supabase
    .from("inscripciones")
    .delete()
    .eq("id", id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la inscripción.",
    });
  } else {
    await cargarInscripciones();

    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "La inscripción fue eliminada correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
function exportarExcel() {
  const datos = inscripciones.map((persona) => ({
    Nombre: persona.nombre,
    Teléfono: persona["teléfono"],
    Correo: persona.correo,
    Fecha: new Date(persona.created_at).toLocaleString("es-CL"),
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, "Inscripciones");

  XLSX.writeFile(libro, "Inscripciones.xlsx");
}
function exportarPDF() {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Inscripciones", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Nombre", "Teléfono", "Correo", "Fecha"]],
    body: inscripciones.map((persona) => [
      persona.nombre,
      persona["teléfono"],
      persona.correo,
      new Date(persona.created_at).toLocaleString("es-CL"),
    ]),
  });

  doc.save("Inscripciones.pdf");
}
function iniciarSesion() {
  if (
  usuario === "admin" &&
  password === "Jesus2026"
) {
  localStorage.setItem("adminLogueado", "true");
  setLogueado(true);
}
  else {
    alert("Usuario o contraseña incorrectos");
  }
}

useEffect(() => {
  cargarInscripciones();

  const sesion = localStorage.getItem("adminLogueado");

  if (sesion === "true") {
    setLogueado(true);
  }
}, []);
if (!logueado) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
          Acceso Administrador
        </h1>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={iniciarSesion}
          className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800"
        >
          Ingresar
        </button>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold text-red-700">
    Panel de Inscripciones
  </h1>

  <div className="flex gap-3">
  <button
    onClick={exportarExcel}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    📄 Exportar Excel
  </button>
<button
  onClick={exportarPDF}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
  📑 Exportar PDF
</button>
  <button
    onClick={() => {
      localStorage.removeItem("adminLogueado");
      setLogueado(false);
    }}
    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
  >
    Cerrar sesión
  </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-white rounded-lg shadow p-5">
    <p className="text-gray-500">👥 Total inscritos</p>
    <h2 className="text-3xl font-bold text-red-700">
      {totalInscripciones}
    </h2>
  </div>

  <div className="bg-white rounded-lg shadow p-5">
    <p className="text-gray-500">📅 Inscripciones hoy</p>
    <h2 className="text-3xl font-bold text-red-700">
      {inscripcionesHoy}
    </h2>
  </div>

  <div className="bg-white rounded-lg shadow p-5">
    <p className="text-gray-500">🕒 Última inscripción</p>

    {ultimaInscripcion ? (
      <>
        <p className="font-semibold">
          {ultimaInscripcion.nombre}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(
            ultimaInscripcion.created_at
          ).toLocaleString("es-CL")}
        </p>
      </>
    ) : (
      <p>No hay registros</p>
    )}
  </div>

</div>
<div className="mb-4">
  <input
    type="text"
    placeholder="Buscar por nombre o teléfono..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    className="w-full p-3 border rounded-lg"
  />
</div>
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-red-700 text-white">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Correo</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inscripciones
  .filter((persona) => {
    return (
      persona.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      persona["teléfono"]
        .toString()
        .includes(busqueda)
    );
  })
  .map((persona) => (
            <tr key={persona.id} className="border-b">
              <td className="p-3">{persona.nombre}</td>
              <td className="p-3">{persona["teléfono"]}</td>
              <td className="p-3">{persona.correo}</td>
              <td className="p-3">
                {new Date(persona.created_at).toLocaleString("es-CL")}
              </td>
              <td className="p-3">
  <button
    onClick={() => eliminarInscripcion(persona.id)}
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
  >
    Eliminar
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}