'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { getStore } from '../utils/API';

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [store, setStore] = useState(null);
  const [search, setSearch] = useState('');

  function handleChange() {
    setSearch(inputRef.current?.value || '');
  };
  function handleSearch() {
    if (!isNaN(Number(search))) {
    getStore(search).then((res) => {
      console.log(res.data);
      setStore(res.data.data);
    })
  }
  }
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col gap-5">
        <input id="searchField" type="text" ref={inputRef} onChange={handleChange} placeholder="Search" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm text-black focus:outline-none" />
        {search ? <p className='text-white'>search: {search}</p> : null} 
        <button  className=" px-5 py-2 rounded-full text-red-600 bg-neutral-900 border-white-500 border-2 border-white-500" onClick={handleSearch}>Søk</button>
        {store ? <div className='flex items-center justify-center bg-white rounded text-black px-4 py-2'>{store.name}</div> : null}
      </div>
    </>
  )
}
