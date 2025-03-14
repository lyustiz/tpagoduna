import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header="Panel Principal"
      title="Panel Principal"
    ></AuthenticatedLayout>
  );
}
