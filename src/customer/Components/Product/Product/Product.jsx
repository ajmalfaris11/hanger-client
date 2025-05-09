import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";

import { filters, singleFilter, sortOptions } from "./FilterData";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { productdata } from "../../../../data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  findProducts,
  findProductsByCategory,
} from "../../../../Redux/Customers/Product/Action";
import { deepPurple } from "@mui/material/colors";
import { Backdrop, CircularProgress } from "@mui/material";
import BackdropComponent from "../../BackDrop/Backdrop";
import { mens_kurta } from "../../../../Data/Men/men_kurta";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  // const { customersProduct } = useSelector((store) => store);
  const { products } = useSelector((store) => store);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };

  // const filter = decodeURIComponent(location.search);
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const disccount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  // console.log("location - ", colorValue, sizeValue,price,disccount);

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);
    const data = {
      category: param.lavelThree,
      colors: colorValue || [],
      sizes: sizeValue || [],
      minPrice,
      maxPrice,
      minDiscount: disccount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber,
      pageSize: 12,
      stock: stock
    };
    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorValue,
    sizeValue,
    priceValue,
    disccount,
    sortValue,
    pageNumber,
    stock
  ]);

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValues = searchParams.getAll(sectionId);

    if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
      filterValues = filterValues[0]
        .split(",")
        .filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
      console.log("includes");
    } else {
      // Remove all values for the current section
      // searchParams.delete(sectionId);
      filterValues.push(value);
    }

    if (filterValues.length > 0)
      searchParams.set(sectionId, filterValues.join(","));

    // history.push({ search: searchParams.toString() });
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    if (products.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [products.loading]);

  return (
    <div className="bg-white -z-20 ">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      // open={false}
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-black-600 focus:ring-black-500"
                                      onChange={() =>
                                        handleFilter(option.value, section.id)
                                      }
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    // onClick={()=>handleFilter(option.value,section.id)}
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 lg:px-14 pt-6">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              PRODUCTS
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() => handleSortChange(option.query)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-10 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div>
              <div className="grid grid-cols-1 lg:grid-cols-6">
                {/* Filters */}
                <form className="lg:col-span-1 hidden lg:block rounded-md bg-white">
                  <h2 className="pb-5 font-semibold opacity-60 text-lg">Filters</h2>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-4">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-2 text-sm text-gray-600 hover:text-gray-800">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            {open ? (
                              <MinusIcon className="h-5 w-5" />
                            ) : (
                              <PlusIcon className="h-5 w-5" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-2">
                            <div className="space-y-3">
                              {section.options.map((option, idx) => (
                                <div key={option.value || idx} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${idx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={() => handleFilter(option.value, section.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-black-600 focus:ring-black-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${idx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-4">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-2 text-sm text-gray-600 hover:text-gray-800">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            {open ? (
                              <MinusIcon className="h-5 w-5" />
                            ) : (
                              <PlusIcon className="h-5 w-5" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-2">
                            <FormControl>
                              <RadioGroup name="radio-buttons-group">
                                {section.options.map((option, idx) => (
                                  <FormControlLabel
                                    key={option.value || idx}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onChange={(e) => handleRadioFilterChange(e, section.id)}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-5 w-full px-4 min-h-screen">
                  {products.products?.content?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {products.products.content.map((item, index) => (
                        <ProductCard key={item.id || index} product={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 mt-10 text-lg flex justify-center items-center text-center h-[50vh]">
                      Products not available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* pagination section */}
        <section className="w-full px-[3.6rem]">
          <div className="mx-auto px-4 flex justify-center">
            <Pagination
              count={products.products?.totalPages}
              onChange={handlePaginationChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#000", // text color
                  borderColor: "#000",
                },
                "& .Mui-selected": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />

          </div>
        </section>

        {/* {backdrop} */}
        <section>
          <BackdropComponent open={isLoaderOpen} />
        </section>
      </div>
    </div>
  );
}
