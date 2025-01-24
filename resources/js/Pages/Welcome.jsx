import { Head, Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import logo from "../../../public/images/logo.png";

export default function Welcome({ auth }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };

  return (
    <>
      <Head title="Welcome" />
      <div className="bg-gray-10 text-black/10">
        <img
          id="background"
          className="absolute -left-20 top-0 max-w-[877px]"
          src="https://laravel.com/assets/img/welcome/background.svg"
        />
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:col-start-2 lg:justify-center">
                <img
                  className="h-12 w-auto lg:h-16"
                  src={logo}
                  height={50}
                  width={50}
                />
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route("register")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </header>

            <main className="mt-6">
              <div className="grid gap-6 lg:grid-cols-1 lg:gap-8">
                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10">
                  <div className="pt-3 sm:pt-5">
                    <div className="mt-4 text-sm/relaxed">
                      <Button variant="contained">Hello world</Button>
                      <Chip label="Chip Filled" color="success" />
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <footer className="py-16 text-center text-sm text-black">
              PagoDe1Una
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
