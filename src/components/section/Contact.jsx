import React, { useRef, useState } from "react";
import styled from "styled-components";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import emailjs from "@emailjs/browser";
import toast from 'react-hot-toast'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 40px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  max-width: 600px;
  width: 95%;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  border-radius: 12px;
  padding: 13px 16px;
  margin-top: 2px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Contact = () => {
  const [loading, setloading] = useState(false);
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    emailjs
      .sendForm(
        "service_9nfuppa",
        "template_ff8zf9b",
        form.current,
        "0B-_wdOZwFuNMly9e"
      )
      .then(
        (result) => {
          setloading(false);
          toast.success("Your message has been sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error); // this will show the full error in console
          toast.error(
            "Failed to send message: " +
              (error.text || error.message || JSON.stringify(error))
          );
        }
      );
  };
  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Description style={{ marginBottom: "40px" }}>
          Feel free to reach out if you have a project in mind, a question, or
          just want to connect. I'm always open to discussing new ideas and
          exciting opportunities.
        </Description>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6a00" />
              <stop offset="50%" stopColor="#ee0979" />
              <stop offset="100%" stopColor="#00c6ff" />
            </linearGradient>
          </svg>

          <ContactTitle>
            Email Me{" "}
            <RocketLaunchIcon
              sx={{
                fontSize: 40,
                fill: "url(#gradient)",
              }}
            />
          </ContactTitle>
          <ContactInput placeholder="Your Email" name="user_email" required />
          <ContactInput placeholder="Your Name" name="user_name" required/>
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={5}
          ></ContactInputMessage>
          <ContactButton
            type="submit"
            value={loading ? "Sending...." : "Send"}
          />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
