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
import { useState } from "react";
import {
  AltArrowDown,
  User,
  Magnifer,
  Heart,
  Shop,
  CartLarge,
} from "@solar-icons/react";
import { DropdownButton, WhatsAppButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import usePopover from "@/hooks/use-popover";
import useAuthUser from "@/hooks/use-auth";
import Link from "next/link";
import categoryApi from "@/apis/category-api";

const prescriptionMenuItems = [
  { label: "Upload Prescription", href: "/prescription/upload" },
  { label: "View Prescriptions", href: "/prescription/view" },
];

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery(`(max-width:900px)`);

  const router = useRouter();
  const { anchorEl, isOpen, setAnchorEl, togglePopover } = usePopover();
  const [activeIndex, setActiveIndex] = useState(0);
  const getAllCategories = categoryApi.useGetCategoriesQuery({
    params: {
      includeSubcategories: false,
      hierarchy: false,
    },
  });

  const navigationMenuItems = [
    {
      label: "Shop by category",
      onClick: () => setIsHovered((prev) => !prev),
      onMouseEnter: () => setIsHovered(true),
    },
    {
      label: "Consultation",
      icon: <></>,
      onClick: () => router.push("/consultation"),
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

  console.log({ anchorEl });

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

              {/* Search Bar */}

              <div className="hidden sm:block">
                <SearchBar />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <MyAccountButton />
              </div>
              <IconButton onClick={() => router.push("/cart")}>
                <Badge badgeContent={1} color="primary">
                  <CartLarge size={20} />
                </Badge>
              </IconButton>
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
                        className="w-full max-w-[591px] h-fit sm:h-[288px] bg-white shadow-lg border-b rounded-b-xl border-gray-100 animate-fadeIn z-50"
                      >
                        <div className="max-w-[1200px] mx-auto px-8 py-10">
                          <div className="flex gap-12">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-6">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src="/assets/logo.svg"
                                  alt="MedVax Logo"
                                  className="w-[13px] h-[16px]"
                                />
                                <h3 className="text-lg font-medium text-black">
                                  {category.name}
                                </h3>
                              </div>
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
  const isAuthenticated = !!authUser;

  const items = [
    { label: "My account", href: "/account", icon: <User size={20} /> },
    { label: "orders", href: "/logout", icon: <Shop size={20} /> },
    { label: "watchlist", href: "/logout", icon: <Heart size={20} /> },
  ];
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
        <div className="px-4 space-y-2 ">
          <Typography variant="h6" noWrap className="capitalize">
            {authUser?.user?.first_name} {authUser?.user?.last_name} sylvernus
            akubo
          </Typography>

          <Typography variant="body1" noWrap className="pb-2">
            {authUser?.user?.email} sylvernusakubo@gmail.com
          </Typography>

          <Divider />
        </div>

        {items?.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              setAnchorEl(null);
              router.push(item.href);
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
  return (
    <Autocomplete
      disablePortal
      id="search-medication"
      sx={{
        "& .MuiInputBase-root": {
          paddingRight: "0 !important",
        },
      }}
      className="max-w-[420px]"
      options={[
        { label: "Medication 1", value: "medication-1" },
        { label: "Medication 2", value: "medication-2" },
        { label: "Medication 3", value: "medication-3" },
      ]}
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
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Magnifer size={18} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" className="z-10">
                    Search
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
