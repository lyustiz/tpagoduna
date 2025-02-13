import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EstadoVenta from "@/Pages/Venta/Components/EstadoVenta";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import ImageZoom from "@/Pages/Venta/Components/ImageZoom";
import UploadComprobante from "./Components/UploadComprobante";
import ConfirmButton from "./Components/ConfirmButton";
export default function Index({ ventas, imgPath }) {
  console.log(ventas, imgPath);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Ventas Juego 1
        </h2>
      }
    >
      <Head title="Venta" />

      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Tickets</TableCell>
                <TableCell align="center">Monto</TableCell>
                <TableCell align="center">Cliente</TableCell>
                <TableCell align="center">Telefono</TableCell>
                <TableCell align="center">Comprobante</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas.data.map((venta) => (
                <TableRow
                  key={venta.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{venta.id}</TableCell>
                  <TableCell align="center">{venta.mo_total_tickets}</TableCell>
                  <TableCell align="center">{venta.mo_total_venta}</TableCell>
                  <TableCell align="center">{venta.tx_nombre_cliente}</TableCell>
                  <TableCell align="center">{venta.tx_celular_cliente}</TableCell>
                  <TableCell align="center">
                     {venta.tx_comprobante != null && venta.tx_comprobante != "" ? <ImageZoom  src={imgPath + venta.tx_comprobante}
                      alt="Comprobante"
                    ></ImageZoom> :  <UploadComprobante text="Sin comprobante"></UploadComprobante> } 
                    
                  </TableCell>
                  <TableCell align="center">
                    <EstadoVenta id_estado={venta.id_estado} />
                  </TableCell>

                  <TableCell align="center">
                    <ConfirmButton venta={venta}></ConfirmButton>
                    <IconButton aria-label="delete" color="warning">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" color="error">
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </AuthenticatedLayout>
  );
}
