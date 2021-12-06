import CountryCard from "../components/country/CountriesCard";

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

const Home = ({ countries }: CountriesProps) => {
  return (
    <>
      {countries?.map((country, index: number): any => (
        <CountryCard key={`${index}-${country.name.common}`} {...country} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,capital,name,population,region"
  );
  const countries: country[] = await response.json();

  return {
    props: {
      countries,
    },
  };
};

export default Home;
