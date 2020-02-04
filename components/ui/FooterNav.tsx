import React from 'react'
import styled from 'styled-components'
import { Button } from '.'
import Link from 'next/link'
import data from '../../content/navigation.json'

export const FooterNav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
      {data &&
        data.map(({ id, href, label }) => {
          return (
            <li key={id}>
              <Link href={href} passHref>
                <a>{label}</a>
              </Link>
            </li>
          )
        })}
    </ul>
  )
})`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    margin: 0;
    display: block;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  a {
    font-size: 1.5rem;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
    cursor: pointer;
    font-family: var(--font-tuner);
    font-weight: regular;
    font-style: normal;
    opacity: 1;
    transition: transform 180ms ease-out;
    display: block;
    line-height: 1;

    &:hover,
    &:focus {
      text-decoration: none;
      transform: translate3d(-1px, -2px, 0);
    }
  }
`
