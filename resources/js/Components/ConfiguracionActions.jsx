import Dropdown from "@/Components/Dropdown";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
export default function ConfiguracionAction({ configuracion }) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
          >
            <SettingsIcon></SettingsIcon>
          </button>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Link href={route("configuracion.edit", configuracion.id)}> <CreateIcon></CreateIcon> Editar</Dropdown.Link>
        {  <Dropdown.Link href={route("configuracion.destroy", configuracion )} method="delete" as="button">  <DeleteIcon  color="action"></DeleteIcon> Eliminar </Dropdown.Link>}
      </Dropdown.Content>
    </Dropdown>
  );
}
