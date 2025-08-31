import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "border-default-200 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <Image
            alt="logo"
            className="mb-6 w-32"
            height={60}
            width={180}
            onClick={() => router.push("/")}
            src="/images/general/logo.svg"
          />
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard-Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger-500 text-white": router.pathname.startsWith(
                  item.href,
                ),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          className="flex justify-start rounded-lg px-2 py-1.5 font-semibold"
          color="danger"
          fullWidth
          onClick={() => signOut()}
          size="lg"
          variant="light"
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
