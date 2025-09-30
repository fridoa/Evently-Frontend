import DashboardLayout from "@/components/layouts/DashboardLayout";
import CategoryAdmin from "@/components/views/Admin/Category";
import React from "react";

const CategoryDashboardPage = () => {
  return (
    <DashboardLayout title="Category" type="admin">
      <CategoryAdmin />
    </DashboardLayout>
  );
};

export default CategoryDashboardPage;
