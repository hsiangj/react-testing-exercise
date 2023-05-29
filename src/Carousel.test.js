import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it('renders without crashing', () => {
  render(<Carousel />);
})

//snapshot test
it('matches snapshot', () => {
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot();
})

it('works when you click on the left arrow', () => {
  // move backward in the carousel from second image to first image
  const { queryByTestId, getByText, queryByText } = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(leftArrow);
  
  // expect the first image to show
  const caption1 = getByText('Photo by Richard Pasquarella on Unsplash');
  const caption2 = queryByText('Photo by Pratik Patel on Unsplash');
  expect(caption1).toBeInTheDocument();
  expect(caption2).not.toBeInTheDocument();

})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
