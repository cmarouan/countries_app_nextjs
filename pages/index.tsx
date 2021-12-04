import type { NextPage } from "next";
import CountryCard from "../components/country/CountriesCard";

const Home: NextPage = ({ countries }: any) => {
  return (
    <>
      {countries?.map((country: any, index: number): any => (
        <CountryCard key={`${index}-${country.name.common}`} {...country} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,capital,name,population,region"
  );
  const countries = await response.json();

  return {
    props: {
      countries,
    },
  };
};

export default Home;
