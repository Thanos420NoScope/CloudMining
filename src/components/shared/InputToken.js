import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { ReactComponent as ArrowDown } from '../../assets/images/shared/arrow-down.svg';

const Container = styled.div`
  cursor: pointer;
  position: absolute;

  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 19%;
  right: 10px;
  max-height: 22px;
  padding: 15px !important;
  border-radius: 2rem;
  background: #e6e6e6;
  gap: 5px;

  :hover {
    background: #d6d6d6;
  }
  :active {
    background: #b1b1b1;
  }

  min-width: ${({ theme: { inputTokenWidth } }) => `${inputTokenWidth}px`};

  svg:first-child {
    margin-right: 8px;
  }

  span {
    font-size: 16px;
  }
`;

const InputToken = ({ icon, code, onClick }) => {
  return (
    <Container onClick={onClick}>

        {icon}

      <span>{code}</span>
      <ArrowDown />
    </Container>
  );
};

InputToken.propTypes = {
  icon: PropTypes.element,
  code: PropTypes.string
};

InputToken.defaultProps = {
  icon: null,
  code: ''
};

export default InputToken;
