"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Producto = { id: string; nombre: string; precio: number; stock: number };
type Sucursal = { id: string; nombre: string };

export function FormVenta() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("/api/productos").then((r) => r.json()).then(setProductos).catch(() => {});
    fetch("/api/sucursales")
      .then((r) => r.json())
      .then((data: Sucursal[]) => {
        setSucursales(data);
        if (data.length > 0) setSucursalId(data[0].id);
      })
      .catch(() => {});
  }, []);

  const producto = productos.find((p) => p.id === productoId);
  const total = producto ? producto.precio * Number(cantidad) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (producto && Number(cantidad) > producto.stock) {
      alert("Stock insuficiente para realizar la venta");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, cantidad: Number(cantidad), sucursalId }),
      });
      if (!res.ok) throw new Error("Error");
      router.push("/ventas");
    } catch {
      alert("No se pudo registrar la venta.");
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
                {p.nombre} - Bs {p.precio.toFixed(2)} ({p.stock} uni.)
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
          <select
            value={sucursalId}
            onChange={(e) => setSucursalId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {producto && Number(cantidad) > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Precio unitario</span>
            <span className="font-medium">Bs {producto.precio.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cantidad</span>
            <span className="font-medium">{cantidad}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">Bs {total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {enviando ? "Registrando..." : "Registrar Venta"}
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
