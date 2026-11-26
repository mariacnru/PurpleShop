import React from "react";
import PageLabel from "../../../ui/PageLabel";
import ModeratorCategoriesTable from "./ModeratorCategoriesTable";
import ModeratorSubCategoriesTable from "./ModeratorSubCategoriesTable";

const Index = () => {
  return (
    <div className="space-y-5">
      <PageLabel label={"مدیریت دسته بندی های فروشگاه"} />
      <ModeratorCategoriesTable />
      <ModeratorSubCategoriesTable />
    </div>
  );
};

export default Index;
