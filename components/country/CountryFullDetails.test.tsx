import { render, screen } from "@testing-library/react";
import CountryFullDetails from "./CountryFullDetails";

describe("CountryFullDetails", () => {
  it("Should render all country card", () => {
    const countryCard = {
        independent: true,
        common: 'common',
        capital: ["capital"],
        population: 1000,
        region: 'region',
        currencies: { 'EUR': ['eur'] }
    };
    render(<CountryFullDetails {...countryCard} />);
    expect(
      screen.getByText('common')
    ).toBeInTheDocument();
    expect(
        screen.getByText('capital')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Region: region')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Population: 1,000')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Currency: EUR')
      ).toBeInTheDocument();
  });
});