import ConfiguracionItem from "@/Pages/Configuracion/Components/ConfiguracionItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ configuraciones }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-none text-gray-800">
          Configuracion
        </h2>
      }
    >
      <Head title="Configuracion -"   />

      <div className="mb-8">
        <PrimaryButton>
          <Link href={route("configuracion.create")}>Nuevo</Link>
        </PrimaryButton>
      </div>

      {configuraciones.data.map((configuracion) => (
        <ConfiguracionItem
          configuracion={configuracion}
          key={configuracion.id}
        />
      ))}
    </AuthenticatedLayout>
  );
}
