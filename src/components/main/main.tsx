import { DataGrid } from '@mui/x-data-grid'
import { FC, useEffect } from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { PoeFlipDataType } from '../../types/flipItemTypes'
import Link from '../../Link'
import {
  useGetPoeFlipDataQuery,
  useStartUpdatePoeFlipDataMutation
} from '../../../lib/apiConfig'
import { columns } from './gridColumns'

export interface MainPropsType {
  flipData: PoeFlipDataType | null
} 

export const Main: FC<MainPropsType> = ({ flipData }) => {
  const { data = flipData, isFetching, refetch } = useGetPoeFlipDataQuery() 
  const [startUpdateData] = useStartUpdatePoeFlipDataMutation()
  const handlerPoeTradeUpdate = () => {
    startUpdateData()
  }

  useEffect(() => {
    const interval = setInterval(refetch, 5000)
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
          disabled={data && !data.canUpdate || isFetching}
        >
          update poe trade
        </Button>
        <Box marginLeft={2} flexGrow={1}>
          <p suppressHydrationWarning>{`Last update:  ${
            data && new Date(data.lastUpdate).toLocaleString() || ''
          }`}</p>
        </Box>
        <Button component={Link} href="/change-queries">
          change queries
        </Button>
      </Box>

      <DataGrid
        getRowId={(row) => `${row.cardInfo.name}_${row.itemInfo.name}`}
        rows={data && data.poeData.cards || []}
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
