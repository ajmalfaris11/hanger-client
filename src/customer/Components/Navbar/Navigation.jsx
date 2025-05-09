import { useEffect, useState, Fragment } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationData";  // Assuming navigation data is correctly defined
import AuthModel from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../Redux/Auth/Action";
import axios from 'axios';
import api from '../../../config/api'
import logo from "../../../Data/logo/hanger_black_logo.png"
import white_logo from "../../../Data/logo/hanger_white_logo.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Login } from '@mui/icons-material';


const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showInput, setShowInput] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    if (auth.user) { // Check if the user is logged in
      api.get('api/cart')
        .then((response) => {
          setCartItems(response.data.cartItems || []); // Fallback to an empty array if cartItems is undefined
        })
        .catch((error) => {
          console.error("Failed to fetch cart items:", error);
        });
    } else {
      setCartItems([]); // Clear cart items if the user is not logged in
    }
  }, [auth.user, location]); // Add auth.user as a dependency


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleProfileClick = () => {
    navigate('/profile');
    handleCloseUserMenu();
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOrdersClick = () => {
    navigate('/orders');
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose();

      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate(-1);
      }

    }


  }, [auth.user, navigate, handleClose]);

  useEffect(() => {

    if (location.pathname === "/login" || location.pathname === "/register") {
      handleOpen();
    }

  }, [auth.user, navigate, handleClose]);


  // logout 
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(logout());
    handleCloseUserMenu();
  }
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (searchTerm.trim()) {
      navigate(`/all_products?query=${encodeURIComponent(searchTerm)}`);
    }
    setSearchTerm("");
  };



  return (
    <div className="bg-black px-3 relative">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full  flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-transparent text-black"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                  style={{
                                    borderRadius: "5px",
                                    width: "220px",
                                    height: "200px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                    objectPosition: "top",
                                  }}
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item, index) => (
                                <li key={`${section.id}-${index}`} className="flow-root">
                                  <p className="-m-2 block p-2 text-gray-500" onClick={() => {
                                    navigate(`/${category.id}/${section.id}/${item.id}`);
                                    setOpen(false);
                                  }}>
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 px-4 py-4">
                  <div className="flow-root">
                    {auth?.user ? (
                      <Button
                        onClick={handleLogout}
                        className="ml-5 !bg-black !text-white hover:bg-gray-800 !w-full !py-2"
                        size="small"
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate("/login")}
                        className="ml-5 !bg-black !text-white hover:bg-gray-800 !w-full !py-2"
                        size="small"
                      >
                        Login
                      </Button>
                    )}
                  </div>

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-black">
        <div className="relative py-1 pt-2 overflow-hidden bg-black text-white flex items-center">
          <style>
            {`
      @keyframes scrollTicker {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-36.4%); }
      }
    `}
          </style>

          <div className="whitespace-nowrap flex animate-[scrollTicker_10s_linear_infinite] text-sm">
            {/* Scrolling ticker with free shipping promotion */}
            <span className="mx-10">
              FREE SHIPPING &nbsp;&nbsp; OVER 1000
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
            <span className="mx-10">
              10% DISCOUNT &nbsp;&nbsp; ON FIRST ORDER
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
            <span className="mx-10">
              FREE SHIPPING &nbsp;&nbsp; OVER 1000
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
            <span className="mx-10">
              10% DISCOUNT &nbsp;&nbsp; ON FIRST ORDER
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
            <span className="mx-10">
              FREE SHIPPING &nbsp;&nbsp; OVER 1000
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
            <span className="mx-10">
              10% DISCOUNT &nbsp;&nbsp; ON FIRST ORDER
            </span>
            <img src={white_logo} alt="hanger logo" className="w-full h-[25px]" />
          </div>

        </div>


        <nav aria-label="Top" className="mx-auto bg-white rounded-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex h-14 items-center justify-between px-3 md:px-6">
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden rounded-md p-2 text-gray-500 hover:text-black hover:bg-gray-100 focus:outline-none"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <a href="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-12 w-auto hidden md:block" />
                <h1 className="font-semibold text-xl sm:text-2xl md:hidden">H A N G E R</h1>
              </a>

              {/* Flyout menus */}
              <Popover.Group className="hidden md:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8 jcstify-center items-center">
                  <a href="/"><span className="text-gray-700 hover:text-gray-800 font-medium text-sm">Home</span></a>
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "text-black font-black"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 "
                                aria-hidden="true"
                              />

                              <div className="relative bg-white mt-6 mx-10 rounded-xl h-[22rem] overflow-y-scroll">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 flex justify-center overflow-hidden rounded-lg  group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              style={{
                                                borderRadius: "5px",
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                cursor: "pointer",
                                                objectPosition: "top",
                                              }}
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              {/* Right icons */}
              <div className="flex items-center space-x-2 sm:space-x-4">

                {/* Search */}
                <div className="flex items-center">
                  {/* Desktop input */}
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="hidden sm:block pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-black transition-all duration-200"
                  />

                  {/* Search icon */}
                  <button
                    className="ml-2 flex items-center justify-center w-8 h-8 rounded-full sm:bg-black"
                    onClick={() => {
                      if (window.innerWidth < 640) {
                        setShowMobileSearch(!showMobileSearch);
                      } else {
                        handleSearch();
                      }
                    }}
                  >
                    <MagnifyingGlassIcon className="h-6 w-6 sm:h-5 sm:w-5 sm:text-white" />
                  </button>

                  {/* Mobile input popup */}
                  {showMobileSearch && (
                    <div className="absolute top-[120px] left-0 w-full sm:hidden px-4">
                      <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-lg">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="flex-1 outline-none text-sm"
                        />
                        <button onClick={handleSearch}>
                          <MagnifyingGlassIcon className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <button
                  onClick={() => navigate("/cart")}
                  className="relative text-gray-600 hover:text-black focus:outline-none"
                >
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-black rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                {/* Profile or Sign in */}
                {auth.user?.firstName ? (
                  <div>
                    <Avatar
                      className="cursor-pointer !bg-black text-white !w-8 !h-8 !text-sm"
                      onClick={handleUserClick}
                    >
                      {auth.user.firstName[0].toUpperCase()} {auth.user.lastName[0].toUpperCase()}
                    </Avatar>

                    <Menu
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      PaperProps={{
                        style: {
                          width: 200,
                          borderRadius: 8,
                          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                          marginTop: 22,
                        },
                      }}
                    >
                      <MenuItem onClick={handleProfileClick}>
                        <AccountCircleIcon style={{ marginRight: 8 }} />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleOrdersClick}>
                        <ShoppingCartIcon style={{ marginRight: 8 }} />
                        My Orders
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon style={{ marginRight: 8 }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      handleOpen();
                      navigate("/login");
                    }}
                    className="text-sm !text-gray-600 hover:text-black !p-0 !m-0"
                  >
                    Login
                  </Button>

                )}
              </div>
            </div>
          </div>
        </nav>
      </header>


      <div className="w-full h-[10px]" />
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
};

export default Navigation;
