import NavbarDashboard from "../components/navbarDashboard";

export default function Documentos() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDashboard />
      <div className="p-4">

        <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0 mb-6">
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Consulta Rápida</h2>
            <p className="text-sm">
              Veja os documentos oficiais: atas, prestações de contas e contratos.
            </p>
          </div>
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Transparência e Gestão</h2>
            <p className="text-sm">
              Acompanhe dados sobre recursos e decisões administrativas.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}