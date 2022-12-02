import { AlertProps, Box, Button, TextField } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useAddFlipQueryMutation } from '../../../lib/apiConfig'
import { NewFlipQueryType } from '../../types/flipQueryTypes'

interface AddQueryFlipPropsType {
  setSnackbar: React.Dispatch<
    React.SetStateAction<Pick<AlertProps, 'children' | 'severity'> | null>
  >
}
export const AddQueryFlip: FC<AddQueryFlipPropsType> = ({ setSnackbar }) => {
  const [addQuery] = useAddFlipQueryMutation()
  const [newRow, setNewRow] = useState<NewFlipQueryType>({
    cardQuery: '',
    itemQuery: ''
  })

  const addRowFromServerHandler = useCallback(
    async () =>
      addQuery(newRow)
        .then(() => {
          setSnackbar({ children: 'Successfully saved', severity: 'success' })
          setNewRow({
            cardQuery: '',
            itemQuery: ''
          })
        })
        .catch((err) => {
          setSnackbar({ children: `${err.data.error}`, severity: 'error' })
        }),
    [addQuery, newRow, setSnackbar]
  )
  return (
    <Box display="flex">
      <TextField
        sx={{ width: 499, marginLeft: 62 }}
        multiline
        rows={5}
        id="cardQuery"
        label="Card query"
        variant="filled"
        value={newRow.cardQuery}
        onChange={(ev) => setNewRow({ ...newRow, cardQuery: ev.target.value })}
      />
      <TextField
        sx={{ width: 499, marginLeft: 1 }}
        multiline
        rows={5}
        id="itemQuery"
        label="Item query"
        variant="filled"
        value={newRow.itemQuery}
        onChange={(ev) => setNewRow({ ...newRow, itemQuery: ev.target.value })}
      />
      <Button onClick={addRowFromServerHandler}>Add new query</Button>
    </Box>
  )
}
