import { render, screen } from "@testing-library/react";
import CountryRegions from "./CountryRegions";

describe("CountryRegions", () => {
  it("Should render all regions", () => {
    const regions = [
        {
            name: { common: 'common1' },
            capital: ['capital1'],
            flags: { 
                png: "https://flagcdn.com/w320/va.png",
                svg: "https://flagcdn.com/w320/va.png"
            }
        },
        {
            name: { common: 'common2' },
            capital: ['capital2'],
            flags: { 
                png: "https://flagcdn.com/w320/va.png",
                svg: "https://flagcdn.com/w320/va.png"
            }
        },
    ];
    render(<CountryRegions regions={regions} />);
    expect(
      screen.getByText('Bordering countries')
    ).toBeInTheDocument();
    expect(
        screen.getByText('common2')
      ).toBeInTheDocument();
      expect(
        screen.getByText('capital2')
      ).toBeInTheDocument();

      expect(
        screen.getByText('common1')
      ).toBeInTheDocument();
      expect(
        screen.getByText('capital1')
      ).toBeInTheDocument();
  });
});