import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import Button from "../designSystem/buttons/Default";
import CountryFullDetails from "../components/country/CountryFullDetails";
import CountryRegions from "../components/country/CountryRegions";
import ErrorComponent from "../components/errors/Error";
import { Country as CountryType } from "./index";
import Head from "next/head";

export type RegionType = Array<{
  name: {
    common: string;
  };
  capital: Array<string>;
  flags: {
    png: string;
    svg: string;
  };
  population: number;
}>;

type CountryProps = {
  params: {
    regions: RegionType;
    country: CountryType & {
      independent: boolean;
      currencies: object;
    };
    success: boolean;
  };
};

const CountryFlag = styled.div`
  height: 101px;
  object-fit: cover;
  object-position: center;
  border-radius: 50px;
  margin: 0 auto;
`;

const CountryContainer = styled.div`
  margin: 1.5rem auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Country: any = ({ params }: CountryProps) => {
  const router = useRouter();
  const {
    country: {
      name: { common = "" } = {},
      flags = { png: "", svg: "" },
      capital = [""],
      population = 0,
      region = "",
      independent = false,
      currencies = {},
    } = {},
    regions,
    success,
  } = params || {};

  return (
    <>
      <Head>
        <title>{common}</title>
      </Head>
      {success ? (
        <>
          <Button onClick={() => router.push(`/`)}>Go back</Button>
          <CountryContainer>
            <CountryFlag>
              <Image
                src={flags.png || flags.svg}
                alt={`${common}-flag`}
                height="100%"
                width="100%"
              />
            </CountryFlag>
            <CountryFullDetails
              capital={capital}
              population={population}
              region={region}
              independent={independent}
              currencies={currencies}
              common={common}
            />
            <CountryRegions regions={regions} />
          </CountryContainer>
        </>
      ) : (
        <ErrorComponent />
      )}
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
  const countries = await res.json();
  /**
   * slice used to only generate at the build time the first 5 countries pages
   */
  const paths = countries?.slice(0, 5)?.map(({ name }: any) => ({
    params: { country: name.common },
  }));
  /*
   * Since we generate only the first 5 countries, fallback should equal true in order to generate the none generated pages
   */
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  try {
    const { country } = params;
    // in order to avoid some bad requets urls, encodeURI used to the problem of the special characters in some countries name
    const res = await fetch(
      encodeURI(
        `https://restcountries.com/v3.1/name/${country}?fields=name,flags,capital,population,region,independent,currencies`
      )
    );
    const data = (await res.json()) || [];
    const region = data && data[0].region;
    var regions: RegionType = [];

    if (region?.length) {
      const regionResponse = await fetch(
        `https://restcountries.com/v3.1/region/${region}?fields=flags,name,capital,population`
      );
      regions = await regionResponse.json();
      regions = regions.filter((reg) => reg.name.common !== country);
    }

    return {
      props: {
        params: {
          country: data[0] || {},
          regions,
          success: true,
        },
      },
      // No need to revalidate since countries details are stable
      revalidate: false,
    };
  } catch (error) {
    return {
      props: {
        params: {
          country: {},
          regions: [],
          success: false,
        },
      },
      revalidate: false,
    };
  }
}

export default Country;
