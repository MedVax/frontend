"use client";

import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  Container,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
  Badge,
  ButtonBase,
  useMediaQuery,
  Popover,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import {
  AltArrowDown,
  User,
  Magnifer,
  Heart,
  Shop,
  CartLarge,
  Logout,
} from "@solar-icons/react";
import { DropdownButton, WhatsAppButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import usePopover from "@/hooks/use-popover";
import useAuthUser from "@/hooks/use-auth";
import Link from "next/link";
import categoryApi from "@/apis/category-api";
import useLogout from "@/hooks/use-logout";
import { useGetCartQuery } from "@/apis/cart-api";
import { Icon as Iconify } from "@iconify/react";
import useSideMenu from "@/hooks/use-side-menu";
import { usePathname } from "next/navigation";
import productApi from "@/apis/product-api";
import useDebouncedState from "@/hooks/use-debounced-state";

const prescriptionMenuItems = [
  { label: "Patient Prescription", href: "/prescription/patient" },
  { label: "Doctor Prescription", href: "/prescription/doctor" },
];

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery(`(max-width:900px)`);
  const isXSmallScreen = useMediaQuery(`(max-width:640px)`);
  const pathname = usePathname();

  const router = useRouter();
  const { anchorEl, isOpen, setAnchorEl, togglePopover } = usePopover();
  const { toggleSideMenu } = useSideMenu();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const getAllCategories = categoryApi.useGetCategoriesQuery({
    params: {
      includeSubcategories: false,
      hierarchy: false,
    },
  });

  // Get cart count for badge
  const { data: cartData } = useGetCartQuery();
  const cartItemCount =
    cartData?.data?.items?.reduce((total, item) => total + item.quantity, 0) ||
    0;

  const navigationMenuItems = [
    {
      label: "Home",
      icon: <></>,
      onClick: () => router.push("/"),
    },
    {
      label: "Shop by category",
      onClick: () => setIsHovered((prev) => !prev),
      onMouseEnter: () => setIsHovered(true),
    },
    // {
    //   label: "Consultation",
    //   icon: <></>,
    //   onClick: () => router.push("/consultation"),
    // },
    {
      label: "Blog",
      icon: <></>,
      onClick: () => router.push("/blog"),
    },
    {
      label: "Upload Prescription",
      items: prescriptionMenuItems,
    },
    {
      label: "Contact Us",
      icon: <></>,
      onClick: () => router.push("/contact"),
    },
    {
      label: "About",
      icon: <></>,
      onClick: () => router.push("/about"),
    },
  ];

  const categoryMenuItems = getAllCategories.data?.data?.map((category) => ({
    name: category.name,
    image: category.image,
    subCategories: category.children?.map((child) => ({
      name: child.name,
      href: `/category/${child.slug}`,
    })),
  }));

  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
          backgroundColor: "white",
          px: 0,
          py: 0,
          my: 0,
        }}
      >
        <Container maxWidth="xl" className="sm:py-2 py-1 container mx-auto">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="flex gap-6 items-center">
              <div className="flex gap-1">
                {isDashboard && isXSmallScreen && (
                  <IconButton
                    onClick={() => {
                      toggleSideMenu();
                    }}
                  >
                    <Iconify icon="material-symbols:menu" />
                  </IconButton>
                )}

                <Link href="/">
                  {" "}
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/logo.svg"
                      alt="MedVax Logo"
                      className="w-[25px] h-[29px]"
                    />

                    <span className="font-extrabold text-black">MedVax</span>
                  </div>{" "}
                </Link>
              </div>

              {/* Search Bar */}

              <div className="hidden sm:block">
                <SearchBar />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {!isSmallScreen && <div>
                <MyAccountButton />
              </div>}

              <IconButton onClick={() => router.push("/cart")}>
                <Badge badgeContent={cartItemCount} color="primary">
                  <CartLarge size={20} />
                </Badge>
              </IconButton>

              {isSmallScreen && <IconButton onClick={() => router.push("/dashboard")}>
                <User size={20} />
              </IconButton>}

              <WhatsAppButton />
            </div>
          </Toolbar>

          <div className="sm:hidden mb-1 flex justify-center">
            <SearchBar />
          </div>
        </Container>

        {/* Navigation Bar */}
        <div className="bg-gray-900 relative ">
          <div className="overflow-x-auto scrollbar-hidden flex justify-center">
            <Container
              maxWidth="xl"
              className="flex items-center container gap-6 py-4 mx-auto scrollbar-hidden"
            >
              {navigationMenuItems.map((item) => (
                <DropdownButton key={item.label} {...item} />
              ))}
            </Container>
          </div>

          {/* Category Menu */}
          <div
            className={`bg-white shadow-sm shadow-black/4 absolute  w-full transition-all duration-300 ease-in-out ${isHovered
              ? "opacity-100 visible translate-y-0"
              : "opacity-100 invisible -translate-y-2"
              }`}
            {...(isSmallScreen
              ? {}
              : {
                onMouseLeave: () => {
                  setIsHovered(false);
                  setAnchorEl(null);
                },
              })}
          >
            <Container
              maxWidth="xl"
              className="flex flex-wrap container gap-6 py-3 mx-auto"
            >
              {categoryMenuItems?.map((category, index) => (
                <div
                  key={category.name}
                  className="group"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <ButtonBase
                    component="button"
                    // onClick={togglePopover}
                    aria-owns={
                      isOpen ? `mega-menu-popover-${index}` : undefined
                    }
                    onMouseEnter={(e: any) => {
                      setActiveIndex(index);
                      setAnchorEl(e.currentTarget);
                    }}
                    className="text-gray-600! text-nowrap hover:text-gray-600!/80 transition-colors duration-200 flex items-center gap-2"
                  >
                    {category.name} <AltArrowDown size={12} />
                  </ButtonBase>

                  {index === activeIndex && (
                    <Popover
                      id={`mega-menu-popover-${index}`}
                      open={isOpen}
                      anchorEl={anchorEl}
                      onClose={() => {
                        setAnchorEl(null);
                        setActiveIndex(null);
                      }}
                      elevation={0}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div
                        onMouseLeave={() => {
                          setAnchorEl(null);
                          setActiveIndex(null);
                        }}
                        className="w-full max-w-[591px] h-fit sm:h-[288px] bg-white shadow-lg border-b rounded-b-xl border-gray-100 animate-fadeIn z-50 scrollbar-hidden"
                      >
                        <div className="max-w-[1200px] mx-auto px-8 py-10">
                          <div className="flex gap-12 scrollbar-hidden">
                            <div className="flex-1 scrollbar-hidden">
                              <div className="grid grid-cols-2 gap-4">
                                {category?.subCategories?.map((subCategory) => (
                                  <Link
                                    key={subCategory.name}
                                    href={subCategory.href}
                                    className="text-sm text-gray-600 hover:text-gray-600/80 transition-colors duration-200 py-1"
                                  >
                                    {subCategory.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div
                              className="w-[273.68px] h-[185px] rounded-lg bg-gray-300 bg-center bg-contain bg-no-repeat hidden sm:block"
                              style={{
                                backgroundImage: `url(${category.image})`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Popover>
                  )}
                </div>
              ))}
            </Container>
          </div>
        </div>
      </AppBar>
    </>
  );
}

function MyAccountButton() {
  const { anchorEl, isOpen, setAnchorEl, togglePopover } = usePopover();

  const router = useRouter();
  const authUser = useAuthUser();
  const { logout } = useLogout();
  const isAuthenticated = authUser?.isAuthenticated;

  const items = [
    {
      label: "My account",
      href: "/dashboard",
      icon: <User size={20} />,
    },
    { label: "orders", href: "/dashboard/orders", icon: <Shop size={20} /> },
    {
      label: "watchlist",
      href: "/dashboard/watchlist",
      icon: <Heart size={20} />,
    },
    {
      label: "Logout",
      href: "/",
      onClick: () => {
        logout();
      },
      icon: <Logout size={20} />,
    },
  ];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="soft"
        onClick={() => router.push("/signup")}
        startIcon={<User size={20} />}
      >
        Create Account
      </Button>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Button
          variant="soft"
          onClick={togglePopover}
          startIcon={<User size={20} />}
          endIcon={<AltArrowDown size={16} />}
        >
          My account
        </Button>
      ) : (
        <Button
          variant="soft"
          onClick={() => router.push("/signup")}
          startIcon={<User size={20} />}
        >
          Create Account
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div className="px-4 space-y-1">
          <Typography variant="h6" noWrap className="capitalize">
            {authUser?.user?.firstName} {authUser?.user?.lastName}
          </Typography>

          <Typography variant="body1" noWrap className="pb-2">
            {authUser?.user?.email}
          </Typography>

          <Divider />
        </div>

        {items?.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              setAnchorEl(null);
              if (item.onClick) {
                item.onClick();
              } else {
                router.push(item.href);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm font-medium text-gray-600">
                {item.label}
              </span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function SearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [deferredSearch] = useDebouncedState(inputValue, {
    enableReInitialize: true,
    wait: 300,
  });

  // Fetch search suggestions when user types
  const { data: searchResults } = productApi.useGetProductsQuery(
    {
      params: {
        search: deferredSearch || undefined,
        take: 5, // Limit to 5 suggestions
        skip: 0,
      },
    },
    {
      skip: !deferredSearch || deferredSearch.length < 2, // Only search if at least 2 characters
    }
  );

  const suggestions = searchResults?.data?.data || [];

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      // Redirect to products page with search query
      const params = new URLSearchParams();
      params.set("search", searchQuery.trim());
      router.push(`/products?${params.toString()}`);
    },
    [router]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(searchValue || inputValue);
    },
    [handleSearch, searchValue, inputValue]
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-[420px] w-full">
      <Autocomplete
        disablePortal
        id="search-medication"
        freeSolo
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={searchValue}
        onChange={(_, newValue) => {
          if (typeof newValue === "string") {
            setSearchValue(newValue);
            handleSearch(newValue);
          } else if (newValue) {
            setSearchValue(newValue.name);
            handleSearch(newValue.name);
          }
        }}
        options={suggestions}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          return option.name || "";
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <div className="flex items-center gap-2 w-full">
              {option.images && option.images.length > 0 && (
                <img
                  src={option.images[0]}
                  alt={option.name}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <Typography variant="body2" className="font-medium">
                  {option.name}
                </Typography>
                {option.brand && (
                  <Typography variant="caption" color="text.secondary">
                    {option.brand.name}
                  </Typography>
                )}
              </div>
            </div>
          </li>
        )}
        sx={{
          "& .MuiInputBase-root": {
            paddingRight: "0 !important",
          },
        }}
        className="w-full"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search medication"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "99px",
              },
            }}
            slotProps={{
              // @ts-ignore
              input: {
                ...params.inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Magnifer size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      variant="contained"
                      className="z-10"
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </form>
  );
}

