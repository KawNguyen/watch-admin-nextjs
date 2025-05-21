"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  NotebookTabs,
  CookingPot,
  ChefHat,
  Calendar1,
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
    // {
    //     name: "Acme Corp.",
    //     logo: AudioWaveform,
    //     plan: "Startup",
    // },
    // {
    //     name: "Evil Corp.",
    //     logo: Command,
    //     plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "User",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/user/list",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/category/list",
        },
        {
          title: "Add Category",
          url: "/admin/category/add",
        },
      ],
    }, 
    {
      title: "Products",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/products/list",
        },
        {
          title: "Add Products",
          url: "/admin/products/add",
        },
      ],
    },
    {
      title: "Stock",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/stock/list",
        },
        {
          title: "Add Products",
          url: "/admin/stock/add",
        },
        {
          title: "History",
          url: "/admin/stock/history",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/orders/list",
        },
      ],
    },
    {
      title: "Create Orders",
      url: "#",
      icon: ChefHat,
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
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/tracking/list",
        },
      ],
    },
    {
      title: "Manage Reviews",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/review/list",
        },
      ],
    },
    {
      title: "Manage Banners & Ads",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/ads/list",
        },
      ],
    },
    {
      title: "Manage Coupons  ",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin/coupon/list",
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
