import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
const Details = () => {
  const [showModal, setShowModal] = useState(false);
  // pulling the id from the browser router. this id is coming from the browserrouter component in App.jsx
  const { id } = useParams();
  // in the useQuery function, we will have to give the key of what we are requesting
  const results = useQuery(["details", id], fetchPet);
  // useQuery is a really useful hook
  // synchronous hook that is fetcching from an asynchronous api
  // if you dont have, say details, 5 in your cache, run fetchPet
  // isLoading is for the first Load, isFetching is for Refetching

  const navigate = useNavigate();
  // to take us back to the home page when we click on yes
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  // we dont care about reading, we care about writing
  // we are making this context available to all els

  if (results.isError) {
    return <h1>An Error Ocuured!</h1>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    // its not good to wrap the below code inside errorBoundary  component, as it will catch errors that are inside the below code only, not in the line 20 or so
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city},{pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              {/* Notice that despite we're rendering a whole different part of the DOM we're still referencing the state in Details.jsx(set show modal, pet etc). This is the magic of Portals. You can use state but render in different parts of the DOM.  */}
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  //we should do error boundaries like this
  return (
    <ErrorBoundary>
      <Details {...props} />
      {/* DetailsErrorBounday doesnt care about props, so we can even use the spread operator to implicitly pass props to Details */}
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
