/* libs */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* components */
import PageLayout from '../../components/pageLayouts/layout1'
/* other */
import {
  getTelevisionsRequest,
} from '../../Redux/actionCreators'

function TvPage(props) {
  const dispatch = useDispatch()
  const _productStore = useSelector(state => state.televisions)

  //get tvs from server
  useEffect(() => {
    dispatch(getTelevisionsRequest())
  }, [])

  return (
    <>
      < PageLayout
        title="Телевизоры"
        store={_productStore} />
    </>
  )
}

export default TvPage