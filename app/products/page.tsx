"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getProducts, getPrices} from "../../utils/API";
import { Key } from "readline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [products, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [price, setPrices] = useState({price: 0, store: ""});
  function handleChange() {
    setSearch(inputRef.current?.value || "");
  }
  function handleSearch() {
    getProducts(search).then((res) => {
      console.log(res.data);
      setProduct(res.data.data);
    });
  }
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  function handlePrices() {

    getPrices(Number(selectedProduct)).then((res) => {
        console.log(res.data);
        setPrices({price: res.data.data.current_price, store: res.data.data.store.name});
        });
}
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col gap-5 overflow-y-auto max-h-90vh">
        <input
          id="searchField"
          type="text"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleEnter}
          placeholder="Search"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm text-black focus:outline-none"
        />
        {search ? <p className="text-white">search: {search}</p> : null}
        <button
          className=" px-5 py-2 rounded-full text-red-600 bg-neutral-900 border-white-500 border-2 border-white-500"
          onClick={handleSearch}
        >
          Søk
        </button>
        {products.length > 0 ? (
          <select
            name="select-product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="p-4 min-w-[200px] bg-white text-black rounded"
          >
            <option value="" disabled>
              Select product
            </option>
            {products.map((entry, index) => (
              <option key={index} value={entry.id}>
                {index}.{entry.name}&nbsp;.-{entry.current_price}&nbsp;kr
              </option>
            ))}
          </select>
        ) : null}
        {selectedProduct ? (
          <div className="flex flex-gap-5 flex-col gap-5">
            <button className=" px-5 py-2 rounded-full text-red-600 bg-neutral-900 border-white-500 border-2 border-white-500" onClick={handlePrices}>
              Find store
            </button>
            {price.store != '' ? (
              <table className="w-full min-h-full px-20 py-10 bg-white text-black ">
                <thead className="bg-gray-200 border-2 border-b-black  ">
                  <tr><td>Butikk</td><td>pris</td></tr>
                </thead>
                <tbody className="border-2 rounded">
                        <tr>
                            <td>{price.store}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>{price.price}&nbsp;-.kr</td>
                        </tr>
                    </tbody>{" "}
              </table>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
