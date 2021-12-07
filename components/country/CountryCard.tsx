import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { numberWithCommas } from "../../helpers/formatting";
import Divider from "../../designSystem/divider/Index";
import Button from "../../designSystem/buttons/Default";
import Card from "../../designSystem/cards/Default";
import { Country } from "../../pages";

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


const CountryDetails = styled.div`
  margin-top: 1rem;
`;

const CardFooter = styled.div`
  margin: 1rem 0 0;
  display: flex;
  justify-content: right;
`;

const CountryCard = ({
    flags,
    name: { common },
    capital,
    population,
    region,
  } : Country) => {
    const router = useRouter();
  
    return (
      <Card>
        <CardDescription>
          <CountryFlag>
            <div>
              <Image
                src={flags.png || flags.svg}
                alt={`${common}-flag`}
                height="100%"
                width="100%"
              />
            </div>
          </CountryFlag>
          <CountryInfo>
            <div>
              <GrMapLocation /> {common}
            </div>
            <div>
              <FaCity /> {capital ? capital[0] : "-"}
            </div>
            <div>
              <FaGlobeAmericas /> Region: {region}
            </div>
          </CountryInfo>
        </CardDescription>
        <Divider />
        <CountryDetails>
          <div>
            <BsPeople /> Population: {numberWithCommas(population)}
          </div>
        </CountryDetails>
        <CardFooter>
          <Button onClick={() => router.push(`/${common}`)}>
            More
          </Button>
        </CardFooter>
      </Card>
    );
  };

 export default CountryCard;