import React from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Index = props => {
  return (
    <Layout pathname="/">
      <Header />
      <Hero>
        <h2 className="h1">Build real-time editing into your site.</h2>
      </Hero>
      <h2>
        Tina is an open-source site editing toolkit for React-based frameworks —
        Gatsby & Next.js
      </h2>
      <h3>Choose your tools</h3>
      <p>
        Use Tina with your favorite modern javascript frameworks. While
        currently compatible with most React-based workflows — specifically
        Gatsby, Next.js and React SPA’s — plan on adding Tina to your Vue,
        Gridsome or Nuxt projects very soon.
      </p>
      <h3>Edit from your site</h3>
      <p>
        Manage content on your own site, not another platform. Import Tina
        directly into your components to expose an editing interface for
        controlling and updating layers of your content mesh. You define the
        content model and editing powers specific to your site.
      </p>
      <h3>Extend & contribute</h3>
      <h3>
        This is not one-size-fits-all CMS. Tina is a grassroots open source
        javascript toolkit with a plugin-rich ecosystem. You can customize and
        extend the toolkit to suit your needs. Get and give help with a robust
        community of contributors.
      </h3>
      <h2 className="h1">Make your site editable in five minutes.</h2>
      <ul>
        <li>Install and configure Tina plugins</li>
        <li>
          Wrap and export your templates with Tina components specific to your
          data
        </li>
        <li>
          Customize and define the content fields by passing an options argument
        </li>
        <li>
          Open the sidebar 🤩, edit your site and watch the content updating in
          realtime
        </li>
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
`
          }}
        ></CodeExample>
      </ul>
    </Layout>
  );
};

const CodeExample = styled.code`
  border-radius: 50px;
  background-color: #d4f0ee;
  color: #241748;
  padding: 50px;
  font-size: 20px;
  line-height: 1.2;
  font-family: "Hack", Monaco, "Courier New", Courier, monospace;
  white-space: pre;
  filter: drop-shadow(rgba(104, 120, 125, 0.2) 0px 7px 8px);
  align-self: flex-start;

  b {
    color: var(--color-primary, #ec4815);
  }

  span {
    opacity: 0.5;
  }
`;

export default Index;
