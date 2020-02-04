import React from 'react'
import styled, { css } from 'styled-components'

interface SectionProps {
  color?: 'seafoam'
}

export const Section = styled.section<SectionProps>`
  padding: 3rem 0;

  @media (min-width: 800px) {
    padding: 5rem 0;
  }

  ${props =>
    props.color === 'seafoam' &&
    css`
      background-color: var(--color-seafoam);
    `};
`
