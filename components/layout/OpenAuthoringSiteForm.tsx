import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { color } from '@tinacms/styles'
import UndoIconSvg from '../../public/svg/undo-icon.svg'
import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { useCMS, FieldMeta } from 'tinacms'
import Cookies from 'js-cookie'
import { PRPlugin } from '../../open-authoring/PRPlugin'
import { LoadingDots } from '../ui/LoadingDots'
import { DesktopLabel } from '../ui/inline/DesktopLabel'
import { ToolbarButton } from '../ui/inline/ToolbarButton'
import { useLocalStorageCache } from '../../utils/plugins/useLocalStorageCache'
import FormAlerts from '../../open-authoring/FormAlerts'

interface Props extends InlineFormProps {
  editMode: boolean
  children: any
  path: string
}

const useFormState = (form, subscription) => {
  const [state, setState] = useState(form.finalForm.getState())
  useEffect(() => {
    form.subscribe(setState, subscription)
  }, [form])

  return state
}

const OpenAuthoringSiteForm = ({ form, editMode, path, children }: Props) => {
  const cms = useCMS()
  const formState = useFormState(form, { dirty: true, submitting: true })

  /**
   * Toolbar Plugins
   */
  useEffect(() => {
    const forkName = Cookies.get('fork_full_name')
    const plugins = [
      {
        __type: 'toolbar:git',
        name: 'current-fork',
        component: () => {
          return (
            <FieldMeta name={'Fork'}>
              <MetaLink target="_blank" href={`https://github.com/${forkName}`}>
                {forkName}
              </MetaLink>
            </FieldMeta>
          )
        },
      },
      // TODO
      PRPlugin(process.env.REPO_FULL_NAME, forkName),
      {
        __type: 'toolbar:form-actions',
        name: 'base-form-actions',
        component: () => (
          <>
            {formState.dirty ? (
              <>
                <ToolbarButton
                  onClick={() => {
                    form.finalForm.reset()
                  }}
                >
                  <UndoIconSvg />
                  <DesktopLabel> Discard</DesktopLabel>
                </ToolbarButton>
                <SaveButton
                  primary
                  onClick={form.submit}
                  busy={formState.submitting}
                >
                  {formState.submitting && <LoadingDots />}
                  {!formState.submitting && (
                    <>
                      Save <DesktopLabel>&nbsp;Page</DesktopLabel>
                    </>
                  )}
                </SaveButton>
              </>
            ) : (
              <>
                <ToolbarButton onClick={form.reset} disabled>
                  <UndoIconSvg />
                  <DesktopLabel> Discard</DesktopLabel>
                </ToolbarButton>
                <SaveButton primary onClick={form.submit} disabled>
                  Save <DesktopLabel>&nbsp;Page</DesktopLabel>
                </SaveButton>
              </>
            )}
          </>
        ),
      },
      {
        __type: 'toolbar:status',
        name: 'form-state-dirty',
        props: {
          dirty: formState.dirty,
        },
        component: FormStatus,
      },
    ] as any

    const removePlugins = () => {
      plugins.forEach(plugin => cms.plugins.remove(plugin))
    }

    if (editMode) {
      plugins.forEach(plugin => cms.plugins.add(plugin))
    } else {
      removePlugins()
    }

    return removePlugins
  }, [editMode, form, formState])

  // persist pending changes to localStorage
  useLocalStorageCache(path, form, editMode)

  return (
    <>
      <FormAlerts form={form} />
      <InlineForm
        form={form}
        initialStatus={
          typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
        }
      >
        {children}
      </InlineForm>
    </>
  )
}

const FormStatus = ({ dirty }) => {
  return (
    <FieldMeta name={'Form Status'}>
      {dirty ? (
        <StatusMessage>
          <StatusLight warning /> <DesktopLabel>Unsaved changes</DesktopLabel>
        </StatusMessage>
      ) : (
        <StatusMessage>
          <StatusLight /> <DesktopLabel>No changes</DesktopLabel>
        </StatusMessage>
      )}
    </FieldMeta>
  )
}

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${color.primary('dark')};
`

const SaveButton = styled(ToolbarButton)`
  padding: 0 2rem;
`

interface StatusLightProps {
  warning?: boolean
}

const StatusLight = styled.span<StatusLightProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-top: -1px;
  background-color: #3cad3a;
  border: 1px solid #249a21;
  margin-right: 5px;
  opacity: 0.5;

  ${p =>
    p.warning &&
    css`
      background-color: #e9d050;
      border: 1px solid #d3ba38;
      opacity: 1;
    `};
`

const StatusMessage = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${color.grey(6)};
  padding-right: 4px;
`

export default OpenAuthoringSiteForm
