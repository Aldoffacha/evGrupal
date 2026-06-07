"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Producto = { id: string; nombre: string; stock: number };
type Sucursal = { id: string; nombre: string };

export function FormTransferencia() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [origenId, setOrigenId] = useState("");
  const [destinoId, setDestinoId] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("/api/productos").then((r) => r.json()).then(setProductos).catch(() => {});
    fetch("/api/sucursales")
      .then((r) => r.json())
      .then((data: Sucursal[]) => {
        setSucursales(data);
        if (data.length > 0) setOrigenId(data[0].id);
        if (data.length > 1) setDestinoId(data[1].id);
      })
      .catch(() => {});
  }, []);

  const producto = productos.find((p) => p.id === productoId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (origenId === destinoId) {
      alert("La sucursal de origen y destino deben ser diferentes");
      return;
    }
    if (producto && Number(cantidad) > producto.stock) {
      alert("Stock insuficiente en la sucursal de origen");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch("/api/transferencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoId,
          productoNombre: producto?.nombre ?? "",
          cantidad: Number(cantidad),
          sucursalOrigenId: origenId,
          sucursalDestinoId: destinoId,
        }),
      });
      if (!res.ok) throw new Error("Error");
      alert("Transferencia creada (estado: pendiente)");
      router.push("/sucursales");
    } catch {
      alert("No se pudo crear la transferencia.");
      setEnviando(false);
    }
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
          disabled={enviando}
          className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {enviando ? "Procesando..." : "Realizar Transferencia"}
        </button>
        <button
          type="reset"
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
