// import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";
// hello world of react apps
// app is going to be rendered out  only once
// react has a 1 way data flow. we can pass data from app to pet, but not from pet to app.
// we have information flowing from app to the pet through the use of properties
const App = () => {
  return React.createElement(
    "div",
    {
      //empty object, can put id etc in it(attributes)
    },
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        animal: "Dog",
        name: "Luna", //create a pet component with the following properties
        breed: "Havanese",
      }), //we used the pet component 3 times
      React.createElement(Pet, {
        animal: "Bird",
        name: "Pepper",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        animal: "Cat",
        name: "Doink",
        breed: "Mixed",
      }),
    ]
    // inside of the div, there is a h1, and inside of that h1, there is just a raw text-adopt me
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
// we have our app which is  being rendered out to the root
root.render(React.createElement(App));
// we are giving a component inside create element(a finction that creates more components, a reusable rubber stamp)
