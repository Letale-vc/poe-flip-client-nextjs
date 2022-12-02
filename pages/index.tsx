import { GetServerSideProps } from 'next'
import { Main, MainPropsType } from '../src/components/main/main'
import { wrapper } from '../lib/store'
import { getPoeFlipData, getRunningQueriesThunk } from '../lib/apiConfig'

export const getServerSideProps: GetServerSideProps<MainPropsType> =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getPoeFlipData.initiate())

    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const { data } = getPoeFlipData.select()(store.getState())
    return {
      props:  { flipData: data || null  }
    }
  })

export default Main
