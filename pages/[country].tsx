import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import Button from "../designSystem/buttons/Default";
import CountryFullDetails from "../components/country/CountryFullDetails";
import CountryRegions from "../components/country/CountryRegions";
import ErrorComponent from "../components/errors/Error";

type regionType = Array<{
  name: {
    common: string;
  };
  capital: [string];
  flags: {
    png: string;
    svg: string;
  };
}>;

type CountryProps = {
  params: {
    regions: regionType;
    country: {
      independent: boolean;
      currencies: object;
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
      capital = "",
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
          )
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
  const paths = countries?.slice(0, 5)?.map(({ name }: any) => ({
    params: { country: name.common },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  try {
    const { country } = params;
    const res = await fetch(
      encodeURI(
        `https://restcountries.com/v3.1/name/${country}?fields=name,flags,capital,population,region,independent,currencies`
      )
    );
    const data = (await res.json()) || [];
    const region = data && data[0].region;
    var regions: regionType = [];

    if (region?.length) {
      const regionResponse = await fetch(
        `https://restcountries.com/v3.1/region/${region}?fields=flags,name,capital`
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
