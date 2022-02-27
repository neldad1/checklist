import styled from 'styled-components';

const MainDiv = styled.div`
  background-color: #ff8a80;
  text-align: left;
  padding: 30px;
  margin: 10% auto;
  height: 75vh;

  width: 50vw;
  font-size: 1.25em;
  overflow-y: scroll;
  // reset and fill the entire screen
  @media only screen and (max-width: 768px) {
    margin: 0;
    height: 100vh;
    width: 100vw;
  }
`;

const P = styled.p`
  margin: 0.5em 0.25em;
  height: 2em;
`;

const FlexDiv = styled.div`
  font-size: inherit;
  font-family: inherit;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em 0.1em;
`;

const ActionButton = styled.button`
  background: #c85a54;
  border: 0.2em solid #c85a54;
  color: #fefefe;
  margin: 0 0.25em;
  width: 50%;
  font-size: inherit;
  font-family: inherit;
  box-sizing: content-box;
`;

const H1 = styled.h1`
  text-align: center;
`;

interface HideShowDivProps {
  showAdd: boolean;
}
const HideShowDiv = styled.div`
  background-color: #ffbcaf;
  height: 50px;
  margin: 0.1em;
  padding: 0 0.5em;
  display: ${(props: HideShowDivProps) => (props.showAdd ? `block` : `none`)};
  vertical-align: middle;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #fefefe;
  width: 2em;
  height: 2em;
  box-sizing: content-box;
  margin: 0.25em 0.1em;
  padding: 0;
`;

const IconSpan = styled.span`
  margin: 0.1em 0;
  color: #c85a54;
  font-size: 2em;
`;

export {
  MainDiv,
  P,
  FlexDiv,
  HideShowDiv,
  H1,
  ActionButton,
  IconButton,
  IconSpan,
};
