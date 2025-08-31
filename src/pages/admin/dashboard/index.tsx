import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardAdmin from "@/components/views/Admin/Dashboard";
import React from "react";

const DashboardAdinPage = () => {
  return (
    <DashboardLayout title="Dashboard" type="admin">
      <DashboardAdmin />
    </DashboardLayout>
  );
};

export default DashboardAdinPage;
