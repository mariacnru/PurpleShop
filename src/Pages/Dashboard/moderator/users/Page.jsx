import React from "react";
import PageLabel from "../../../../Components/Templates/Dashboard/ui/PageLabel";
import ModeratorUsersTable from "../../../../Components/Templates/Dashboard/Templates/moderator/users/ModeratorUsersTable";

const page = () => {
  return (
    <div className="space-y-10">
      <PageLabel label="مدیریت کاربران فروشگاه" />
      <ModeratorUsersTable />
    </div>
  );
};

export default page;
