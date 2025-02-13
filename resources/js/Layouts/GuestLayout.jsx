import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Card, Paper } from "@mui/material";

export default function GuestLayout({ children }) {
  return (
    <div className="flex flex-col items-center bg-yellow-400 pt-6 sm:justify-center sm:pt-0 w-full">
      <div className="my-3">
        <Link href="/">
          <ApplicationLogo className="h-20 w-20 fill-current" />
        </Link>
      </div>

      <Paper elevation={0} square={true} className="w-full" sx={{ bgcolor: "#fbd101" }} >
        {children}
      </Paper>
    </div>
  );
}
