import { API } from "../Utilities/Api";

export const fetchData = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
};

export default fetchData;
