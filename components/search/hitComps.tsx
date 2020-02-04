import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Hit } from 'react-instantsearch-core'
import Link from 'next/link'
import path from 'path'

const DocHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <span onClick={clickHandler}>
      <Link href={path.join('/docs', (hit as any).slug)}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
    </span>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <span onClick={clickHandler}>
      <Link href={path.join('/blog', (hit as any).slug)}>
        <h4 onClick={clickHandler}>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
    </span>
    <div>
      <Highlight attribute="date" hit={hit} tagName="mark" />
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const hitComponents = {
  ['DocHit']: DocHit,
  ['BlogHit']: BlogHit,
}
