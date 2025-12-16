import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
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

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 72, 209, 0) 50%,
      rgba(0, 72, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: darkTheme.bg, 
              color: darkTheme.primary, 
              border: `1px solid ${darkTheme.text_secondary}`, // optional border
              borderRadius: "12px",
              padding: "12px 24px",
              textAlign: "center",
              fontWeight: "600",
            },
            success: {
              iconTheme: {
                primary: "#4caf50", // green icon for success
                secondary: darkTheme.bg,
              },
            },
            error: {
              iconTheme: {
                primary: "#f44336", // red icon for error
                secondary: darkTheme.bg,
              },
            },
          }}
        />
        <Navbar />
        <Body>
          <StyledStarCanvas />
          <div>
            <HeroSection />
            <Wrapper>
              <Skills />
              <Experience />
            </Wrapper>
            <Projects />
            <Wrapper>
              <Education />
              <Contact />
            </Wrapper>
          </div>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
