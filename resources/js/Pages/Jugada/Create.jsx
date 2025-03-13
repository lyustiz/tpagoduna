import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Button from "@mui/material/Button";
export default function Create() {
  const { data, setData, processing, errors, post } =
    useForm({
      fe_fecha: "",
      nu_tickets: 0,
      mo_valor_ticket: 0.0,
      mo_valor_divisa: 0.0,
      nu_minutos_cierre: 0,
    });

  const create = (e) => {
    e.preventDefault();

    post(route("jugada.store"), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout header={"Crear Jugada"} title={"Crear Jugada"}>
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mx-8">
        <div className="p-2 text-gray-900 flex gap-8">
          <form onSubmit={create} className="mt-1">
            <div>
              <InputLabel htmlFor="fecha" value="Fecha" />
              <TextInput
                id="fecha"
                type="date"
                className="mt-1 mb-3 block w-full"
                value={data.fe_fecha}
                onChange={(e) => setData("fe_fecha", e.target.value)}
                required
                isFocused
                autoComplete="fecha"
              />
              <InputError className="mt-2" message={errors.fe_fecha} />
            </div>

            <div>
              <InputLabel htmlFor="nu_tickets" value="Numero de Tickets" />
              <TextInput
                id="nu_tickets"
                type="number"
                className="mt-1 mb-3 block w-full"
                value={data.nu_tickets}
                onChange={(e) => setData("nu_tickets", e.target.value)}
                required
                autoComplete="nu_tickets"
                min="1"
              />
              <InputError className="mt-2" message={errors.nu_tickets} />
            </div>

            <div>
              <InputLabel htmlFor="mo_valor_ticket" value="Valor de Tickets" />
              <TextInput
                id="mo_valor_ticket"
                type="number"
                className="mt-1 mb-3 block w-full"
                value={data.mo_valor_ticket}
                onChange={(e) => setData("mo_valor_ticket", e.target.value)}
                required
                autoComplete="mo_valor_ticket"
                min="1"
              />
              <InputError className="mt-2" message={errors.mo_valor_ticket} />
            </div>

            <div>
              <InputLabel htmlFor="mo_valor_divisa" value="Tasa Divisa" />
              <TextInput
                id="mo_valor_divisa"
                type="number"
                className="mt-1 mb-3 block w-full"
                value={data.mo_valor_divisa}
                onChange={(e) => setData("mo_valor_divisa", e.target.value)}
                required
                autoComplete="mo_valor_divisa"
                min="1"
              />
              <InputError className="mt-2" message={errors.mo_valor_divisa} />
            </div>

            <div>
              <InputLabel htmlFor="nu_minutos_cierre" value="Minutos Cierre" />
              <TextInput
                id="nu_minutos_cierre"
                type="number"
                className="mt-1 mb-3 block w-full"
                value={data.nu_minutos_cierre}
                onChange={(e) => setData("nu_minutos_cierre", e.target.value)}
                required
                autoComplete="nu_minutos_cierre"
                min="1"
              />
              <InputError className="mt-2" message={errors.nu_minutos_cierre} />
            </div>

            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
              <Button variant="outlined" color="secondary" href="/jugada">
                Volver
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
