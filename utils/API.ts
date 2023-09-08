import axios from "axios";

const api = "https://kassal.app/api/v1/";
const token = "QCciheQEZoCuSKjNXGSaIZ2vCdgyDKefxOzJARyc";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export async function getAllStores(position: { lng: number; lat: number }) {
  if (position.lat != 0 && position.lng != 0) {
    let res = await axios.get(api + "physical-stores", {
      params: { size: 10, lat: position.lat, lng: position.lng },
    });
    console.log(res);
    return res;
  } else {
    let res = await axios.get(api + "physical-stores", {
      params: { size: 10 },
    });
    console.log(res);
    return res;
  }
}
export async function getStore(id: string) {
  let res = await axios.get(api + "physical-stores/" + id);
  console.log(res);
  return res;
}
export async function getProducts(search: string) {
  let res = await axios.get(api + "products", {
    params: { size: 100, search: search },
  });
  console.log(res);
  return res;
}
export async function getPrices(id: number) {
  let res = await axios.get(api + "products/id/" + id, { params: { id: id } });
  console.log(res);
  return res;
}
