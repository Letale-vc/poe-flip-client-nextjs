import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { FC, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { CardTypes, PoeFlipDataType } from '../types/card-types'
import Link from '../Link'
import {
  useGetPoeFlipDataQuery,
  useStartUpdatePoeFlipDataMutation
} from '../../lib/api-config'

const columns: GridColDef[] = [
  {
    field: 'card',
    headerName: 'card',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
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
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
      <Link href={params.row.itemInfo.poeTradeLink} target="_blank">
        {params.row.itemInfo.name}
      </Link>
    )
  },
  {
    field: 'stackSize',
    headerName: 'stackSize',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
      <p>{params.row.cardInfo.stackSize}</p>
    )
  },
  {
    field: 'chaosPrice',
    headerName: 'cardChaos',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
      <p>{params.row.cardInfo.chaosPrice}</p>
    )
  },
  {
    field: 'cardDivineValue',
    headerName: 'cardDivine',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
      <p>{params.row.cardInfo.divinePrice}</p>
    )
  },
  {
    field: 'itemChaosValue',
    headerName: 'itemChaos',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
      <p>{params.row.itemInfo.chaosPrice}</p>
    )
  },

  {
    field: 'itemDivineValue',
    headerName: 'itemDivine',
    type: 'number',
    renderCell: (params: GridRenderCellParams<string, CardTypes>) => (
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

export const Main: FC<{ flipData: PoeFlipDataType }> = ({ flipData }) => {
  const { data = flipData, isFetching, refetch } = useGetPoeFlipDataQuery()
  const [startUpdateData, result] = useStartUpdatePoeFlipDataMutation()
  const handlerPoeTradeUpdate = () => {
    startUpdateData()
  }

  useEffect(() => {
    const interval = setInterval(refetch, 30000)
    return () => {
      clearInterval(interval)
    }
  }, [refetch])

  return (
    <Box sx={{ width: '100%', height: '100vh', mt: 2 }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={2}
      >
        <Button
          onClick={handlerPoeTradeUpdate}
          disabled={!data.canUpdate || isFetching}
        >
          update poe trade
        </Button>
        <Box marginLeft={2} flexGrow={1}>
          <p>{`Last update --- ${data.lastUpdate}`}</p>
        </Box>
        <Button component={Link} href="/change-queries">
          change queries
        </Button>
      </Box>

      <DataGrid
        getRowId={(row) => `${row.cardInfo.name}_${row.itemInfo.name}`}
        rows={data.poeData.cards}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        density="compact"
        hideFooter
      />
    </Box>
  )
}

// ${new Date(
//             data.lastUpdate
//           ).getMonth()}/${data.lastUpdate.getDate()}/${data.lastUpdate.getFullYear()} | ${data.lastUpdate.getHours()}:${data.lastUpdate?.getMinutes()}:${data.lastUpdate?.getSeconds()}
