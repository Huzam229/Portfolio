import styled, { useTheme } from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";
import { useState } from "react";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px 0 8px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBarLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 18px;
  @media (max-width: 768px) {
    margin-left: -40px; 
  }
`;

const NavItem = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const GitHubProfile = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 12px 40px 24px 40px;
  list-style: none;
  background: ${({ theme }) => theme.card_light + "99"};
  transform: ${({ $openMenuIcon }) =>
    $openMenuIcon ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ $openMenuIcon }) => ($openMenuIcon ? 1 : 0)};
  z-index: ${({ $openMenuIcon }) => ($openMenuIcon ? 1000 : -1)};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const LogoImage = styled.img`
  width: 140px;
  height: auto;
`;

const Navbar = () => {
  const [openMenuIcon, setOpenMenuIcon] = useState(false);

  const theme = useTheme();
  return (
    <Nav>
      <NavbarContainer>
        <NavBarLogo to="/">
          <LogoImage src="/logo.png" />
        </NavBarLogo>
        <MobileIcon onClick={() => setOpenMenuIcon(!openMenuIcon)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        {/* DeskTop Menu */}

        <NavItem>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
          <NavLink href="#Contact">Contact</NavLink>
        </NavItem>

        {/* Mobile Menu */}

        <MobileMenu $openMenuIcon={openMenuIcon}>
          <NavLink href="#Skills" onClick={() => setOpenMenuIcon(false)}>
            Skills
          </NavLink>
          <NavLink href="#Experience" onClick={() => setOpenMenuIcon(false)}>
            Experience
          </NavLink>
          <NavLink href="#Projects" onClick={() => setOpenMenuIcon(false)}>
            Projects
          </NavLink>
          <NavLink href="#Education" onClick={() => setOpenMenuIcon(false)}>
            Education
          </NavLink>
          <NavLink href="#Contact" onClick={() => setOpenMenuIcon(false)}>
            Contact
          </NavLink>{" "}
          <GitHubProfile
            href={Bio.github}
            target="_blank"
            style={{
              background: theme.primary,
              color: theme.text_primary,
            }}
          >
            GitHub Profile
          </GitHubProfile>
        </MobileMenu>

        <ButtonContainer>
          <GitHubProfile href={Bio.github} target="_blank">
            GitHub Profile
          </GitHubProfile>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
