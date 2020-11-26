/* libs */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* components */
import PageLayout from '../../components/pageLayouts/layout1'
/* other */
import {
  getTabletsRequest,
} from '../../Redux/actionCreators'
/* styles */
import md from './tablet.module.scss'

function TabletsPage(props) {
  const dispatch = useDispatch()
  const _productStore = useSelector(state => state.tablets)

  //get tablets from server
  useEffect(() => {
    dispatch(getTabletsRequest())
  }, [])

  return (
    <PageLayout
      title="Планшеты"
      store={_productStore} />
  )
}

export default TabletsPage