// fetch method that is ready to be used with reactQuery
const fetchPet = async ({ queryKey }) => {
  // see the details page to understand this
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  //   react query expects us  to return a promise
  return apiRes.json();
};
// React query makes the async parts of our codes individually testible
export default fetchPet;
