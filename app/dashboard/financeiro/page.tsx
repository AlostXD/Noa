import NavbarDashboard from "../components/navbarDashboard";

export default function Financeiro() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDashboard />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">Minhas Faturas</h1>
        <p className="text-sm text-gray-600 mb-4">
          Você pode escolher outros produtos para ver as faturas
        </p>

        <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-4 mb-6">
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Aluguel</h2>
            <p className="text-sm">Você paga por morar em um imóvel via Locar</p>
          </div>
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Condomínio</h2>
            <p className="text-sm">O valor do seu condomínio</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <ul className="space-y-4">
            <li className="flex justify-end items-center border-b pb-2">
              <div className="w-16 h-6 bg-white rounded" />
            </li>
            <li className="flex justify-end items-center border-b pb-2">
              <div className="w-16 h-6 bg-white rounded" />
            </li>
            <li className="flex justify-end items-center">
              <div className="w-16 h-6 bg-white rounded" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}