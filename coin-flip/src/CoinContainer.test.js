import {render, fireEvent} from "@testing-library/react";
import CoinContainer from "./CoinContainer";

beforeEach(function() {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75);
});

it('renders without crashing', () => {
  render(<CoinContainer />);
});

it('matches snapshot', () => {
  const {asFragment} = render(<CoinContainer />);
  expect(asFragment()).toMatchSnapshot();
});

it(`doesn't show a coin on page load`, () => {
  const {queryByAltText}= render(<CoinContainer />);
  
  expect(queryByAltText('head')).toBeNull();
  expect(queryByAltText('tail')).toBeNull();
});

it('counts correctly: head count', () => {
  const {getByText, queryByAltText, debug}= render(<CoinContainer />);
  const button = getByText('Flip!');
  // make first flip heads
  fireEvent.click(button);
  expect(queryByAltText('head')).toBeInTheDocument();
  expect(queryByAltText('tail')).not.toBeInTheDocument();
  expect(getByText('Out of 1 flips, there have been 1 heads and 0 tails.'));
});

it('counts correctly: tail count', () => {
  const {getByText, queryByAltText, debug}= render(<CoinContainer />);
  const button = getByText('Flip!');
  // make second flip heads
  fireEvent.click(button);
  fireEvent.click(button);
  expect(queryByAltText('head')).not.toBeInTheDocument();
  expect(queryByAltText('tail')).toBeInTheDocument();
  expect(getByText('Out of 2 flips, there have been 1 heads and 1 tails.'));
});






afterEach(function() {
  Math.random.mockRestore();
});