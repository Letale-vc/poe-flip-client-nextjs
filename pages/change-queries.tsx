import {
  Alert,
  AlertProps,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField
} from '@mui/material'
import { useState, FC, useCallback } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridValueGetterParams
} from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from '../src/Link'

interface QueriesType {
  cardQuery: string
  itemQuery: string
}
type QueriesArrayType = Array<QueriesType>

const ChangeQueries: FC<{ queries: QueriesArrayType }> = ({ queries }) => {
  const [rows, setRows] = useState<QueriesArrayType>(queries)
  const [newRow, setNewRow] = useState<QueriesType>({
    cardQuery: '',
    itemQuery: ''
  })
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const addRowFromServerHandler = async () => {
    try {
      await fetch(`http://localhost:3000/api/poeQueries`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([...rows, newRow])
      })

      setRows([...rows, newRow])
      setSnackbar({ children: 'Successfully saved', severity: 'success' })
    } catch (err: any) {
      setSnackbar({ children: err.message, severity: 'error' })
    }
  }
  const processRowUpdate = useCallback(async (newGridRow: GridRowModel) => {
    // Make the HTTP request to save in the backend
    await fetch(`http://localhost:3000/api/poeQueries`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGridRow)
    })
    // setRows(
    //   rows.map((row) => {
    //     if (
    //       JSON.parse(newGridRow.cardQuery).query.type ===
    //       JSON.parse(row.cardQuery).query.type
    //     ) {
    //       return newGridRow
    //     }
    //
    //     return row
    //   })
    // )
    setSnackbar({ children: 'Successfully saved', severity: 'success' })

    return newGridRow
  }, [])

  const deleteRowHandlerFromServer = useCallback(
    async (deletedRow: QueriesType) => {
      try {
        const newRows = rows.filter(
          (row) => row.cardQuery !== deletedRow.cardQuery
        )
        // Make the HTTP request to save in the backend
        await fetch(`http://localhost:3000/api/poeQueries`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRows)
        })

        setRows(newRows)
        setSnackbar({ children: 'Successfully saved', severity: 'success' })
      } catch (err: any) {
        setSnackbar({ children: err.message, severity: 'error' })
      }
    },
    [rows]
  )
  const columns: GridColDef[] = [
    {
      field: 'cardToItem',
      headerName: 'CARD TO ITEM NAME',
      width: 500,
      sortable: false,
      filterable: false,
      valueGetter: (params: GridValueGetterParams) => {
        const nameCard = JSON.parse(params.row.cardQuery).query?.type
        let nameItemJson
        try {
          nameItemJson = JSON.parse(params.row.itemQuery)
        } catch (err) {
          return `${nameCard} -> ${params.row.itemQuery}`
        }

        const { query } = nameItemJson
        let nameItem
        if (query?.type && query?.name) {
          nameItem = query.name
        } else if (query?.type) {
          nameItem = query.type
        } else if (typeof query.name === 'object') {
          nameItem = query.name.option
        } else if (query.name) {
          nameItem = query.name
        } else {
          nameItem = undefined
        }

        return `${nameCard} -> ${nameItem}`
      }
    },
    {
      field: 'cardQuery',
      headerName: 'cardQuery',
      width: 500,
      sortable: false,
      filterable: false,
      editable: true
    },

    {
      field: 'itemQuery',
      headerName: 'itemQuery',
      width: 500,
      sortable: false,
      filterable: false,
      editable: true
    },
    {
      field: 'options',
      headerName: 'options',
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => [
        <IconButton
          key={params.id}
          aria-label="delete"
          onClick={() => {
            deleteRowHandlerFromServer(params.row)
          }}
        >
          <DeleteIcon />
        </IconButton>
      ]
    }
  ]

  return (
    <div>
      <div>
        <Button component={Link} href="/">
          go to main
        </Button>
      </div>
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
          columns={columns}
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
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/poeQueries`)
  const data = await res.json()

  return {
    props: { queries: data } // will be passed to the page component as props
  }
}
export default ChangeQueries
