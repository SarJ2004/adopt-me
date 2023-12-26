import { Component } from "react";
//carousel is a class component
// its important for class components to not have any hooks(useBreedList etc.)
// there are few things that only class components can do, like error boundaries(componentDidCatch)
// cDc is a life cycle method that is only available to class components
class Carousel extends Component {
  state = {
    active: 0,
    // by defaul, the first photo  will be the active one
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    //runs when we dont pass anything inside the Carousel component
  };

  handleIndexClick = (e) => {
    // console.log(this);
    // we should use arrow function here instead of  normal function due to scope issues
    // we need the this in handleIndexClick to be the correct this
    // An arrow function assures that because it will be the scope of where it was defined.
    // adding an event listener
    this.setState({
      active: +e.target.dataset.index,
      //   e.target is the img
      //   dataset refers to all the data- things in the dom
      //   index is of the string type, since the dom returns everything in terms of string
      //   + is a unary operator, changes string to number.
      //   Its important to convert active into a number, since active is passed in as a number in images array.
    });
  };

  //   every class component has a render function
  render() {
    // throw new Error("lol error"); to test the error boundary
    const { active } = this.state; //updation
    const { images } = this.props;
    // in class components, the props come from this.props unlike in functional components, where we pull in props from arguments
    // there are no hooks to take care of the state, so we will use the state.
    // instead of getting props via parameters and state via useState we're getting it from the instance variables this.state and this.props. This is how it works with class components. Neither one will you mutate directly.
    //this.state is the mutable state of the component (like useState). You'll use this.setState to mutate it (don't modify it directly.)
    //this.props comes from the parent component, similar to parameter given to the render functions that we pull props out of.
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
