//our SearchParams component is getting pretty big, which is against the react way. in general we want smallish components which do one thing

import Pet from "./Pet";
const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found!</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              //{...pet}->spread operator
              //we are saying that we have a bag of properties over pet. we want to take and spread them out
              // which is same as what we have done below. but we shouldnt use it...its very implicit...its saying that just pass everything along..the question arises do we need everything? ..here, yes. but there can be cases where we dont need someproperties
              //key = {pet.id}
              // this also works
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};
export default Results;
// this is a single page application which has 2 routes the search opages and details page
