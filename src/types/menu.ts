export interface MenuItem {
  url?: string;
  menu: string;
  upcoming?: boolean;
  access?: string;
  subMenu?: MenuItem[];
}

export interface MainMenuItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  submenu?: MenuItem[];
}

