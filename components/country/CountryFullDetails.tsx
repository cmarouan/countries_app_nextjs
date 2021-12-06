import styled from "styled-components";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import {
  GrMapLocation,
  GrDislike,
  GrLike,
  GrStatusUnknown,
} from "react-icons/gr";
import { BsPeople, BsCurrencyExchange } from "react-icons/bs";
import { numberWithCommas, mapKeysToString } from "../../helpers/formatting";
import DetailsCard from "../../designSystem/cards/Default";
import Info from "../../designSystem/output/Info";

type countryDetails = {
    common: string 
    capital: Array<string>
    population: number
    region: string
    independent: boolean
    currencies: object
}

const CountryFullDetails = ({
    common,
    capital,
    population,
    region,
    independent,
    currencies
}: countryDetails) => {
    return (
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
    );
}

export default CountryFullDetails;