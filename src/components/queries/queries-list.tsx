import { FC, useCallback, useState } from 'react'
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Snackbar,
  TextField
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  useAddFlipQueryMutation,
  useDeletePoeFlipQueryMutation,
  useEditFlipQueryMutation,
  useGetPoeFlipQueryQuery
} from '../../../lib/api-config'
import Link from '../../Link'
import { createQueriesColumns } from './grid-colums-queries'
import { FlipQueryType, NewFlipQueryType } from '../../types/flip-queries'

export const QueriesList: FC<{ queries: FlipQueryType[] }> = ({ queries }) => {
  const { data: rows = queries } = useGetPoeFlipQueryQuery()
  const [removeQuery] = useDeletePoeFlipQueryMutation()
  const [addQuery] = useAddFlipQueryMutation()
  const [editQuery] = useEditFlipQueryMutation()
  const [newRow, setNewRow] = useState<NewFlipQueryType>({
    cardQuery: '',
    itemQuery: ''
  })
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)

  const handleProcessRowUpdateError = useCallback((err: Error) => {
    setSnackbar({ children: err.message, severity: 'error' })
  }, [])

  const addRowFromServerHandler = useCallback(
    async () =>
      addQuery(newRow)
        .then(() => {
          setSnackbar({ children: 'Successfully saved', severity: 'success' })
        })
        .catch((err) => {
          setSnackbar({ children: `${err.data.error}`, severity: 'error' })
        }),
    [addQuery, newRow]
  )

  const processRowUpdate = useCallback(
    async (newGridRow: FlipQueryType, oldGridRow: FlipQueryType) =>
      editQuery(newGridRow)
        .unwrap()
        .then(() => {
          setSnackbar({ children: 'Successfully saved', severity: 'success' })
          return newGridRow
        })
        .catch((err) => {
          setSnackbar({
            children: `Status: ${err.status} ${
              err.data.error || 'Unknown Error'
            }`,
            severity: 'error'
          })
          return oldGridRow
        }),
    [editQuery]
  )

  const deleteRowHandlerFromServer = useCallback(
    async (deletedRow: FlipQueryType) =>
      removeQuery(deletedRow)
        .unwrap()
        .then(() => {
          setSnackbar({ children: 'Successfully saved', severity: 'success' })
        })
        .catch((err) => {
          setSnackbar({
            children: `Status: ${err.status} ${
              err.data.error || 'Unknown Error'
            }`,
            severity: 'error'
          })
        }),
    [removeQuery]
  )
  const queriesColumns = createQueriesColumns(deleteRowHandlerFromServer)

  return (
    <Box sx={{ width: '100%', height: '100vh', mt: 2 }} mb={2}>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Button component={Link} href="/">
          go to main
        </Button>
      </Box>
      <Box display="flex">
        <TextField
          sx={{ width: 499, marginLeft: 62 }}
          id="cardQuery"
          label="Card query"
          variant="filled"
          value={newRow.cardQuery}
          onChange={(ev) =>
            setNewRow({ ...newRow, cardQuery: ev.target.value })
          }
        />
        <TextField
          sx={{ width: 499, marginLeft: 1 }}
          id="itemQuery"
          label="Item query"
          variant="filled"
          value={newRow.itemQuery}
          onChange={(ev) =>
            setNewRow({ ...newRow, itemQuery: ev.target.value })
          }
        />
        <Button onClick={addRowFromServerHandler}>Add new query</Button>
      </Box>
      <div>
        <DataGrid
          getRowId={(row) => JSON.parse(row.cardQuery).query?.type}
          rows={rows}
          columns={queriesColumns}
          disableSelectionOnClick
          autoHeight
          density="compact"
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter
        />
      </div>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  )
}
