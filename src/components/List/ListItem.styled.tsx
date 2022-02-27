import styled from 'styled-components';

const FlexDiv = styled.div`
  background-color: #ffbcaf;
  display: flex;
  justify-content: space-between;
  margin: 0.1em;
  padding: 0 0.5em;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin: 0.25em 0.1em;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const CheckBox = styled.input`
  background: transparent;
  width: 2em;
  height: 2em;
  vertical-align: middle;
  margin-right: 0.5em;
  text-align: center;
`;

const Input = styled.input`
  background: transparent;
  appearance: none;
  border: none;
  outline: none;
  vertical-align: middle;
  width: 70%;
  font-weight: bold;
  flex: 1;
  margin-right: 0.5em;
`;

interface SpanProps {
  isChecked: boolean;
}
const Span = styled.span`
  margin-right: 0.5em;
  vertical-align: middle;
  width: 70%;
  word-wrap: break-word;
  flex: 1;
  text-decoration: ${(props: SpanProps) =>
    props.isChecked ? `line-through;color:gray;` : `none`};
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #fefefe;
  width: 2em;
  height: 2em;
  box-sizing: content-box;
  padding: 0;
  vertical-align: middle;
`;

const IconSpan = styled.span`
  color: #c85a54;
  font-size: 2em;
  vertical-align: middle;
  display: none;
  @media only screen and (min-width: 768px) {
    ${FlexDiv}:hover & {
      display: inline-block;
    }
  }
  @media only screen and (max-width: 768px) {
    ${FlexDiv}:focus-within & {
      display: inline-block;
    }
  }
`;

export { FlexDiv, Form, CheckBox, Input, Span, IconButton, IconSpan };
