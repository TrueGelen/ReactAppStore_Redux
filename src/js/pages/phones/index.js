/* libs */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* components */
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import PageLayout from '../../components/pageLayouts/layout2'
/* other */
import { urlBuilder } from '../../routes'
import {
  getPhonesRequest
} from '../../Redux/actionCreators'
/* styles */
import moduleStyles from './phones.module.scss'

/* code */
function PhonesPage(props) {
  const dispatch = useDispatch()
  const _productStore = useSelector(state => state.phones)

  //get phones from server
  useEffect(() => {
    dispatch(getPhonesRequest())
  }, [])



  return (
    <PageLayout
      title="Телефоны"
      store={_productStore}
    />
  )
}

export default PhonesPage