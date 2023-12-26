async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  //   if we have multiple parameters to handle, we can give the query key as an object
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  if (!res.ok) {
    throw new Error(`Pet search not ok ${animal}, ${location}, ${breed}`);
  }
  return res.json();
}

export default fetchSearch;
