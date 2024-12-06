import React from 'react';
import styled from 'styled-components';

interface CardContainerProps {
  shadow?: string;
  color?: string;
  border?: string;
}

const CardContainer = styled.a<CardContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 14rem;
  min-height: 14rem;
  padding-top: 1.5rem;
  box-shadow: 0 3px 8px ${(props) => props.shadow || 'rgb(0, 85, 212, .4)'};
  border-radius: 10px;
  overflow: hidden;
  border: ${(props) => props.border || '1px solid #ccc'};
`;

const CardContainerDiv = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  min-width: 13rem;
  min-height: 14rem;
  padding-top: 1.5rem;
  gap: 4rem;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: ${(props) => props.border || '1px solid #ccc'};
`;

const Logo = styled.img`
  width: 82px;
  height: 82px;
  margin-right: 16px;
`;

const Text = styled.p<CardContainerProps>`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: white;
  background-color: ${(props) => props.color || 'rgb(0, 85, 212, .4)'};
  font-weight: 500;
`;

interface CardProps {
  logo?: string;
  text?: string;
  href?: string;
  color?: string;
  shadow?: string;
  border?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ logo, text, href, color, shadow, border, children }) => (
  <>
    {href ? (
      <CardContainer href={href} target="_main" shadow={shadow} border={border}>
        {logo && <Logo src={logo} alt="Logo" />}
        {children && <Text color={color}>{children}</Text>}
      </CardContainer>
    ) : (
      <CardContainerDiv shadow={shadow} border={border} className='border-[1px] border-solid border-black '>
        {text && <p className="font-bold text-2xl text-slate-800">{text}</p>}
        {children && <Text color={color}>{children}</Text>}
      </CardContainerDiv>
    )}
  </>
);

export default Card;
