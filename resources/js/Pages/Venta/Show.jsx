import ConfiguracionItem from "@/Pages/Configuracion/Components/ConfiguracionItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Show({ configuracion }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Configuracion <b>{configuracion.referencia}</b>
        </h2>
      }
    >
      <Head title={"Configuracion " + configuracion.referencia} />

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 flex gap-8">
          <div className="flex">
            <div className="flex flex-col items-center p-3">
              <button>
                <CreateIcon />
              </button>
              <button>
                <DeleteIcon />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl mb-2">{configuracion.referencia}</h2>
              <p>{configuracion.descripcion}</p>

 
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
