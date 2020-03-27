import React from 'react'
import styled from 'styled-components'

import { GetStaticProps } from 'next'

import { InlineBlocks } from 'react-tinacms-inline'
import { EditLink } from '../components/layout/EditLink'
import { DefaultSeo } from 'next-seo'
import { BlockTemplate } from 'tinacms'
import { InlineField } from 'react-tinacms-inline'
import { DynamicLink } from '../components/ui/DynamicLink'
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
} from '../components/layout'

import { Button, Video, ArrowList } from '../components/ui'
import {
  InlineTextareaField,
  BlockTextArea,
  BlocksControls,
} from '../components/ui/inline'

import { useLocalGithubJsonForm } from '../utils/github/useLocalGithubJsonForm'
import getJsonData from '../utils/github/getJsonData'
import { getGithubDataFromPreviewProps } from '../utils/github/sourceProviderConnection'
import OpenAuthoringSiteForm from '../components/layout/OpenAuthoringSiteForm'
import OpenAuthoringError from '../open-authoring/OpenAuthoringError'
import { withOpenAuthoringErrorHandler } from '../open-authoring/errors/withOpenAuthoringErrorHandler'

const HomePage = (props: any) => {
  const [formData, form] = useLocalGithubJsonForm(
    props.home,
    {
      label: 'Home Page',
      fields: [
        {
          label: 'Headline',
          name: 'headline',
          description: 'Enter the main headline here',
          component: 'text',
        },
        {
          label: 'Description',
          name: 'description',
          description: 'Enter supporting main description',
          component: 'textarea',
        },
        {
          label: 'Selling Points',
          name: 'three_points',
          description: 'Edit the points here',
          component: 'group-list',
          //@ts-ignore
          itemProps: item => ({
            key: item.id,
            label: `${item.main.slice(0, 15)}...`,
          }),
          defaultItem: () => ({
            main: 'New Point',
            supporting: '',
            _template: 'selling_point',
          }),
          fields: [
            {
              label: 'Main',
              name: 'main',
              component: 'textarea',
            },
            {
              label: 'Supporting',
              name: 'supporting',
              component: 'textarea',
            },
          ],
        },
        {
          label: 'Setup Headline',
          name: 'setup.headline',
          description: 'Enter the "setup" headline here',
          component: 'textarea',
        },
        {
          label: 'Setup Steps',
          name: 'setup.steps',
          description: 'Edit the steps here',
          component: 'group-list',
          //@ts-ignore
          itemProps: item => ({
            key: item.id,
            label: `${item.step.slice(0, 15)}...`,
          }),
          defaultItem: () => ({
            step: 'New Step',
            _template: 'setup_point',
          }),
          fields: [
            {
              label: 'Step',
              name: 'step',
              component: 'textarea',
            },
          ],
        },
      ],
    },
    props.sourceProviderConnection
  )

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={props.home.fileRelativePath}
      editMode={props.editMode}
    >
      <Layout
        sourceProviderConnection={props.sourceProviderConnection}
        editMode={props.editMode}
      >
        <DefaultSeo titleTemplate={formData.title + ' | %s'} />
        <Hero overlap narrow>
          <InlineTextareaField name="headline" />
        </Hero>
        <InlineField name="hero_video">
          {({ status, input }) => {
            return <Video src={input.value} autoPlay={status !== 'active'} />
          }}
        </InlineField>

        <Section>
          <Wrapper>
            <RichTextWrapper>
              <CtaLayout>
                <h2>
                  <em>
                    <InlineTextareaField name="description" />
                  </em>
                </h2>
                <CtaBar>
                  <EditLink color="primary" editMode={props.editMode} />
                  <DynamicLink
                    href={'/docs/getting-started/introduction/'}
                    passHref
                  >
                    <Button as="a">Get Started</Button>
                  </DynamicLink>
                </CtaBar>
              </CtaLayout>
              <InfoLayout>
                <InlineBlocks
                  name="three_points"
                  blocks={SELLING_POINTS_BLOCKS}
                />
              </InfoLayout>
            </RichTextWrapper>
          </Wrapper>
        </Section>

        <Section color="seafoam">
          <Wrapper>
            <SetupLayout>
              <RichTextWrapper>
                <h2 className="h1">
                  <InlineTextareaField name="setup.headline" />
                </h2>
                <hr />
                <ArrowList>
                  <InlineBlocks
                    name="setup.steps"
                    blocks={SETUP_POINT_BLOCKS}
                  />
                </ArrowList>
                <DynamicLink
                  href={'/docs/getting-started/introduction/'}
                  passHref
                >
                  <Button as="a" color="primary">
                    Get Started
                  </Button>
                </DynamicLink>
              </RichTextWrapper>
              <CodeWrapper>
                <CodeExample
                  dangerouslySetInnerHTML={{
                    __html: `yarn add <b>gatsby-plugin-tinacms</b>

module.exports = {
  <span>// ...</span>
  plugins: [
    '<b>gatsby-plugin-tinacms</b>',
    <span>// ...</span>
  ],
};

export <b>WithTina</b>( <b>Component</b> );
                  `,
                  }}
                ></CodeExample>
              </CodeWrapper>
            </SetupLayout>
          </Wrapper>
        </Section>
      </Layout>
    </OpenAuthoringSiteForm>
  )
}

