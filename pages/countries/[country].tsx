import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import Image from "next/image";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import {
  GrMapLocation,
  GrDislike,
  GrLike,
  GrStatusUnknown,
} from "react-icons/gr";
import { BsPeople, BsCurrencyExchange } from "react-icons/bs";
import { numberWithCommas, mapKeysToString } from "../../helpers/formatting";

const Button = styled.button`
  background: #5db6e3;
  width: 30%;
  height: 30px;
  border-radius: 5px;
  color: #f7f8ff;
  font-weight: 600;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

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

const DetailsCard = styled.div`
  width: 100%;
  margin-top: 1rem;
  background-color: white;
  margin: 1rem auto;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  box-shadow: 2px 2px 2px #dae4ff;
`;

const Info = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5rem;
  margin-top: 0.3rem;
`;

const SmallInfo = styled.div`
  font-size: 0.7rem;
`;

const RegionCountries = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const RegionCountry = styled.div`
  width: 100%;
`;

const Country: any = ({ params }: any) => {
  const router = useRouter();
  const {
    country: {
      name: { common = "" } = {},
      flags = {},
      capital = "",
      population = 0,
      region = "",
      independent = false,
      currencies = {},
    } = {},
    regions,
  } = params || {};

  return (
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
        <DetailsCard>
          <Info>
            <GrMapLocation /> {common}
          </Info>
          <Info>
            <FaCity /> {capital ? capital[0] : "-"}
          </Info>
          <Info>
            <BsPeople /> Population: {numberWithCommas(population)}
          </Info>
          <Info>
            <FaGlobeAmericas /> Region: {region}
          </Info>
          <Info>
            <GrStatusUnknown /> Independent:{" "}
            {independent ? <GrLike /> : <GrDislike />}
          </Info>
          <Info>
            <BsCurrencyExchange /> Currency: {mapKeysToString(currencies)}
          </Info>
        </DetailsCard>
        <DetailsCard>
          <Info>Bordering countries</Info>
          <RegionCountries>
            {regions?.map((reg: any, index: number) => (
              <RegionCountry
                key={`${reg.name.common}-${index}`}
                onClick={() => router.push(`/countries/${reg.name.common}`)}
              >
                <div style={{ margin: "0 auto" }}>
                  <Image
                    src={reg.flags.png || reg.flags.svg}
                    alt={`${reg.name.common}-flag`}
                    height="100%"
                    width="100%"
                  />
                  <SmallInfo>
                    <GrMapLocation /> {reg.name.common}
                  </SmallInfo>
                  <SmallInfo>
                    <FaCity /> {reg.capital ? reg.capital[0] : "-"}
                  </SmallInfo>
                </div>
              </RegionCountry>
            ))}
          </RegionCountries>
        </DetailsCard>
      </CountryContainer>
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
  const { country } = params;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,flags,capital,population,region,independent,currencies`
  );
  const data = (await res.json()) || [];
  const region = data && data[0].region;
  var regions: any[] = [];

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
      },
    },
    revalidate: false,
  };
}

export default Country;
