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

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

  const totalParejas = inscripciones.length;

  const totalPersonas = inscripciones.reduce((total, inscripcion) => {
    let cantidad = 0;

    if (inscripcion.nombre) cantidad++;
    if (inscripcion.nombre_pareja) cantidad++;

    return total + cantidad;
  }, 0);

  const hoy = new Date().toLocaleDateString("es-CL");

  const inscripcionesHoy = inscripciones.filter(
    (p) =>
      new Date(p.created_at).toLocaleDateString("es-CL") === hoy
  ).length;

  const ultimaInscripcion =
    inscripciones.length > 0 ? inscripciones[0] : null;

  // ==========================================
  // CARGAR INSCRIPCIONES
  // ==========================================

  async function cargarInscripciones() {
    const { data, error } = await supabase
      .from("inscripciones")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInscripciones(data);
    }

    if (error) {
      console.error("Error cargando inscripciones:", error);
    }
  }

  // ==========================================
  // ELIMINAR INSCRIPCIÓN
  // ==========================================

  async function eliminarInscripcion(id: number) {
    const resultado = await Swal.fire({
      title: "¿Eliminar esta pareja?",
      text: "Se eliminará la inscripción completa de la pareja. Esta acción no se puede deshacer.",
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
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la inscripción.",
      });

      return;
    }

    await cargarInscripciones();

    await Swal.fire({
      icon: "success",
      title: "Eliminada",
      text: "La inscripción de la pareja fue eliminada correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  // ==========================================
  // EXPORTAR EXCEL
  // ==========================================

  function exportarExcel() {
    const datos = inscripciones.map((pareja) => ({
      Código: pareja.codigo || "",
      "Persona 1": pareja.nombre || "",
      "Teléfono Persona 1": pareja["teléfono"] || "",
      "Correo Persona 1": pareja.correo || "",
      "Persona 2": pareja.nombre_pareja || "",
      "Teléfono Persona 2": pareja.telefono_pareja || "",
      "Correo Persona 2": pareja.correo_pareja || "",
      Observaciones: pareja.observaciones || "",
      Fecha: new Date(pareja.created_at).toLocaleString("es-CL"),
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);

    hoja["!cols"] = [
      { wch: 16 },
      { wch: 25 },
      { wch: 20 },
      { wch: 30 },
      { wch: 25 },
      { wch: 20 },
      { wch: 30 },
      { wch: 40 },
      { wch: 22 },
    ];

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      libro,
      hoja,
      "Parejas inscritas"
    );

    XLSX.writeFile(
      libro,
      "Parejas_Encuentro_Matrimonios.xlsx"
    );
  }

  // ==========================================
  // EXPORTAR PDF
  // ==========================================

  function exportarPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    doc.setFontSize(18);
    doc.text(
      "Encuentro de Matrimonios y Parejas",
      14,
      15
    );

    doc.setFontSize(12);
    doc.text(
      `Parejas inscritas: ${totalParejas} | Personas confirmadas: ${totalPersonas}`,
      14,
      23
    );

    autoTable(doc, {
      startY: 30,

      head: [[
        "Código",
        "Persona 1",
        "Teléfono",
        "Persona 2",
        "Teléfono",
        "Observaciones",
        "Fecha",
      ]],

      body: inscripciones.map((pareja) => [
        pareja.codigo || "-",
        pareja.nombre || "-",
        pareja["teléfono"] || "-",
        pareja.nombre_pareja || "-",
        pareja.telefono_pareja || "-",
        pareja.observaciones || "-",
        new Date(
          pareja.created_at
        ).toLocaleString("es-CL"),
      ]),

      styles: {
        fontSize: 8,
        cellPadding: 2,
      },

      headStyles: {
        fillColor: [185, 28, 28],
      },
    });

    doc.save(
      "Parejas_Encuentro_Matrimonios.pdf"
    );
  }

  // ==========================================
  // LOGIN
  // ==========================================

  async function iniciarSesion() {
    if (
      usuario === "admin" &&
      password === "Jesus2026"
    ) {
      localStorage.setItem(
        "adminLogueado",
        "true"
      );

      setLogueado(true);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Usuario o contraseña incorrectos.",
        confirmButtonColor: "#b91c1c",
      });
    }
  }

  // ==========================================
  // CARGA INICIAL
  // ==========================================

  useEffect(() => {
    cargarInscripciones();

    const sesion =
      localStorage.getItem("adminLogueado");

    if (sesion === "true") {
      setLogueado(true);
    }
  }, []);

  // ==========================================
  // BUSCADOR
  // ==========================================

  const filtradas = inscripciones.filter((pareja) => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) return true;

    return (
      (pareja.codigo || "")
        .toLowerCase()
        .includes(texto) ||

      (pareja.nombre || "")
        .toLowerCase()
        .includes(texto) ||

      String(pareja["teléfono"] || "")
        .toLowerCase()
        .includes(texto) ||

      (pareja.correo || "")
        .toLowerCase()
        .includes(texto) ||

      (pareja.nombre_pareja || "")
        .toLowerCase()
        .includes(texto) ||

      String(pareja.telefono_pareja || "")
        .toLowerCase()
        .includes(texto) ||

      (pareja.correo_pareja || "")
        .toLowerCase()
        .includes(texto)
    );
  });

  // ==========================================
  // PANTALLA LOGIN
  // ==========================================

  if (!logueado) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">

          <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
            Acceso Administrador
          </h1>

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            className="w-full border p-3 rounded mb-4 text-gray-900 placeholder:text-gray-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                iniciarSesion();
              }
            }}
            className="w-full border p-3 rounded mb-4 text-gray-900 placeholder:text-gray-500"
          />

          <button
            onClick={iniciarSesion}
            className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition"
          >
            Ingresar
          </button>

        </div>

      </main>
    );
  }

  // ==========================================
  // PANEL ADMINISTRADOR
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">

      {/* ENCABEZADO */}

      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-5 mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-700">
            Panel de Inscripciones
          </h1>

          <p className="text-gray-500 mt-2">
            Encuentro de Matrimonios y Parejas
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

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
              localStorage.removeItem(
                "adminLogueado"
              );

              setLogueado(false);
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Cerrar sesión
          </button>

        </div>

      </div>

      {/* ESTADÍSTICAS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500">
            💑 Parejas inscritas
          </p>

          <h2 className="text-3xl font-bold text-red-700 mt-1">
            {totalParejas}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500">
            👥 Personas confirmadas
          </p>

          <h2 className="text-3xl font-bold text-red-700 mt-1">
            {totalPersonas}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-gray-500">
            📅 Parejas inscritas hoy
          </p>

          <h2 className="text-3xl font-bold text-red-700 mt-1">
            {inscripcionesHoy}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-5">

          <p className="text-gray-500">
            🕒 Última inscripción
          </p>

          {ultimaInscripcion ? (
            <>
              <p className="font-semibold mt-1">
                {ultimaInscripcion.nombre}

                {ultimaInscripcion.nombre_pareja
                  ? ` + ${ultimaInscripcion.nombre_pareja}`
                  : ""}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(
                  ultimaInscripcion.created_at
                ).toLocaleString("es-CL")}
              </p>
            </>
          ) : (
            <p className="mt-1">
              No hay registros
            </p>
          )}

        </div>

      </div>

      {/* BUSCADOR */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Buscar por código, nombre, teléfono o correo..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
          className="w-full p-3 border rounded-lg bg-white text-gray-900 placeholder:text-gray-500"
        />

      </div>

      {/* TABLA ESCRITORIO */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full min-w-[1400px]">

          <thead className="bg-red-700 text-white">

            <tr>
              <th className="p-3">
                Código
              </th>

              <th className="p-3">
                Persona 1
              </th>

              <th className="p-3">
                Contacto 1
              </th>

              <th className="p-3">
                Persona 2
              </th>

              <th className="p-3">
                Contacto 2
              </th>

              <th className="p-3">
                Observaciones
              </th>

              <th className="p-3">
                Fecha
              </th>

              <th className="p-3">
                Acciones
              </th>
            </tr>

          </thead>

          <tbody>

            {filtradas.map((pareja) => (

              <tr
                key={pareja.id}
                className="border-b align-top"
              >

                <td className="p-3 font-semibold text-red-700 whitespace-nowrap">
                  {pareja.codigo || "-"}
                </td>

                <td className="p-3 font-semibold">
                  {pareja.nombre || "-"}
                </td>

                <td className="p-3">
                  <div>
                    {pareja["teléfono"] || "-"}
                  </div>

                  <div className="text-sm text-gray-500">
                    {pareja.correo || "-"}
                  </div>
                </td>

                <td className="p-3 font-semibold">
                  {pareja.nombre_pareja || "-"}
                </td>

                <td className="p-3">
                  <div>
                    {pareja.telefono_pareja || "-"}
                  </div>

                  <div className="text-sm text-gray-500">
                    {pareja.correo_pareja || "-"}
                  </div>
                </td>

                <td className="p-3 max-w-xs">
                  {pareja.observaciones || "-"}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {new Date(
                    pareja.created_at
                  ).toLocaleString("es-CL")}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      eliminarInscripcion(
                        pareja.id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* TARJETAS MÓVIL */}

      <div className="lg:hidden space-y-4">

        {filtradas.map((pareja) => (

          <div
            key={pareja.id}
            className="bg-white rounded-xl shadow p-5"
          >

            <div className="flex justify-between items-start gap-3 mb-4">

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Código
                </p>

                <p className="font-bold text-red-700">
                  {pareja.codigo || "-"}
                </p>
              </div>

              <button
                onClick={() =>
                  eliminarInscripcion(
                    pareja.id
                  )
                }
                className="bg-red-600 text-white px-3 py-2 rounded text-sm"
              >
                Eliminar
              </button>

            </div>

            <div className="border-t pt-4">

              <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                Persona 1
              </p>

              <p className="font-semibold">
                {pareja.nombre || "-"}
              </p>

              <p className="text-sm text-gray-600">
                📞 {pareja["teléfono"] || "-"}
              </p>

              <p className="text-sm text-gray-600 break-all">
                ✉️ {pareja.correo || "-"}
              </p>

            </div>

            <div className="border-t mt-4 pt-4">

              <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                Persona 2
              </p>

              <p className="font-semibold">
                {pareja.nombre_pareja || "-"}
              </p>

              <p className="text-sm text-gray-600">
                📞 {pareja.telefono_pareja || "-"}
              </p>

              <p className="text-sm text-gray-600 break-all">
                ✉️ {pareja.correo_pareja || "-"}
              </p>

            </div>

            {pareja.observaciones && (
              <div className="border-t mt-4 pt-4">

                <p className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Observaciones
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {pareja.observaciones}
                </p>

              </div>
            )}

            <div className="border-t mt-4 pt-4">

              <p className="text-xs text-gray-400">
                Inscripción
              </p>

              <p className="text-sm text-gray-600">
                {new Date(
                  pareja.created_at
                ).toLocaleString("es-CL")}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* SIN RESULTADOS */}

      {filtradas.length === 0 && (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 mt-4">
          No se encontraron inscripciones.
        </div>
      )}

    </main>
  );
}