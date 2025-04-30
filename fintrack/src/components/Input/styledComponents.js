import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;