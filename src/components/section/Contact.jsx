import { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Bio } from "../../data/constants";
import { Section, SectionHeader, SectionInner } from "../shared/Section";

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 24px;
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.aside`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 22px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const InfoTitle = styled.h3`
  font-family: "Syne", sans-serif;
  font-size: 28px;
  line-height: 1.2;
  margin-bottom: 12px;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin-bottom: 18px;
`;

const Meta = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 24px;
`;

const Socials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  padding: 12px 14px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 28px;
  border-radius: 22px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContactInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.border};
  outline: none;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 14px;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(46, 230, 199, 0.12);
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.border};
  outline: none;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 14px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(46, 230, 199, 0.12);
  }
`;

const ContactButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 999px;
  padding: 13px 16px;
  margin-top: 4px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, #7ef0dc 100%);
  color: #04110e;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_9nfuppa",
        "template_ff8zf9b",
        form.current,
        "0B-_wdOZwFuNMly9e"
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Your message has been sent successfully!");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          toast.error(
            "Failed to send message: " +
              (error.text || error.message || "Please try again.")
          );
        }
      );
  };

  return (
    <Section id="Contact">
      <SectionInner>
        <SectionHeader
          eyebrow="Collaborate"
          title="Contact"
          description="Have a role, a product idea, or a question? I am always open to thoughtful conversations."
        />
        <Layout>
          <InfoCard>
            <div>
              <InfoTitle>Let&apos;s build something worth shipping.</InfoTitle>
              <InfoText>
                I work across web and Android — from polished interfaces to
                backend systems. Reach out if you want someone who can own the
                full path from idea to launch.
              </InfoText>
              <Meta>Usually replies within 24 hours.</Meta>
            </div>
            <Socials>
              <SocialLink href={Bio.github} target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </SocialLink>
              <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </SocialLink>
            </Socials>
          </InfoCard>
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <Field>
              Your name
              <ContactInput placeholder="Jane Doe" name="user_name" required />
            </Field>
            <Field>
              Email
              <ContactInput
                type="email"
                placeholder="jane@email.com"
                name="user_email"
                required
              />
            </Field>
            <Field>
              Subject
              <ContactInput placeholder="Project inquiry" name="subject" required />
            </Field>
            <Field>
              Message
              <ContactInputMessage
                placeholder="Tell me a bit about what you have in mind..."
                name="message"
                rows={5}
                required
              />
            </Field>
            <ContactButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </ContactButton>
          </ContactForm>
        </Layout>
      </SectionInner>
    </Section>
  );
};

export default Contact;
