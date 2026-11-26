import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../Common/Sidebar/index";
import AuthProvider from "../../context/AuthProvider";
import { Toaster } from "sonner";

const CMSLayout = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            fontFamily: "IRANSansX",
          },
        }}
      />
      <main id="application" className="flex gap-10 min-h-dvh">
        <Sidebar />
        <section className="container mx-auto  py-4" id="content">
          <Outlet />
        </section>
      </main>
    </AuthProvider>
  );
};

export default CMSLayout;
