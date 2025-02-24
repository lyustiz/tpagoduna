import logo from "../../../public/images/logo.png";
import { router, usePage } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PaymentsIcon from "@mui/icons-material/Payments";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const success = usePage().props.success;

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
      segment: "venta",
      title: "Venta",
      icon: <PaymentsIcon />,
    },
    {
      segment: "configuracion",
      title: "Configuracion",
      icon: <SettingsIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Administrar",
    },
   /* {
      segment: "reports",
      title: "Reports",
      icon: <DashboardIcon />,
      children: [
        {
          segment: "sales",
          title: "Sales",
          icon: <DashboardIcon />,
        },
        {
          segment: "traffic",
          title: "Traffic",
          icon: <DashboardIcon />,
        },
      ],
    },
    {
      segment: "integrations",
      title: "Integrations",
      icon: <DashboardIcon />,
    },*/
  ];

  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
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
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
