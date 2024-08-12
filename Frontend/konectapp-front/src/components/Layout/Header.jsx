import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@mui/material';

const HeaderContainer = styled.header`
  background-color: #1a73e8;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>KonectApp</Logo>
        { isAuthenticated && (
          <NavLinks>
            <StyledLink to="/">Inicio</StyledLink>
            <StyledLink to="/empleados">Empleados</StyledLink>
            <StyledLink to="/solicitudes">Solicitudes</StyledLink>
            <Button onClick={ handleLogout } color="inherit">Cerrar Sesión</Button>
          </NavLinks>
        ) }
      </Nav>
    </HeaderContainer>
  );
};

export default Header;