"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  Users,
  ChartBarStacked,
  Watch,
  ScrollText,
  MessageSquareText,
  BanknoteArrowDown,
  Megaphone,
  Warehouse,
  PackagePlus,
  View,
  Newspaper,
  PackageX,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "User",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/user/",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: ChartBarStacked,
      isActive: true,
      items: [
        {
          title: "Gender",
          url: "/admin/category/gender",
        },
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
          url: "/admin/category/bandMaterial",
        },
        {
          title: "Case Material",
          url: "/admin/category/caseMaterial",
        },
      ],
    },
    {
      title: "Watches",
      url: "#",
      icon: Watch,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/watch",
        },
      ],
    },
    {
      title: "Stock",
      url: "#",
      icon: Warehouse,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/stock/",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ScrollText,
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
      icon: PackagePlus,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/create-orders/",
        },
      ],
    },
    {
      title: "Tracking",
      url: "#",
      icon: View,
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
      icon: MessageSquareText,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/review-manage/",
        },
      ],
    },
    {
      title: "Manage Banners & Ads",
      url: "#",
      icon: Megaphone,
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
      icon: BanknoteArrowDown,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/coupon",
        },
      ],
    },
    {
      title: "Manage Blogs",
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
      title: "Manage Refund",
      url: "#",
      icon: PackageX ,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/return",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
