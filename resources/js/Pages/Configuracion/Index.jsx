import ConfiguracionItem from "@/Pages/Configuracion/Components/ConfiguracionItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ configuraciones }) {
  return (
    <AuthenticatedLayout
      header="Configuracion" title="Configuracion"
    >
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
