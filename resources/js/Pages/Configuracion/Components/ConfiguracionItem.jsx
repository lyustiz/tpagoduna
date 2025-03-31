import {Link} from "@inertiajs/react";
import ConfiguracionAction from "./ConfiguracionActions";

export default function ConfiguracionItem({ configuracion }) {

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="p-6 text-gray-900 flex gap-8">
        <div className="flex">


          <div className="flex-1">
            <h2 className="text-2xl mb-2">
              <Link href={route('configuracion.show', configuracion)}>
              {configuracion.referencia}
              </Link>
              
            </h2>
            <p>
                {configuracion.descripcion}
            </p>
            <p className="text-2xl">
               <b>{configuracion.valor}</b> 
            </p>
           
          </div>

          <div>
           <ConfiguracionAction configuracion={configuracion} />
          </div>
        </div>
      </div>
    </div>
  );
}
