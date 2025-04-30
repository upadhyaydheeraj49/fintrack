import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  
  ${(props) =>
    props.variant === 'outline' &&
    css`
      background: transparent;
      border: 1px solid #4f46e5;
      color: #4f46e5;

      &:hover {
        background: #eef2ff;
      }
    `}

  ${(props) =>
    props.variant === 'danger' &&
    css`
      background: #ef4444;
      color: white;

      &:hover {
        background: #dc2626;
      }
    `}

  ${(props) =>
    (!props.variant || props.variant === 'primary') &&
    css`
      background: #4f46e5;
      color: white;

      &:hover {
        background: #4338ca;
      }
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      padding: 8px 15px;
      font-size: 0.875rem;
    `}
`;