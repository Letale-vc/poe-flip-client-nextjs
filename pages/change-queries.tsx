import { GetServerSideProps } from 'next'
import { getPoeFlipQuery, getRunningQueriesThunk } from '../lib/apiConfig'
import { wrapper } from '../lib/store'
import { QueriesList } from '../src/components/queries/queries-list'

export default QueriesList
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getPoeFlipQuery.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const { data } = getPoeFlipQuery.select()(store.getState())

    return {
      props: { queries: data || [] }
    }
  })
