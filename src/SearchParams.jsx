import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  // useState returns a stateful value, and a function to update it
  //   location pieceofstate
  // const [location, setLocation] = useState("");
  // location and breed can be controlled
  //useState returns an array. give be the first thing back as location and the second thing back as setLocation
  //   the above line can be rewritten as:
  //   const locationHook = useState("");
  //   const location = locationHook[0];
  //   const setLocation = locationHook[1];
  //   all hooks start with use
  //setlocation is an updater function
  //   const location = "Seattle, WA";
  //   animal pieceofstate
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  //animal has to be controlled since its being fed into useBreedList
  //no state  by default
  // const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  // const [pets, setPets] = useState([]);
  //the usestate is going to be an empty array of pets which are to be retreived from the API

  const [adoptedPet, _] = useContext(AdoptedPetContext);
  // we can also omit the _

  // useEffect(() => {
  //   requestPets(); //function that will request for pets
  // }, []); //gave it in an array of dependencies
  // if we put animal in the array,   calls requestpets only once everytime animal(the dependency) changes, but we dont want that. we want to call requestpets only when submit action is performed

  // async function requestPets() {
  //   const res =
  //     await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}
  //   `);
  //   const json = await res.json();
  //   setPets(json.pets);
  // }
  //only updating if we want to research, not while typing.
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          //onsubmit is a react event handler
          //   e is a pseudo dom event
          e.preventDefault();
          // requestPets();
          const formData = new FormData(e.target);
          // we feed in a form and it fetches all the data from the form to us into an object
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
            // the uncontrolled part is that the loaction and breed are now not being tracked by react
            // animal on the other hand needs to be a tracked controlled react part since its pein pushed into useBreedList
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet pet-image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            // onChange={(e) => setLocation(e.target.value)}
            //onchange alerts about the changes and keeps updating the input, this is called a hook. Its a hook that gets called every time a rendered function is called
            // we cant have conditional creation of hooks. they need to be created in the same order
            id="location"
            name="location"
            // value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              updateBreed("");
              //   onBlur is only used when there is an accessibility err.
            }}
          >
            {/* an empty option */}
            <option />
            {/* //for every animal in the ANIMALS array, this should be done. the below func gets applied to every element in the array. we are using an array of strings and returning an array of react components */}
            {ANIMALS.map((animal) => (
              // if we dont use curly braces and write return, we are implicitly returning the output, we are just taking in animal and returning an option for each one of them
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            // value={breed}
            name="breed"
            // onChange={(e) => setBreed(e.target.value)}
            // onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
