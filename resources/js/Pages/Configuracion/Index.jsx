import ConfiguracionItem from "@/Components/ConfiguracionItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ configuraciones }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Configuracion" />

      
          {configuraciones.data.map((configuracion) => (
            <ConfiguracionItem configuracion={configuracion} key={configuracion.id} />
          ))}
       
    </AuthenticatedLayout>
  );
}
