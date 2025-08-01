import {
  BanknoteArrowDownIcon,
  ChartBarStackedIcon,
  GalleryVerticalEndIcon,
  MegaphoneIcon,
  MessageSquareTextIcon,
  MessageSquareWarning,
  Newspaper,
  ScrollTextIcon,
  UsersIcon,
  WarehouseIcon,
  Archive,
  WatchIcon,
  LayoutDashboard,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEndIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/dashboard",
        },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: UsersIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/user",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: ChartBarStackedIcon,
      isActive: true,
      items: [
        {
          title: "Brand",
          url: "/admin/category/brand",
        },
        {
          title: "Movement",
          url: "/admin/category/movement",
        },
        {
          title: "Band Material",
          url: "/admin/category/band-material",
        },
        {
          title: "Case Material",
          url: "/admin/category/case-material",
        },
      ],
    },
    {
      title: "Watches",
      url: "#",
      icon: WatchIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/watches",
        },
      ],
    },
    {
      title: "Stock",
      url: "#",
      icon: WarehouseIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/stock",
        },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: Archive,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/inventory",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ScrollTextIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Banners & Ads",
      url: "#",
      icon: MegaphoneIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/ads",
        },
      ],
    },
    {
      title: "Coupons",
      url: "#",
      icon: BanknoteArrowDownIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/coupon",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/blog",
        },
      ],
    },
    {
      title: "Reviews",
      url: "#",
      icon: MessageSquareTextIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/review-manage",
        },
      ],
    },
    {
      title: "Support",
      url: "#",
      icon: MessageSquareWarning,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/support",
        },
      ],
    },
  ],
};
