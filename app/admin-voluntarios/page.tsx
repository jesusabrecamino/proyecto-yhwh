"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export default function AdminVoluntarios() {
  const [voluntarios, setVoluntarios] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVoluntarios();
  }, []);

  async function cargarVoluntarios() {
  const { data, error } = await supabase
    .from("voluntarios")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (data) {
    setVoluntarios(data);
  }
}

  async function eliminar(id: number) {
    if (!confirm("¿Eliminar voluntario?")) return;

    await supabase
      .from("voluntarios")
      .delete()
      .eq("id", id);

    cargarVoluntarios();
  }

  function exportarExcel() {
    const ws = XLSX.utils.json_to_sheet(voluntarios);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Voluntarios");

    XLSX.writeFile(wb, "Voluntarios.xlsx");
  }

  const filtrados = voluntarios.filter((v) =>
    (v.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
    (v.telefono || "").toLowerCase().includes(busqueda.toLowerCase()) ||
    (v.correo || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8 text-red-900">
        Panel de Voluntarios
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          placeholder="Buscar..."
          className="border rounded-lg px-4 py-3 flex-1"
          value={busqueda}
          onChange={(e)=>setBusqueda(e.target.value)}
        />

        <button
          onClick={exportarExcel}
          className="bg-green-700 text-white px-6 rounded-lg"
        >
          Exportar Excel
        </button>

      </div>

      <table className="w-full bg-white rounded-xl overflow-hidden shadow">

        <thead className="bg-red-900 text-white">

          <tr>
            <th className="p-4">Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th></th>
          </tr>

        </thead>

        <tbody>

          {filtrados.map((v)=>(

            <tr key={v.id} className="border-b">

              <td className="p-4">{v.nombre}</td>
              <td>{v.telefono}</td>
              <td>{v.correo}</td>
              <td>{v.mensaje}</td>
              <td>
                {new Date(v.created_at).toLocaleString()}
              </td>

              <td>

                <button
                  onClick={()=>eliminar(v.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
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