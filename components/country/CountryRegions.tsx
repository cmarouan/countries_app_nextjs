import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaCity } from "react-icons/fa";
import {
  GrMapLocation
} from "react-icons/gr";
import DetailsCard from "../../designSystem/cards/Default";
import Info from "../../designSystem/output/Info";

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
  cursor: pointer;
`;

type countryDetails = {
    regions: Array<{
      name: {
        common: string
      },
      capital: Array<string>,
      flags: {
        png: string
        svg: string
      },
    }>
}

const CountryRegions = ({
    regions
} : countryDetails) => {
    const router = useRouter();

    return (<DetailsCard>
        <Info>Bordering countries</Info>
        <RegionCountries>
          {regions?.map((reg: any, index: number) => (
            <RegionCountry
              key={`${reg.name.common}-${index}`}
              onClick={() => router.push(`/${reg.name.common}`)}
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
      </DetailsCard>);
};

export default CountryRegions;