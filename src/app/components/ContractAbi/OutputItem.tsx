/**
 *
 * OutputItem Component
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import imgArray from 'images/two_array.png';
import { Link } from './../Link';
interface OutputParamsProps {
  output: object;
  value?: any;
}
type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof OutputParamsProps>;
export declare type Props = OutputParamsProps & NativeAttrs;

const OutputItem = ({ output, value }: Props) => {
  let valueComp;
  switch (output['type']) {
    case 'address':
      valueComp = (
        <Link href={`/address/${value}`} className="value">
          {value}
        </Link>
      );
      break;

    default:
      valueComp = (
        <span className="value">{`${
          value !== false ? value.toString() : 'false'
        }`}</span>
      );
      break;
  }
  return (
    <>
      <Container>
        <img src={imgArray} alt="response params" className="icon" />
        <span className="name text">{output['name']}</span>
        <span className="type text">{`(${output['type']})`}</span>
        {valueComp}
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7px;
  margin: 8px 0;
  .icon {
    display: inline-block;
    width: 10px;
    margin-top: 2px;
  }
  .text {
    color: #97a3b4;
  }
  .name {
    margin-left: 4px;
  }
  .type {
    font-style: italic;
  }
  .value {
    margin-left: 4px;
  }
`;
export default OutputItem;
