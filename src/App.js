import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import TechMarquee from "./components/TechMarquee";
import { BrowserRouter } from "react-router-dom";
import { HeroSection } from "./components/section/HeroSection";
import Skills from "./components/section/Skills";
import Experience from "./components/section/Experience";
import Education from "./components/section/Education";
import StyledStarCanvas from "./components/Canvas/Stars";
import Projects from "./components/section/Projects";
import Contact from "./components/section/Contact";
import { Toaster } from "react-hot-toast";

const Body = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const AmbientGlow = styled.div`
  position: relative;
  padding-bottom: 40px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
  }

  &::before {
    width: min(520px, 80vw);
    height: min(520px, 80vw);
    top: 8%;
    left: -8%;
    background: rgba(46, 230, 199, 0.08);
  }

  &::after {
    width: min(460px, 70vw);
    height: min(460px, 70vw);
    right: -6%;
    bottom: 4%;
    background: rgba(232, 192, 122, 0.06);
  }
`;

const Grain = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 8;
  opacity: 0.035;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: darkTheme.card,
              color: darkTheme.text_primary,
              border: `1px solid ${darkTheme.border}`,
              borderRadius: "14px",
              padding: "12px 20px",
              textAlign: "center",
              fontWeight: "600",
              fontFamily: "Outfit, sans-serif",
            },
            success: {
              iconTheme: {
                primary: darkTheme.primary,
                secondary: darkTheme.bg,
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: darkTheme.bg,
              },
            },
          }}
        />
        <ScrollProgress />
        <Navbar />
        <Body>
          <StyledStarCanvas />
          <Grain />
          <HeroSection />
          <TechMarquee />
          <AmbientGlow>
            <Skills />
            <Experience />
          </AmbientGlow>
          <Projects />
          <AmbientGlow>
            <Education />
            <Contact />
          </AmbientGlow>
          <Footer />
          <ScrollToTop />
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
