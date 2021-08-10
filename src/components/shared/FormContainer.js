import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { ReactComponent as CloseIcon } from '../../assets/images/shared/cross.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 15px 15px;
  max-width: 385px;
  width: 100%;
  border-radius: 30px;
  background-color: white;
`;

const Title = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const FormContainer = ({ title, containerStyle, titleStyle, children, onClose }) => {
  return (
    <Container style={containerStyle}>
      {onClose && <CloseIcon style={{ cursor: 'pointer', position: 'absolute', top: 20, right: 25, textTransform: "capitalize",}} onClick={onClose} />}
      {title && <Title style={titleStyle}>{title}</Title>}
      {children}
    </Container>
  );
};

FormContainer.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func
};

FormContainer.defaultProps = {
  title: '',
  onClose: null
};

export default FormContainer;
