const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  if (!animal) {
    return [];
    // if we have a blank request, then dont go to the API for that, just retuurn an empty array
  }
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  if (!apiRes.ok) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }

  return apiRes.json();
};
export default fetchBreedList;
