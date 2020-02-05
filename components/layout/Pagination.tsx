import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import RightArrowSvg from '../../public/svg/right-arrow.svg'

interface NextPrevPageProps {
  title: string
  slug: string
}

interface PaginationProps {
  prevPage?: NextPrevPageProps
  nextPage?: NextPrevPageProps
}

export function Pagination({ prevPage, nextPage }: PaginationProps) {
  return (
    <Wrapper>
      {prevPage && prevPage.slug && (
        <Link href={`${prevPage.slug}`} passHref>
          <PaginationLink previous>
            <span>Previous</span>
            <h5>{prevPage.title}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </Link>
      )}
      {nextPage && nextPage.slug && (
        <Link href={`${nextPage.slug}`} passHref>
          <PaginationLink>
            <span>Next</span>
            <h5>{nextPage.title}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </Link>
      )}
    </Wrapper>
  )
}

export default Pagination

/*
 ** Styles ------------------------------------------
 */

interface PaginationLinkProps {
  previous?: boolean
}

const PaginationLink = styled.a<PaginationLinkProps>`
  padding: 1rem;
  display: block;
  flex: 1 0 auto;
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  text-decoration: none;
  background-color: #FAFAFA;
  color: var(--color-secondary);
  position: relative;
  text-align: right;
  padding-right: 3.5rem;
  margin: 0 1px 1px 0;

  span {
    font-size: 0.9375rem;
    text-transform: uppercase;
    opacity: 0.5;
  }

  h5 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0;
    transition: all 180ms ease-out;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 2rem;
    height: auto;
    fill: var(--color-grey);
    transition: all 180ms ease-out;
  }

  &:hover {
    h5 {
      color: var(--color-primary);
    }
    svg {
      fill: var(--color-primary);
    }
  }

  ${props =>
    props.previous &&
    css`
      padding-right: 1rem;
      padding-left: 3.5rem;
      text-align: left;

      svg {
        right: auto;
        left: 0.75rem;
        transform: translate3d(0, -50%, 0) rotate(180deg);
      }
    `};
`

const Wrapper = styled.div`
  margin-top: 2rem;
  background-color: var(--color-light-dark);
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1px 0 0 1px;
`
