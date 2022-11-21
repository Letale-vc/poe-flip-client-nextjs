import { GetServerSideProps } from 'next'
import { Main } from '../src/components/main'
import { wrapper } from '../lib/store'
import { getPoeFlipData, getRunningQueriesThunk } from '../lib/api-config'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getPoeFlipData.initiate())

    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const { data } = getPoeFlipData.select()(store.getState())
    return {
      props: { flipData: data || [] }
    }
  })

export default Main
