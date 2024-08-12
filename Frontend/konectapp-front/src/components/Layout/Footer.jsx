import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f4f4f4;
  padding: 1rem;
  text-align: center;
  position: relative;
  width: 100%;
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  color: #333;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>
                © { new Date().getFullYear() } KonectApp. Todos los derechos reservados.
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;