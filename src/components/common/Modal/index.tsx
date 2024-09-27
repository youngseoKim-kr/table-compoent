import Dimmed from '@common/Dimmed'
import { css } from '@emotion/react'
import Flex from '@common/Flex'
import Text from '@common/Text'
import { colors } from '@styles/colors'
import Button from '@common/Button'
import { HeaderType, ToDo } from '@models/Todo'
import Checkbox from '@common/CheckBox'
import { useForm } from 'react-hook-form'
import React, { ReactNode, useEffect } from 'react'
import { useStores } from '@stores/index'
import { observer } from 'mobx-react'

const resetTodo: ToDo = {
  id: null,
  title: '',
  content: '',
  date: '',
  completed: false,
}

interface ModalProps {
  open: boolean
  onClose: () => void
  todo?: ToDo
  isEdit?: boolean
}

interface FormValueProps {
  [key: string]: string | number | boolean | null | ReactNode
}

function Modal({ open, onClose, todo = resetTodo, isEdit }: ModalProps) {
  const methods = useForm<FormValueProps>({
    defaultValues: todo,
  })

  const { register, handleSubmit, setValue, reset, getValues } = methods
  const { toDoStore } = useStores()

  const handleFormSubmit = (formData: FormValueProps) => {
    toDoStore.addTodo(formData as ToDo)
    reset()
    onClose()
  }

  const handleFormEditSubmit = (formData: FormValueProps) => {
    toDoStore.editTodo(formData as ToDo)
    reset()
    onClose()
  }

  useEffect(() => {
    reset(todo)
  }, [todo, open, reset])

  if (!open) return null

  return (
    <Dimmed>
      <section css={styles.section} onClick={() => onClose()}>
        <div css={styles.container} onClick={(e) => e.stopPropagation()}>
          <Text typography="t2">to do item {isEdit ? '수정하기' : '추가하기'}</Text>
          <form
            css={styles.form}
            onSubmit={isEdit ? handleSubmit(handleFormEditSubmit) : handleSubmit(handleFormSubmit)}
          >
            {Object.keys(todo).map((todoItem) => (
              <Flex direction="column" key={todoItem} style={{ gap: 2, marginTop: '8px' }}>
                <Text>{HeaderType[todoItem].label}</Text>
                {(HeaderType[todoItem].type === 'text' || HeaderType[todoItem].type === 'date') && (
                  <input
                    css={styles.input}
                    defaultValue={todo[todoItem]}
                    disabled={todoItem === 'id'}
                    {...register(todoItem)}
                  />
                )}
                {HeaderType[todoItem].type === 'check' && (
                  <Checkbox
                    defaultChecked={!!todo[todoItem]}
                    {...register(todoItem)}
                    onChange={(e) => {
                      setValue(todoItem, e.target.checked, { shouldValidate: true })
                    }}
                  />
                )}
              </Flex>
            ))}
            <Flex justify="flex-end">
              <Button size="large" weak={true} style={{ border: 'none' }} onClick={onClose}>
                취소
              </Button>
              <Button type="submit" size="large" weak={true} style={{ border: 'none' }}>
                {isEdit ? '수정' : '추가'}
              </Button>
            </Flex>
          </form>
        </div>
      </section>
    </Dimmed>
  )
}

const styles = {
  section: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  container: css`
    padding: 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-color: white;
  `,
  form: css`
    margin-top: 16px;
  `,
  input: css`
    padding: 0 16px;
    font-size: 15px;
    height: 48px;
    font-weight: 500;
    border: 1px solid ${colors.grey};
    border-radius: 6px;
    width: 400px;
    box-sizing: border-box;
  `,
}

export default observer(Modal)
