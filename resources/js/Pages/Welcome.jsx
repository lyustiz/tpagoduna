import { Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import logo from "../../../public/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceIcon from "@mui/icons-material/Place";
import InfoPago from "./Compra/Components/InfoPago";
import ConstactanosFlotante from "@/Components/ContactanosFlotante";

/** Imagenes  */
import imgPagomovil from "../../../public/images/pagomovil.png";
import imgComo from "../../../public/images/como.png";
import imgGanar from "../../../public/images/ganar.png";
import imgMonto from "../../../public/images/monto.png";
import imgGanarHasta from "../../../public/images/ganahasta.png";
import imgTePago from "../../../public/images/tepago.png";

export default function Welcome({ auth }) {
  return (
    <>
      <div className="min-h-screen bg-[#fbd101]">
        {/* Navbar Fixed */}
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-12 w-auto lg:h-16"
                src={logo}
                height={50}
                width={50}
              />
            </div>
            <div className="hidden md:flex space-x-6 text-lg" >
            <Link
                href={route("compra.index")}
                className=" text-gray-700 hover:text-[#e62a3c]"
              >
                Comprar
              </Link>
              <a href="#premios" className="text-gray-700 hover:text-[#e62a3c]">
                Premios
              </a>
              <a
                href="#contacto"
                className="text-gray-700 hover:text-[#e62a3c]"
              >
                Contacto
              </a>
              <Link
                href={route("login")}
                className="text-gray-700 hover:text-[#e62a3c]"
              >
                Ingresar
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-24 pb-12">
          {/* Contacto flotante */}
          <ConstactanosFlotante></ConstactanosFlotante>
         
         
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div id="topComprar" className="flex justify-center">
              <img
                src={imgGanarHasta}
                alt="ganar hasta"
                style={{ height: "130px" }}
              />
            </div>

            <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
              <img
                src={imgMonto}
                alt="Imagen Izquierda"
                style={{ height: "120px" }}
              />
              <Link
                href={route("compra.index")}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
              >
                <button
                  id="comprar"
                  className="bg-[#e62a3c] text-white px-8 py-3 rounded-full 
        hover:bg-red-800 transition duration-300 text-lg font-extrabold"
                >
                  COMPRAR
                </button>
              </Link>
              <img
                src={imgMonto}
                alt="Imagen Derecha"
                style={{ height: "120px" }}
              />
            </div>
            <div className="flex justify-center mt-8">
              <iframe
                className="rounded-2xl"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Zfv6Wmf8R84"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </section>

          {/* Carousel de Premios */}
          <section className="mb-16" id="premios">
            <div className="flex justify-center">
              <img src={imgTePago} alt="te pago" style={{ height: "130px" }} />
            </div>

            <div className="flex flex-wrap bg-white justify-center gap-4 p-4 md:p-8 rounded-xl shadow-lg">
              <p className="text-xl mb-4 w-full text-center">
                Con solo 2$ puedes ganar hasta 700$ en premios en 18 sorteos
                diarios:
              </p>
              <Card className="p-2 md:text-md xs:text-sm" elevation={8} sx={{ borderRadius: 4 }}>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Horario
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Sorteo
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Premio
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Total <span className="hidden sm:inline">1:00pm</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={7} className="text-center font-extrabold">
                        1:00pm
                      </td>
                      <td></td>
                      <td></td>
                      <td rowSpan={7} className="text-center font-extrabold">
                        450$
                      </td>
                    </tr>
                    <tr>
                      <td>Táchira 'A'</td>
                      <td className="text-center">$200</td>
                    </tr>
                    <tr>
                      <td>Táchira 'B'</td>
                      <td className="text-center">$100</td>
                    </tr>
                    <tr>
                      <td>Chance 'A'</td>
                      <td className="text-center">$50</td>
                    </tr>
                    <tr>
                      <td>Chance 'B'</td>
                      <td className="text-center">$50</td>
                    </tr>
                    <tr>
                      <td>Zulia 'A'</td>
                      <td className="text-center">$25</td>
                    </tr>
                    <tr>
                      <td>Zulia 'B'</td>
                      <td className="text-center">$25</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </Card>
              <Card className="p-2 md:text-md xs:text-sm" elevation={8} sx={{ borderRadius: 4 }}>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                          Horario
                        </th>
                        <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                          Sorteo
                        </th>
                        <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                          Premio
                        </th>
                        <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                          Total <span className="hidden sm:inline">4:00pm</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={7} className="text-center font-extrabold">
                          4:00pm
                        </td>
                        <td></td>
                        <td></td>
                        <td rowSpan={7} className="text-center font-extrabold">
                          150$
                        </td>
                      </tr>
                      <tr>
                        <td>Táchira 'A'</td>
                        <td className="text-center">200$</td>
                      </tr>
                      <tr>
                        <td>Táchira 'B'</td>
                        <td className="text-center">25$</td>
                      </tr>
                      <tr>
                        <td>Chance 'A'</td>
                        <td className="text-center">25$</td>
                      </tr>
                      <tr>
                        <td>Chance 'B'</td>
                        <td className="text-center">25$</td>
                      </tr>
                      <tr>
                        <td>Zulia 'A'</td>
                        <td className="text-center">25$</td>
                      </tr>
                      <tr>
                        <td>Zulia 'B'</td>
                        <td className="text-center">25$</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-2 md:text-md xs:text-sm" elevation={8} sx={{ borderRadius: 4 }}>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Horario
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Sorteo
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Premio
                      </th>
                      <th className="text-[#e62a3c] md:text-lg xs:text-sm font-bold px-3 py-1">
                        Total <span className="hidden sm:inline">7:00pm</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={5} className="text-center font-extrabold">
                        7:00pm
                      </td>
                      <td></td>
                      <td></td>
                      <td rowSpan={5} className="text-center font-extrabold">
                        100$
                      </td>
                    </tr>
                    <tr>
                      <td>Chance 'A'</td>
                      <td className="text-center">25$</td>
                    </tr>
                    <tr>
                      <td>Chance 'B'</td>
                      <td className="text-center">25$</td>
                    </tr>
                    <tr>
                      <td>Zulia 'A'</td>
                      <td className="text-center">$25</td>
                    </tr>
                    <tr>
                      <td>Zulia 'B'</td>
                      <td className="text-center">$25</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </Card>
              <p className="text-xl mb-4 w-full text-center">
                ¡Más sorteos, más oportunidades de ganar! ¿Qué esperas? Dale a
                <a
                  href="#topComprar"
                  className="text-gray-700 hover:text-[#e62a3c]"
                >
                  {" "}
                  COMPRAR{" "}
                </a>
                y participa, porque aquí no esperas... ¡Aquí te pago de una!
              </p>
            </div>
          </section>

          {/* Cómo Ganar */}
          <section className="mb-16" id="ganar">
            <div className="flex justify-center gap-8 flex-wrap">
              <img src={imgComo} alt="como" style={{ height: "140px" }} />

              <img src={imgGanar} alt="ganar" style={{ height: "125px" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-[#e62a3c] mb-4">1</div>
                <h4 className="text-xl font-semibold mb-2">Elige tu número</h4>
                <p className="text-gray-600">
                  Selecciona entre los números disponibles
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-[#e62a3c] mb-4">2</div>
                <h4 className="text-xl font-semibold mb-2">Realiza el pago</h4>
                <p className="text-gray-600">
                  Usa cualquiera de nuestros métodos seguros
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-[#e62a3c] mb-4">3</div>
                <h4 className="text-xl font-semibold mb-2">Espera el sorteo</h4>
                <p className="text-gray-600">
                  Revisa los resultados en nuestra plataforma
                </p>
              </div>
            </div>
          </section>

          {/* Métodos de Pago */}
          <section className="mb-16" id="pagos">
            <div className="flex justify-center">
              <img
                src={imgPagomovil}
                alt="Pago Movil"
                style={{ height: "150px" }}
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <InfoPago></InfoPago>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white py-8 text-lg">
          <div className="flex flex-col md:flex-row items-center justify-around container mx-auto px-4">
            <div className="seccion flex flex-col">
              <h2 className="font-bold" id="contacto">
                TE PAGO DE UNA
              </h2>
              <img
                className="h-16 w-auto lg:h-12"
                src={logo}
                height={20}
                width={20}
              />
            </div>
            <div className="seccion">
              <h2 className="font-bold text-center">NOSOTROS</h2>
              <p>Te pago de una</p>
            </div>
            <div className="seccion">
              <h2 className="font-bold">CONTACTO</h2>
              <div>
                <p className="py-1">
                  <span>
                    <EmailIcon color="info"></EmailIcon>
                  </span>
                  {"  "}Correo:{"  "}
                  <a href="mailto:tepagodeuna@tepagodeuna.com" target="_blank">
                    tepagodeuna@tepagodeuna.com
                  </a>
                </p>
                <p className="py-1">
                  <span>
                    <WhatsAppIcon color="success"></WhatsAppIcon>
                  </span>
                  {"  "}WhatsApp:{"  "}
                  <a
                    href="https://wa.me/+584129396107?text= solicitar informacion:"
                    target="_blank"
                  >
                    04129396107
                  </a>
                </p>
                <p className="py-1">
                  <span>
                    <PlaceIcon color="primary"></PlaceIcon>{" "}
                  </span>
                  Ubicacion: Caracas, Venezuela
                </p>
              </div>
            </div>
            <div className="seccion">
              <h2 className="font-bold mt-4 text-center">SIGUENOS</h2>
              <div className="flex items-center justify-around gap-2">
                <Button
                  href="https://www.facebook.com/profile.php?id=61572828187654"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon fontSize="large"></FacebookIcon>
                </Button>
                <Button
                  href="https://www.instagram.com/tepagodeuna?igsh=MTQ0dDRtMzZiaGZuYQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon color="error" fontSize="large"></InstagramIcon>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
