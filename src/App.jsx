import { useState } from "react";
import { createRoot } from "react-dom/client"; //since  we only need the create root component of the ReactDOM Module
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // how long do  you want me to cache things
      // the basic thinking is "when you fetcch something, dont refetch it"
      // we are basiccally saying never invalidate, but in few cases, we would want to refetch the data every few minutes or so
      cacheTime: Infinity,
    },
  },
});
// React query cache is stored in memory

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      {/* wrapping our app in a  queryclient */}
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          {/* we should avoid using context until we absolutely have to */}
          {/* its making the adoptedPet available to any consumer of AdoptedPetContext inside of it, so now details has it available, searchparams has it available, and they can both use it whenever theyy want. provider is like a wormhole, i.e i can dump stuff into it, and I can pull them back whenver I want to. we are putting whole hook into it(value+method to update it(array of 2 things)), but it ccan be anything, an object, a number. It doestn care what type is going into it. Its just a method of transportation*/}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>

          <Routes>
            {/* What we want to do now is to add a second page to our application: a Details page where you can out more about each animal. */}
            <Route path="/details/:id" element={<Details />} />
            {/* id is a variable in here */}
            {/* change the path to this and render a component named Details */}
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
