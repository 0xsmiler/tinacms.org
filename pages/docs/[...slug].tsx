import Link from 'next/link'
import matter from 'gray-matter'
import styled from 'styled-components'

import {
  Layout,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
  Pagination,
} from '../../components/layout'
import { DocsNav } from '../../components/ui/DocsNav'

export default function DocTemplate(props) {
  const frontmatter = props.doc.data
  const markdownBody = props.doc.content
  return (
    <Layout color={'seafoam'} fixedIcon noFooter>
      <DocsLayout>
        <DocsNav navItems={props.docsNav} />
        <DocsContent>
          <RichTextWrapper>
            <Wrapper narrow>
              <h1>{frontmatter.title}</h1>
              <hr />
              <MarkdownContent content={markdownBody} />
              <Pagination prevPage={props.prevPage} nextPage={props.nextPage} />
            </Wrapper>
          </RichTextWrapper>
        </DocsContent>
      </DocsLayout>
    </Layout>
  )
}

const DocsLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* padding: 6rem 0 3rem 0; */

  ${DocsNav} {
    padding: 6rem 0 1rem 0;
    grid-area: nav;
  }

  @media (min-width: 1100px) {
    display: grid;
    grid-template-areas: 'nav content';
    grid-template-columns: 16rem auto;
  }
`

const DocsContent = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 6rem 0 3rem 0;

  /* Adjust header sizes for docs */

  h1,
  .h1 {
    font-size: 2rem;

    @media (min-width: 800px) {
      font-size: 3rem;
    }

    @media (min-width: 1200px) {
      font-size: 2.5rem;
    }
  }

  h2,
  .h2 {
    font-size: 1.75rem;
  }
`

DocTemplate.getInitialProps = async function(ctx) {
  const { slug: slugs } = ctx.query
  const fullSlug = slugs.join('/')
  const content = await import(`../../content/docs/${fullSlug}.md`)
  const doc = matter(content.default)

  const docsNavData = await import('../../content/toc-doc.json')
  const nextDocPage =
    doc.data.next &&
    matter((await import(`../../content${doc.data.next}.md`)).default)
  const prevDocPage =
    doc.data.prev &&
    matter((await import(`../../content${doc.data.prev}.md`)).default)

  return {
    doc: {
      data: { ...doc.data, slug: fullSlug },
      content: doc.content,
    },
    docsNav: docsNavData.default,
    nextPage: {
      slug: doc.data.next,
      title: nextDocPage && nextDocPage.data.title,
    },
    prevPage: {
      slug: doc.data.prev,
      title: prevDocPage && prevDocPage.data.title,
    },
  }
}
