import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  // cache key of breeds, animal
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status];
  // ?. is known as the optional chaining operator
  //   if the left of the ?? is truthy, use it, else use an empty array
}
