import CountryCard from "../components/country/CountriesCard";
import ErrorComponent from "../components/errors/Error";

type country = {
  flags: {
    png: string;
    svg: string;
  };
  capital: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
};

type CountriesProps = {
  countries: country[];
};

const Home = ({
  countries,
  success,
}: CountriesProps & { success: boolean }) => {
  return (
    <>
      {success ? (
        countries?.map((country, index: number): any => (
          <CountryCard key={`${index}-${country.name.common}`} {...country} />
        ))
      ) : (
        <ErrorComponent />
      )}
    </>
  );
};

export const getStaticProps = async () => {
  /**
   * Getting specific fields of countries
   * returns the countries and the status of the request success (true/false)
   */
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,capital,name,population,region"
    );
    const countries: country[] = await response.json();
    return {
      props: {
        countries,
        success: true,
      },
    };
  } catch (error) {
    return {
      props: {
        countries: [],
        success: false,
      },
    };
  }
};

export default Home;
