import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Link from '../../Link'
import { FlipItemTypes } from '../../types/flipItemTypes'

export const columns: GridColDef[] = [
  {
    field: 'card',
    headerName: 'card',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <Link href={params.row.cardInfo.poeTradeLink} target="_blank">
        {params.row.cardInfo.name}
      </Link>
    ),
    width: 200
  },
  {
    field: 'item',
    headerName: 'item',
    width: 200,
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <Link href={params.row.itemInfo.poeTradeLink} target="_blank">
        {params.row.itemInfo.name}
      </Link>
    )
  },
  {
    field: 'stackSize',
    headerName: 'stackSize',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <p>{params.row.cardInfo.stackSize}</p>
    )
  },
  {
    field: 'chaosPrice',
    headerName: 'cardChaos',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <p>{params.row.cardInfo.chaosPrice}</p>
    )
  },
  {
    field: 'cardDivineValue',
    headerName: 'cardDivine',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <p>{params.row.cardInfo.divinePrice}</p>
    )
  },
  {
    field: 'itemChaosValue',
    headerName: 'itemChaos',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <p>{params.row.itemInfo.chaosPrice}</p>
    )
  },

  {
    field: 'itemDivineValue',
    headerName: 'itemDivine',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, FlipItemTypes>) => (
      <p>{params.row.itemInfo.divinePrice}</p>
    )
  },
  {
    field: 'profitInChaosPerCard',
    headerName: 'profitInChaosPerCard',
    type: 'number',
    width: 180
  },
  {
    field: 'profitInDivinePerCard',
    headerName: 'profitInDivinePerCard',
    type: 'number',
    width: 170
  },
  {
    field: 'profitInDivine',
    headerName: 'profitInDivine',
    type: 'number',
    width: 150
  },
  {
    field: 'profitInChaos',
    headerName: 'profitInChaos',
    type: 'number'
  },
  {
    field: 'description',
    headerName: 'description'
  }
]
