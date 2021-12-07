import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaCity } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import {
  GrMapLocation
} from "react-icons/gr";
import DetailsCard from "../../designSystem/cards/Default";
import Info from "../../designSystem/output/Info";
import { numberWithCommas } from "../../helpers/formatting";
import { RegionType } from "../../pages/[country]";

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
    regions: RegionType
}

const CountryRegions = ({
    regions
} : countryDetails) => {
    const router = useRouter();

    return (<DetailsCard>
        <h2><Info>Bordering countries</Info></h2>
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
                <SmallInfo>
                  <BsPeople /> {numberWithCommas(reg.population)}
                </SmallInfo>
              </div>
            </RegionCountry>
          ))}
        </RegionCountries>
      </DetailsCard>);
};

export default CountryRegions;