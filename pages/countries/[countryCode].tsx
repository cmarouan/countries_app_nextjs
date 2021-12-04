import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import {
  GrMapLocation,
  GrDislike,
  GrLike,
  GrStatusUnknown,
} from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { numberWithCommas } from "../../helpers/formatting";

const Button = styled.button`
  background: linear-gradient(#8d9fff, #cfceff);
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

const FullCountryDetails = styled.div`
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
`;

const Country: any = ({ params }: any) => {
  const router = useRouter();
  // console.log(params);
  const {
    country: {
      name: { common = "" } = {},
      flags = {},
      capital = "",
      population = 0,
      region = "",
      independent = false,
    } = {},
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
        <FullCountryDetails>
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
            {independent ? (
              <GrLike color="green" />
            ) : (
              <GrDislike color="green" />
            )}
          </Info>
        </FullCountryDetails>
      </CountryContainer>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const countries = await res.json();
  const paths = countries?.slice(0, 5)?.map(({ cca2 }: any) => ({
    params: { countryCode: cca2 },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params } : any) {
  const { countryCode } = params;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryCode}`
  );
  const country = await res.json();

  return {
    props: {
      params: { country: country[0] },
    },
    revalidate: false,
  };
}

export default Country;
