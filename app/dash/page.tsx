"use client";

import { Position } from "postcss";
import { useEffect, useState } from "react";
import { getAllStores } from "../../utils/API";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [position, setPosition] = useState({
    coords: { latitude: 0, longitude: 0 },
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position);
    });
  });
  function handleClick() {
    getAllStores({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }).then((res) => {
      setStores(res.data.data);
    });
  }

  useEffect(() => {}, []);
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <button
        className=" px-5 py-2 rounded-full text-red-600 bg-neutral-900 border-white-500 border-2 border-white-500"
        onClick={handleClick}
      >
        Get Data
      </button>
      {stores.length > 0 ? (
        <div>
          <div>Dine {stores.length} nærmeste butikker funnet.</div>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-red-600">
              <tr>
                <th className="text-left px-4 py-2 text-black">ID</th>
                <th className="text-left px-4 py-2 text-black">Group</th>
                <th className="text-left px-4 py-2 text-black">Name</th>
                <th className="text-left px-4 py-2 text-black">Address</th>
                <th className="text-left px-4 py-2 text-black">Phone</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2 border text-black">{entry.id}</td>
                  <td className="px-4 py-2 border text-black">{entry.group}</td>
                  <td className="px-4 py-2 border text-black">{entry.name}</td>
                  <td className="px-4 py-2 border text-black">
                    {entry.address}
                  </td>
                  <td className="px-4 py-2 border text-black">{entry.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
