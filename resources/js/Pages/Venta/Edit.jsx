import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({configuracion}) {

   const {data, 
       setData,
       processing,
       errors,
       patch,
       recentlySuccessful,
  } = useForm({
    'referencia': configuracion.referencia,
    'descripcion': configuracion.descripcion,
    'valor': configuracion.valor
   })

  const create = (e) => {
    e.preventDefault();

    patch(route('configuracion.update', configuracion.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      title={"Editar Configuracion " +  configuracion.referencia}
      header={"Editar Configuracion " +  configuracion.referencia}
    >
      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 flex gap-8">
          
          <form onSubmit={create} className="mt-6">
            <div>
              <InputLabel htmlFor="referencia" value="Referencia" />

              <TextInput
                id="referencia"
                className="mt-1 mb-3 block w-full"
                value={data.referencia}
                onChange={(e) => setData("referencia", e.target.value)}
                required
                isFocused
                autoComplete="referencia"
              />

              <InputError className="mt-2" message={errors.referencia} />
            </div>

            <div>
              <InputLabel htmlFor="descripcion" value="Descripcion" />

              <TextInput
                id="descripcion"
                className="mt-1 mb-3 block w-full"
                value={data.descripcion}
                onChange={(e) => setData("descripcion", e.target.value)}
                autoComplete="descripcion"
              />

              <InputError className="mt-2" message={errors.descripcion} />
            </div>

            <div>
              <InputLabel htmlFor="valor" value="Valor" />

              <TextInput
                id="valor"
                type="number"
                className="mt-1 mb-3 block w-full"
                value={data.valor}
                onChange={(e) => setData("valor", e.target.value)}
                required
                autoComplete="valor"
              />

              <InputError className="mt-2" message={errors.valor} />
            </div>

            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-gray-600">Saved.</p>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
