import { useState, Fragment } from "react";
import { categoriesData } from "../Data/CategoriesData";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const YearData = [
  { title: "Sort By Year" },
  { title: "1700-1800" },
  { title: "1800-1900" },
  { title: "1900-2000" },
  { title: "2000-2010" },
  { title: "2010-2030" },
];
const customToTmdbGenreMapping = {
  '1': 10749,  // Romantic
  '2': 28,     // Action
  '3': 12,     // Adventure
  '4': 27,     // Horror
  '5': 35,     // Comedy
  '6': 10770,  // Sports
  '7': 14,     // Fantasy
  '8': 10402,  // Musicals
  '9': 18,     // Drama
  '10': 53,    // Thriller
  '11': 37,    // Western
};
const categoriesData = [
  {
      _id:10749,
      title :'Romantic'
  },
      {
      _id:28,
      title :'Action'
  },
      {
      _id:12,
      title :'Adventure'
  }
  ,    {
      _id:27,
      title :'Horror'
  },    {
      _id:35,
      title :'Comedy'
  },    {
      _id:10770,
      title :'Sports'
  },    {
      _id:14,
      title :'Fantacy'
  },    {
      _id:10402,
      title :'Misicals'
  },    {
      _id:18,
      title :'Drama'
  },    {
      _id:53,
      title :'Thriller'
  },    {
      _id:37,
      title :'Western'

  }
]

const RateData = [
  { title: "Sort By Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

function Filters() {
  const [category, setCategory] = useState({ title: "Category" });
  const [year, setYear] = useState(YearData[0]);
  const [rates, setrates] = useState(RateData[0]);

  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items: categoriesData,
    },
    {
      value: year,
      onchange: setYear,
      items: YearData,
    },
    {
      value: rates,
      onchange: setrates,
      items: RateData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray-800 grid md:grid-cols-4 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onchange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown
                  className="h-5 w-5"
                  aria-hidden="true"
                ></FaAngleDown>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1  w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {item.title}
                        </span>
                        {selected ? (
                          <span className="absolute insert-y-0 left-0 flex items-center pl-3">
                            <FaCheck
                              className="h-3 w-3"
                              aria-hidden="true"
                            ></FaCheck>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
