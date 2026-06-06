"use client";

import { useState } from "react";

const productos = [
  { id: "1", nombre: "Paracetamol 500mg", stock: 120 },
  { id: "2", nombre: "Ibuprofeno 400mg", stock: 8 },
  { id: "3", nombre: "Amoxicilina 500mg", stock: 45 },
  { id: "4", nombre: "Omeprazol 20mg", stock: 3 },
  { id: "5", nombre: "Loratadina 10mg", stock: 60 },
  { id: "6", nombre: "Salbutamol Inhalador", stock: 15 },
  { id: "7", nombre: "Dexametasona 4mg", stock: 25 },
  { id: "8", nombre: "Vitamina C 1000mg", stock: 0 },
];

const sucursales = [
  { id: "s1", nombre: "Central" },
  { id: "s2", nombre: "Norte" },
  { id: "s3", nombre: "Sur" },
];

export function FormTransferencia() {
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [origenId, setOrigenId] = useState("s1");
  const [destinoId, setDestinoId] = useState("s2");

  const producto = productos.find((p) => p.id === productoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origenId === destinoId) {
      alert("La sucursal de origen y destino deben ser diferentes");
      return;
    }
    if (producto && Number(cantidad) > producto.stock) {
      alert("Stock insuficiente en la sucursal de origen");
      return;
    }
    alert("Transferencia registrada con exito (modo demo)");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            <option value="">Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id} disabled={p.stock === 0}>
                {p.nombre} ({p.stock} uni.)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            min="1"
            max={producto?.stock ?? 1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal origen</label>
          <select
            value={origenId}
            onChange={(e) => setOrigenId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal destino</label>
          <select
            value={destinoId}
            onChange={(e) => setDestinoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Realizar Transferencia
        </button>
        <button
          type="reset"
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Limpiar
        </button>
      </div>
      <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        Modo demo: los datos no se persistiran hasta que se conecte con Supabase.
      </p>
    </form>
  );
}
