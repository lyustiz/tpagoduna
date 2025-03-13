import logo from "../../../public/images/logo.png";
import { router, usePage, Head } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PaymentsIcon from "@mui/icons-material/Payments";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SettingsIcon from "@mui/icons-material/Settings";
import CasinoIcon from '@mui/icons-material/Casino';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function AuthenticatedLayout({ header, title, children }) {
  const user = usePage().props.auth.user;

  const [session, setSession] = useState({
    user: {
      name: user.name,
      email: user.email,
    },
  });

  const NAVIGATION = [
    {
      kind: "header",
      title: "Principal",
    },
    {
      segment: "jugada",
      title: "Jugadas",
      icon: <CasinoIcon />,
    },
    {
      segment: "venta",
      title: "Venta",
      icon: <PaymentsIcon />,
    },
    
   
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Administrar",
    },
    {
      segment: "configuracion",
      title: "Configuracion",
      icon: <SettingsIcon />,
    },
  ];

  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    typography: {
      fontFamily: '"League Spartan", sans-serif',
    },
    colorSchemes: { light: true, dark: false },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const authentication = useMemo(() => {
    return {
      signOut: () => {
        router.post("/logout");
        setSession(null);
      },
      signIn: (email, password) => {
        router.post("/login", { email, password });
      },
    };
  }, []);

  return (
    <>
    <Head title={header} />
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      theme={theme}
      branding={{
        logo: <img src={logo} alt="Te Pago de Una" />,
        title: "",
        homeUrl: "/dashboard",
      }}
      authentication={authentication}
    >
      <DashboardLayout defaultSidebarCollapsed > 
      <Paper sx={{ width: '100%' }}>
      <PageContainer title={title}>
          {children}
      </PageContainer>
      </Paper>
      </DashboardLayout>
    </AppProvider>
    </>
  );
}
