import {
    GalleryHorizontalEnd,
    HeartPulse,
    Menu,
    Shirt,
    ShoppingCart,
    TicketsPlane,
    UtensilsCrossed,
    WashingMachine,
  } from "lucide-react";

interface FilterItem {
    name: string;
    bgColor: string;
    Icon: JSX.Element;
  }

export const filter: FilterItem[] = [
    {
      name: "All",
      bgColor: "#a2225a",
      Icon: <GalleryHorizontalEnd size={24} />,
    },
    {
      name: "Fashion",
      bgColor: "#a2225a",
      Icon: <Shirt size={24} />,
    },
    {
      name: "Electronics",
      bgColor: "#a2225a",
      Icon: <WashingMachine size={24} />,
    },
    {
      name: "Grocery",
      bgColor: "#a2225a",
      Icon: <ShoppingCart size={24} />,
    },
    {
      name: "Health",
      bgColor: "#a2225a",
      Icon: <HeartPulse size={24} />,
    },
    {
      name: "Travel",
      bgColor: "#a2225a",
      Icon: <TicketsPlane size={24} />,
    },
    {
      name: "Food",
      bgColor: "#a2225a",
      Icon: <UtensilsCrossed size={24} />,
    },
    {
      name: "Others",
      bgColor: "#a2225a",
      Icon: <Menu size={24} />,
    },
  ];