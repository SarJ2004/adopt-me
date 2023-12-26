import { useState, useEffect } from "react";
//creating a custom useBreedList hook
// custom hooks are just other hooks packaged together
// so from the next time we just will have to say use BreedList
//use custom hooks when youre going to use an effect more than one times
const localCache = {}; //empty object
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  //initializing  breedlist with an empty array
  const [status, setStatus] = useState("unloaded");
  //initializing the status to unloaded

  //this effect reruns when animal changes
  //   everytime the animal goes from dog to cat, we want to request a new breedlist
  useEffect(() => {
    if (!animal) {
      //if no animal, set breedlist to be an empty array
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    // we cant make  effects async
    // if you want to do async await inside an effect, you must create the async function inside the effect
    async function requestBreedList() {
      setBreedList([]); //setting thebreed list to be empty
      setStatus("loading"); //setting the status to be loading
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      //   if we are on dogs, and we switch to cats, then if we switch again to dogs, the api wont make a request since its already cached
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]); //run this effect whenever animal changes.i.e. the dependency here is the animal variable
  //   we could have put the reqbreedlist fn outside of the useeffect, but the we would have to include it in the dependencies
  return [breedList, status];
  //   its betterif we add a status tracker to custom hooks. it helps in testing
}

// React query helps us to remove effects from our database. Its basically going to handle all the API requests for us.
// Its always better to minimize effects in our code. If there is a library that can handle that thing for us, use it!
