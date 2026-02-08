export interface HeaderProps {
  scroll: boolean;
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
  isSearch: boolean;
  handleSearch: () => void;
}

export interface BreadcrumbProps {
  breadcrumbTitle: string;
}

export interface BackToTopProps {
  target: string;
}
