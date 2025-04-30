import {StyledButton} from './styledComponents'

export const Button = ({ children, variant, size, ...rest }) => {
    return (
      <StyledButton variant={variant} size={size} {...rest}>
        {children}
      </StyledButton>
    );
  };