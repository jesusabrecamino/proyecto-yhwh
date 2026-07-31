"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

export default function AdminVoluntarios() {
  const [voluntarios, setVoluntarios] = useState<any[]>([]);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const totalVoluntarios = voluntarios.length;

  const hoy = new Date().toLocaleDateString("es-CL");

  const voluntariosHoy = voluntarios.filter(
    (v) =>
      new Date(v.created_at).toLocaleDateString("es-CL") === hoy
  ).length;

  const ultimoVoluntario =
    voluntarios.length > 0 ? voluntarios[0] : null;

  async function cargarVoluntarios() {
    const { data, error } = await supabase
      .from("voluntarios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando voluntarios:", error);
      return;
    }

    if (data) {
      setVoluntarios(data);
    }
  }

  async function eliminarVoluntario(id: string) {
    const resultado = await Swal.fire({
      title: "¿Eliminar voluntario?",
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
      .from("voluntarios")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el voluntario.",
        confirmButtonColor: "#991b1b",
      });

      return;
    }

    await cargarVoluntarios();

    await Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "El voluntario fue eliminado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  function exportarExcel() {
    const datos = voluntarios.map((persona) => ({
      Nombre: persona.nombre,
      Teléfono: persona.telefono,
      Correo: persona.correo,
      Mensaje: persona.mensaje || "",
      Fecha: new Date(persona.created_at).toLocaleString("es-CL"),
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      libro,
      hoja,
      "Voluntarios"
    );

    XLSX.writeFile(libro, "Voluntarios.xlsx");
  }

  function exportarPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    doc.setFontSize(18);
    doc.text("Voluntarios", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [[
        "Nombre",
        "Teléfono",
        "Correo",
        "Mensaje",
        "Fecha",
      ]],

      body: voluntarios.map((persona) => [
        persona.nombre,
        persona.telefono,
        persona.correo,
        persona.mensaje || "",
        new Date(persona.created_at).toLocaleString("es-CL"),
      ]),
    });

    doc.save("Voluntarios.pdf");
  }

  function iniciarSesion() {
    if (
      usuario === "admin" &&
      password === "Jesus2026"
    ) {
      localStorage.setItem(
        "adminVoluntariosLogueado",
        "true"
      );

      setLogueado(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Usuario o contraseña incorrectos.",
        confirmButtonColor: "#991b1b",
      });
    }
  }

  function cerrarSesion() {
    localStorage.removeItem(
      "adminVoluntariosLogueado"
    );

    setLogueado(false);
  }

  useEffect(() => {
    cargarVoluntarios();

    const sesion = localStorage.getItem(
      "adminVoluntariosLogueado"
    );

    if (sesion === "true") {
      setLogueado(true);
    }
  }, []);

  const filtrados = voluntarios.filter((v) => {
    const texto = busqueda.toLowerCase();

    return (
      (v.nombre || "")
        .toLowerCase()
        .includes(texto) ||

      (v.telefono || "")
        .toString()
        .toLowerCase()
        .includes(texto) ||

      (v.correo || "")
        .toLowerCase()
        .includes(texto)
    );
  });

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
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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

      {/* ENCABEZADO */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-red-700">
          Panel de Voluntarios
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
            onClick={cerrarSesion}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Cerrar sesión
          </button>

        </div>

      </div>

      {/* ESTADÍSTICAS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-lg shadow p-5">

          <p className="text-gray-500">
            👥 Total voluntarios
          </p>

          <h2 className="text-3xl font-bold text-red-700">
            {totalVoluntarios}
          </h2>

        </div>

        <div className="bg-white rounded-lg shadow p-5">

          <p className="text-gray-500">
            📅 Voluntarios hoy
          </p>

          <h2 className="text-3xl font-bold text-red-700">
            {voluntariosHoy}
          </h2>

        </div>

        <div className="bg-white rounded-lg shadow p-5">

          <p className="text-gray-500">
            🕒 Último voluntario
          </p>

          {ultimoVoluntario ? (
            <>
              <p className="font-semibold">
                {ultimoVoluntario.nombre}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  ultimoVoluntario.created_at
                ).toLocaleString("es-CL")}
              </p>
            </>
          ) : (
            <p>No hay registros</p>
          )}

        </div>

      </div>

      {/* BUSCADOR */}

      <div className="mb-4">

        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o correo..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />

      </div>

      {/* TABLA */}

      <div className="overflow-x-auto">

        <table className="w-full bg-white shadow rounded-lg">

          <thead className="bg-red-700 text-white">

            <tr>

              <th className="p-3">
                Nombre
              </th>

              <th className="p-3">
                Teléfono
              </th>

              <th className="p-3">
                Correo
              </th>

              <th className="p-3">
                Mensaje
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

            {filtrados.map((persona) => (

              <tr
                key={persona.id}
                className="border-b"
              >

                <td className="p-3">
                  {persona.nombre}
                </td>

                <td className="p-3">
                  {persona.telefono}
                </td>

                <td className="p-3">
                  {persona.correo}
                </td>

                <td className="p-3">
                  {persona.mensaje || "-"}
                </td>

                <td className="p-3">
                  {new Date(
                    persona.created_at
                  ).toLocaleString("es-CL")}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      eliminarVoluntario(persona.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}