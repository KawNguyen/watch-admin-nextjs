import { BanknoteArrowDownIcon, ChartBarStackedIcon, GalleryVerticalEndIcon, MegaphoneIcon, MessageSquareTextIcon, PackagePlusIcon, ScrollTextIcon, UsersIcon, ViewIcon, WarehouseIcon, WatchIcon } from "lucide-react";

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
      title: "User",
      url: "#",
      icon: UsersIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/user",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: ChartBarStackedIcon,
      isActive: true,
      items: [
        // {
        //   title: "Gender",
        //   url: "/admin/category/gender",
        // },
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
      title: "Create Orders",
      url: "#",
      icon: PackagePlusIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/create-orders",
        },
      ],
    },
    {
      title: "Tracking",
      url: "#",
      icon: ViewIcon,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/tracking",
        },
      ],
    },
    {
      title: "Manage Reviews",
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
      title: "Manage Banners & Ads",
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
      title: "Manage Coupons",
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
  ],
};
