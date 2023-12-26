import { Link } from "react-router-dom";
// prevents full page refresh..like on the sites of gdsc etc
// import React from "react";
// const Pet = (props) => {
//   //creating a pet component
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name), //name
//     React.createElement("h2", {}, props.animal), //type
//     React.createElement("h2", {}, props.breed), //breed
//   ]);
// };

// writing js in terms of HTML:
const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
