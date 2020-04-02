import React from 'react'
import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import {
  useOpenAuthoringToolbarPlugins,
  useOpenAuthoringErrorListener,
} from 'react-tinacms-github'
import { useLocalStorageCache } from '../../utils/plugins/browser-storage-api/useLocalStorageCache'
import AutoAuthModal from '../open-authoring/AutoAuthModal'

interface Props extends InlineFormProps {
  editMode: boolean
  children: any
  path: string
}

export const OpenAuthoringSiteForm = ({
  form,
  editMode,
  path,
  children,
}: Props) => {
  // Toolbar Plugins
  useOpenAuthoringToolbarPlugins(form, editMode)

  // Persist pending changes to localStorage
  useLocalStorageCache(path, form, editMode)

  useOpenAuthoringErrorListener(form)

  return (
    <>
      <InlineForm
        form={form}
        initialStatus={
          typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
        }
      >
        {children}
      </InlineForm>
      <AutoAuthModal />
    </>
  )
}
