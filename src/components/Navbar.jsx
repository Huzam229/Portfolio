import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Bio } from "../data/constants";
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#Skills", label: "Skills" },
  { href: "#Experience", label: "Experience" },
  { href: "#Projects", label: "Projects" },
  { href: "#Education", label: "Education" },
  { href: "#Contact", label: "Contact" },
];

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  padding: 14px 20px 0;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  height: 68px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.border : "transparent")};
  border-radius: 18px;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.glass : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(18px)" : "none")};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 10px 40px rgba(0, 0, 0, 0.28)" : "none"};
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
`;

const NavBarLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  width: 118px;
  height: auto;
`;

const NavItem = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;

  @media (max-width: 980px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.text_secondary};
  background: ${({ $active }) =>
    $active ? "rgba(46, 230, 199, 0.1)" : "transparent"};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 999px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: rgba(255, 255, 255, 0.04);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 980px) {
    display: none;
  }
`;

const IconLink = styled.a`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const GitHubProfile = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }
`;

const MobileIcon = styled.button`
  display: none;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  padding: 6px;

  @media (max-width: 980px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 980px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    top: 90px;
    left: 20px;
    right: 20px;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    background: ${({ theme }) => theme.glass};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 18px;
    backdrop-filter: blur(18px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
    z-index: 30;
  }
`;

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    const onKey = (event) => {
      if (event.key === "Escape") setOpenMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const scrollHome = (event) => {
    event.preventDefault();
    setOpenMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Nav>
      <NavbarContainer $scrolled={scrolled}>
        <NavBarLogo to="/" onClick={scrollHome}>
          <LogoImage src="/logo.png" alt="Muhammad Khuzama" />
        </NavBarLogo>

        <MobileIcon
          aria-label={openMenu ? "Close menu" : "Open menu"}
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? <CloseRounded /> : <MenuRounded />}
        </MobileIcon>

        <NavItem>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} $active={active === link.href.slice(1)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </NavItem>

        <MobileMenu $open={openMenu}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              $active={active === link.href.slice(1)}
              onClick={() => setOpenMenu(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <GitHubProfile href={Bio.github} target="_blank" rel="noreferrer">
            <FaGithub />
            GitHub
          </GitHubProfile>
        </MobileMenu>

        <Actions>
          <IconLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </IconLink>
          <GitHubProfile href={Bio.github} target="_blank" rel="noreferrer">
            <FaGithub />
            GitHub
          </GitHubProfile>
        </Actions>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
