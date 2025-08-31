import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardMember from "@/components/views/Member/Dashboard/DashboardMember";
import React from "react";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout title="Dashboard" type="member">
      <DashboardMember />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
