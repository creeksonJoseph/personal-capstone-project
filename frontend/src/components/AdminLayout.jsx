import React from "react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] md:h-[calc(100vh-8.5rem)] pb-20 md:pb-0">
        <Sidebar />
        <BottomNav />
        <main className="flex-1 flex flex-col overflow-y-auto w-full">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
