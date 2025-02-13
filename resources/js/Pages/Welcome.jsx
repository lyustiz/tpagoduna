import { Head, Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import logo from "../../../public/images/logo.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';

export default function Welcome({ auth }) {
  const premios = [
    { cantidad: "$1,000,000", descripcion: "Premio Mayor" },
    { cantidad: "$500,000", descripcion: "Segundo Premio" },
    { cantidad: "$250,000", descripcion: "Tercer Premio" },
    { cantidad: "$100,000", descripcion: "Cuarto Premio" },
  ];

  const metodosPago = [
    { nombre: "Visa", icono: "visa.svg" },
    { nombre: "Mastercard", icono: "mastercard.svg" },
    { nombre: "PayPal", icono: "paypal.svg" },
    { nombre: "Bitcoin", icono: "bitcoin.svg" },
  ];

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
            <div className="hidden md:flex space-x-6">
              <a href="#premios" className="text-gray-700 hover:text-[#e62a3c]">
                Premios
              </a>
              <a href="#ganar" className="text-gray-700 hover:text-[#e62a3c]">
                Cómo Ganar
              </a>
              <a href="#pagos" className="text-gray-700 hover:text-[#e62a3c]">
                Pagos
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
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#e62a3c] mb-6">
              ¡GANA HASTA $1,000!
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Participa en el sorteo más grande del año
            </p>
            
                <Link
                    href={route("compra.index")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                  >
                    <button
              className="bg-[#e62a3c] text-white px-8 py-3 rounded-full 
            hover:bg-red-800 transition duration-300 text-lg"
            >
                    Comprar
                    </button>
                  </Link>
            
          </section>

          {/* Carousel de Premios */}
          <section className="mb-16" id="premios">
            <h3 className="text-3xl text-[#e62a3c] font-bold mb-8 text-center">
              Premios Disponibles
            </h3>
            <div className="flex flex-wrap bg-white justify-center gap-4 p-4 md:p-8 rounded-xl shadow-lg">
              {premios.map((premio, index) => (
                <Card key={index}>
                  <div className="bg-white p-6 mx-2 rounded-xl text-center">
                    <div className="text-4xl font-bold text-[#e62a3c] mb-4">
                      {premio.cantidad}
                    </div>
                    <p className="text-gray-600">{premio.descripcion}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Cómo Ganar */}
          <section className="mb-16" id="ganar">
            <h3 className="text-3xl text-[#e62a3c] font-bold mb-8 text-center">
              ¿Cómo Ganar?
            </h3>
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
            <h3 className="text-3xl text-[#e62a3c] font-bold mb-8 text-center">
              Métodos de Pago
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metodosPago.map((metodo, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg text-center 
                shadow-md hover:shadow-lg transition duration-300"
                >
                  <img
                    src={`/icons/${metodo.icono}`}
                    alt={metodo.nombre}
                    className="h-16 w-auto mx-auto mb-2"
                  />
                  <span className="text-gray-700">{metodo.nombre}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white py-8">
            <div className="flex flex-col md:flex-row items-center justify-around container mx-auto px-4">
              <div className="seccion">
                <h2 className="font-bold">TE PAGO DE UNA</h2>
                <img
                className="h-12 w-auto lg:h-10"
                src={logo}
                height={20}
                width={20}
              />
              </div>
              <div className="seccion">
              <h2 className="font-bold">NOSOTROS</h2>
              <p>Te pago de una</p>
              </div>
              <div className="seccion">
              <h2 className="font-bold">CONTACTO</h2>
              <div>
                <p><span><EmailIcon></EmailIcon></span> Correo: lyusttiz@gmail.com</p>
                <p><span><WhatsAppIcon ></WhatsAppIcon></span>Telefono: 0412-9098862</p>
                <p><span><PlaceIcon></PlaceIcon> </span>Direccion: Caracas, Venezuela</p>
              </div>
              </div>
              <div className="seccion">
              <h2 className="font-bold">SIGUENOS</h2>
              <div className="flex gap-2">
                <Button>
                  <FacebookIcon></FacebookIcon>
                </Button>
                <Button>
                 <XIcon></XIcon>
                </Button>
                <Button>
                <InstagramIcon></InstagramIcon>
                </Button>
              </div>
              </div>
            </div>
        </footer>
      </div>
    </>
  );
}
