import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'

export function TeamsForm(props: any) {
  /*
   ** TODO: set up the hubspot portal without
   ** the gatsby plugin.
   */
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const [email, setEmail] = useState('')
  const { hubspotFormID } = props

  async function postForm(data: any) {
    if (hubspotFormID && process.env.GATSBY_HUBSPOT_PORTAL_ID) {
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_PORTAL_ID}/${hubspotFormID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const response = await rawResponse.json()
        const message = response.inlineMessage.replace(/<[^>]*>/g, '').trim()
        alert(message)
      } catch (e) {
        alert('Looks like an error, please email support@forestry.io')
        console.error(e)
      }
    } else {
      console.error('Teams Form: Environment variables missing')
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value)
  }
  function handleSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSurname(e.target.value)
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handleProjectDetailsChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setProjectDetails(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = {
      fields: [
        {
          name: 'firstname',
          value: firstName,
        },
        {
          name: 'lastname',
          value: surname,
        },
        {
          name: 'email',
          value: email,
        },
        {
          name: 'project_details',
          value: projectDetails,
        },
      ],
    }
    if (process.env.NODE_ENV === 'production') {
      postForm(formData)
    } else {
      console.error('Teams form only posts in production')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h5>Teams Early Access</h5>
      <label>
        <p className="body">First Name</p>
        <Input
          type="text"
          id="name"
          name="name"
          value={firstName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        <p className="body">Last Name</p>
        <Input
          type="text"
          id="surname"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}
        />
      </label>
      <label>
        <p className="body">Email</p>
        <Input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        <p className="body">Tell us a little bit about your project</p>
        <Textarea
          id="project-details"
          name="project-details"
          rows={4}
          required
          value={projectDetails}
          onChange={handleProjectDetailsChange}
        />
      </label>
      <Button type="submit" primary>
        Request Access
      </Button>
    </StyledForm>
  )
}

const StyledForm = styled.form``
