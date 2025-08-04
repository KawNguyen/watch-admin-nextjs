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
  Undo2,
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
      title: "Quản Lý Tài Khoản",
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
      title: "Quản Lý Danh Mục",
      url: "#",
      icon: ChartBarStackedIcon,
      isActive: true,
      items: [
        {
          title: "Thương Hiệu",
          url: "/admin/category/brand",
        },
        {
          title: "Chuyển Động",
          url: "/admin/category/movement",
        },
        {
          title: "Chất Liệu Dây",
          url: "/admin/category/band-material",
        },
        {
          title: "Chất Liệu Vỏ",
          url: "/admin/category/case-material",
        },
      ],
    },
    {
      title: "Đồng Hồ",
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
      title: "Nhập Hàng",
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
      title: "Kho",
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
      title: "Hóa Đơn",
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
      title: "Quản Lý Quảng Cáo",
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
      title: "Quản Lý Mã Giảm Giá",
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
      title: "Quản Lý Bài Blogs",
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
      title: "Quản Lý Đánh Giá",
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
      title: "Quản Lý Đổi Trả",
      url: "#",
      icon: Undo2,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/return",
        },
      ],
    },
    {
      title: "Quản Lý Hỗ Trợ",
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
