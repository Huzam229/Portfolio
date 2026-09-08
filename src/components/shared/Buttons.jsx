import styled, { css } from "styled-components";

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  border-radius: 999px;
  padding: 13px 24px;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const PrimaryButton = styled.a`
  ${buttonBase}
  color: #04110e;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, #7ef0dc 100%);
  box-shadow: 0 8px 32px rgba(46, 230, 199, 0.22);

  &:hover {
    box-shadow: 0 12px 40px rgba(46, 230, 199, 0.32);
  }
`;

export const GhostButton = styled.a`
  ${buttonBase}
  color: ${({ theme }) => theme.text_primary};
  border-color: ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.03);

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;
