import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farmabol - Gestion de Farmacia",
  description: "Sistema de gestion de inventario, ventas y sucursales",
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventario", label: "Inventario" },
  { href: "/ventas", label: "Ventas" },
  { href: "/alertas", label: "Alertas" },
  { href: "/sucursales", label: "Sucursales" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-200">
            <Link href="/dashboard" className="text-xl font-bold text-emerald-700">
              Farmabol
            </Link>
            <p className="text-sm text-gray-500 mt-1">Gestion de Farmacia</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">Farmabol v0.1.0</p>
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
