import { BiDollar, BiHome } from "react-icons/bi";
import NavItem from "../../Common/Sidebar/fragments/NavItem/index";
import { BsBox2, BsShop } from "react-icons/bs";
import { FaTruckArrowRight, FaUsersLine } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

const ModeratorLinks = () => {
  return (
    <>
      <NavItem
        icon={<BiHome size={20} />}
        bgColor={"bg-gray-500"}
        iconColor={"text-gray-700"}
        href="/dashboard/moderator/home"
        label="پیشخوان"
      />
      <NavItem
        icon={<BsBox2 size={20} />}
        bgColor={"bg-yellow-500"}
        iconColor={"text-yellow-700"}
        href="/dashboard/moderator/products"
        label="محصولات"
      />
      <NavItem
        icon={<FaTruckArrowRight size={20} />}
        bgColor={"bg-orange-500"}
        iconColor={"text-orange-700"}
        href="/dashboard/moderator/orders"
        label="سفارشات"
      />
      <NavItem
        icon={<FaUsersLine size={20} />}
        bgColor={"bg-blue-500"}
        iconColor={"text-blue-700"}
        href="/dashboard/moderator/users"
        label="کاربران"
      />
      <NavItem
        icon={<BsShop size={20} />}
        bgColor={"bg-green-500"}
        iconColor={"text-green-700"}
        href="/dashboard/moderator/sellers"
        label="فروشنده‌ها"
      />
      <NavItem
        icon={<MdOutlineCategory size={20} />}
        bgColor={"bg-purple-500"}
        iconColor={"text-purple-700"}
        href="/dashboard/moderator/categories"
        label="دسته بندی ها"
      />
      <NavItem
        icon={<BiDollar size={20} />}
        bgColor={"bg-pink-500"}
        iconColor={"text-pink-700"}
        href="/dashboard/moderator/offs"
        label="تخفیفات"
      />
    </>
  );
};

export default ModeratorLinks;
