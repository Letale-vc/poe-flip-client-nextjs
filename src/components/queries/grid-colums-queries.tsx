import { IconButton } from '@mui/material'
import { GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { FlipQueryTypes } from '../../types/flipQueryTypes'

export const createQueriesColumns = (
  funDelete: (row: FlipQueryTypes) => void
) => [
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
    renderCell: (params: GridRenderCellParams) => {
      const deleteQueryHandler = () => {
        funDelete(params.row)
      }
      return (
        <IconButton
          key={params.id}
          aria-label="delete"
          onClick={deleteQueryHandler}
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  }
]
