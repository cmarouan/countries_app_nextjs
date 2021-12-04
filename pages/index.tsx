import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { numberWithCommas } from "../helpers/formatting";

const Card = styled.div`
  background-color: white;
  margin: 1rem auto;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 600px;
  box-shadow: 2px 2px 2px #dae4ff;
`;

const CardDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CountryFlag = styled.div`
  height: 101px;
  object-fit: cover;
  object-position: center;
  border-radius: 50px;
`;

const CountryInfo = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  color: #5a5a5a;
  justify-content: space-between;
  font-weight: 600;
  height: 50px;

  @media (max-width: 468px) {
    width: 65%;
  }

  @media (max-width: 390px) {
    width: 60%;
  }

  @media (max-width: 390px) {
    width: 60%;
  }
`;

const Divider = styled.div`
  margin: 7px 0;
  height: 1px;
  background-color: #eaeaea;
`;

const CountryDetails = styled.div`
  margin-top: 1rem;
`;

const CardFooter = styled.div`
  margin: 1rem 0 0;
  display: flex;
  justify-content: right;
`;

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

const CountryCard = ({
  flags,
  name: { common },
  capital,
  population,
  region,
  cca2,
}: any) => {
  const router = useRouter();

  return (
    <Card>
      <CardDescription>
        <CountryFlag>
          <Image
            src={flags.png || flags.svg}
            alt={`${common}-flag`}
            height="100%"
            width="100%"
          />
        </CountryFlag>
        <CountryInfo>
          <div>
            <GrMapLocation /> {common}
          </div>
          <div>
            <FaCity /> {capital ? capital[0] : "-"}
          </div>
        </CountryInfo>
      </CardDescription>
      <Divider />
      <CountryDetails>
        <div>
          <BsPeople /> Population: {numberWithCommas(population)}
        </div>
        <div>
          <FaGlobeAmericas /> Region: {region}
        </div>
      </CountryDetails>
      <CardFooter>
        <Button onClick={() => router.push(`/countries/${common}`)}>More</Button>
      </CardFooter>
    </Card>
  );
};

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
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  return {
    props: {
      countries,
    },
  };
};

export default Home;
