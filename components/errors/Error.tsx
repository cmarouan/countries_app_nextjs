import styled from 'styled-components';

const Error = styled.div`
  background-color: #ffe8e8;
  padding: 10rem;
  text-align: center;
  font-size: 1.5rem;
  color: red;
`;

const ErrorComponent = () => {
  return <Error>No country found OR and error faced, please try later</Error>;
}

export default ErrorComponent;