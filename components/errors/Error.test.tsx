import { render, screen } from "@testing-library/react";
import ErrorComponent from "./Error";

describe("App", () => {
  it("renders without crashing", () => {
    const error = "No country found OR and error faced, please try later";
    render(<ErrorComponent />);
    expect(
      screen.getByText(error)
    ).toBeInTheDocument();
  });
});