export default withOpenAuthoringErrorHandler(HomePage)

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)
  let previewError: OpenAuthoringError = null
  let homeData = {}
  try {
    homeData = await getJsonData(
      'content/pages/home.json',
      sourceProviderConnection,
      accessToken
    )
  } catch (e) {
    if (e instanceof OpenAuthoringError) {
      previewError = { ...e } //workaround since we cant return error as JSON
    } else {
      throw e
    }
  }

  return {
    props: {
      home: homeData,
      previewError: previewError,
      sourceProviderConnection,
      editMode: !!preview,
    },
  }
}

/*
 ** BLOCKS CONFIG ------------------------------------------------------
 */
/*
 ** TODO: these selling point blocks should be an inline group-list
 */

function SellingPoint({ data, index }) {
  return (
    <BlocksControls index={index}>
      <div key={`selling-point-${index}`}>
        <h3>
          <em>
            <BlockTextArea name="main" />
          </em>
        </h3>
        <p>
          <BlockTextArea name="supporting" />
        </p>
      </div>
    </BlocksControls>
  )
}

const selling_point_template: BlockTemplate = {
  type: 'selling_point',
  label: 'Selling Point',
  defaultItem: {
    main: 'Tina is dope 🤙',
    supporting:
      'It’s pretty much my favorite animal. It’s like a lion and a tiger mixed… bred for its skills in magic.',
  },
  // TODO: figure out what to do with keys
  key: undefined,
  fields: [],
}

const SELLING_POINTS_BLOCKS = {
  selling_point: {
    Component: SellingPoint,
    template: selling_point_template,
  },
}

function SetupPoint({ data, index }) {
  return (
    <BlocksControls index={index}>
      <li key={`setup-point-${index}`}>
        <BlockTextArea name="step" />
      </li>
    </BlocksControls>
  )
}

const setup_point_template: BlockTemplate = {
  type: 'setup_point',
  label: 'Setup Point',
  defaultItem: {
    step: 'Make yourself a dang quesadilla',
  },
  key: undefined,
  fields: [],
}

const SETUP_POINT_BLOCKS = {
  setup_point: {
    Component: SetupPoint,
    template: setup_point_template,
  },
}
/*
 ** STYLES -------------------------------------------------------
 */

const CodeWrapper = styled.div`
  border-radius: 50px;
  background-color: #d4f0ee;
  display: block;
  overflow: auto;
`

const CodeExample = styled.code`
  display: block;
  padding: 3rem;
  color: #241748;
  font-size: 1.125rem;
  line-height: 1.2;
  font-family: Monaco, 'Courier New', Courier, monospace;
  white-space: pre;
  filter: drop-shadow(rgba(104, 120, 125, 0.2) 0px 7px 8px);
  align-self: flex-start;
  width: 100%;
  display: block;

  b {
    color: var(--color-primary);
  }

  span {
    opacity: 0.3;
  }

  @media (min-width: 1200px) {
    font-size: 1.3725rem;
  }
`

const InfoLayout = styled.div`
  display: grid;
  grid-gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const SetupLayout = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media (min-width: 800px) {
    align-items: start;
    grid-gap: 4rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const CtaLayout = styled.div`
  max-width: 35rem;
  text-align: center;
  margin: 0 auto;
  padding: 0 0 3rem 0;

  @media (min-width: 800px) {
    padding: 0 0 5rem 0;
  }
`

const CtaBar = styled.div`
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0.5rem 0.75rem;
  }
  iframe {
    margin-left: 1rem;
  }
  @media (min-width: 1030px) {
    iframe {
      display: none;
    }
  }
`
