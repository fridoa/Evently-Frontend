import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <CiBookmark />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <CiViewList />,
  },
  {
    key: "transactions",
    label: "Transactions",
    href: "/admin/transactions",
    icon: <CiWallet />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member",
    icon: <CiGrid41 />,
  },
  {
    key: "transactions",
    label: "Transactions",
    href: "/member/transactions",
    icon: <CiWallet />,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/member/settings",
    icon: <CiSettings />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
