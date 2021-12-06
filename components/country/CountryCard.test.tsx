import { render, screen } from "@testing-library/react";
import CountryCard from "./CountryCard";

describe("CountryCard", () => {
  it("Should render all country card", () => {
    const countryCard = {
        flags: {
            png: 'https://flagcdn.com/w320/ke.png',
            svg: 'https://flagcdn.com/w320/ke.png',
        },
        name: { common: 'common' },
        capital: ["capital"],
        population: 1000,
        region: 'region',
    };
    render(<CountryCard {...countryCard} />);
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
  });
});