import React from "react";
import PageLabel from "../../../../Components/Templates/Dashboard/ui/PageLabel";
import ModeratorProductsTable from "../../../../Components/Templates/Dashboard/Templates/moderator/Products/ModeratorProductsTable";

const ModeratorProducts = () => {
  return (
    <div className="space-y-10">
      <PageLabel label="مدیریت محصولات فروشگاه" />
      <ModeratorProductsTable />
    </div>
  );
};

export default ModeratorProducts;
