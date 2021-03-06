/* libs */
import React, { useState, useMemo } from 'react'
import { withRouter } from "react-router";
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
/* components */
import Filters from '../../filtersOnProductPage'
import LoadingSpinner from '../../loadingSpinner'
import LineCard from '../../productCard/lineCard'
/* other */
import { urlBuilder, routesMap } from '../../../routes'
import {
  filterSuccess,
  setPriceRangeSuccess,
  tabletsFilterSuccess,
  tabletsSetPriceRangeSuccess,
} from '../../../Redux/actionCreators'
/* styles */
import md from './styles.module.scss'

function PageLayout({
  className,
  title,
  store,
  ...props }) {
  const dispatch = useDispatch()
  const [mobFilters, setMobFilters] = useState(false)
  const openMobFilters = () => setMobFilters(true)
  const hideMobFilters = () => setMobFilters(false)

  const _productStore = store
  const _products = _productStore.filteredProducts
  const baseUrlImgs = _productStore._baseUrlImgs
  const _labels = _productStore._labels
  const filters = useMemo(() => ({ ..._productStore.filters }), [_productStore.filters])
  let isLoading = _productStore.isLoading

  const actions = (() => {
    const p = props.location.pathname
    let resObj = { fs: null, spr: null }
    if (p === routesMap.televisions)
      resObj = { fs: filterSuccess, spr: setPriceRangeSuccess }
    if (p === routesMap.tablets)
      resObj = { fs: tabletsFilterSuccess, spr: tabletsSetPriceRangeSuccess }
    return resObj
  })()

  const actionFilterSuccess = actions.fs
  const actionSetPriceRangeSuccess = actions.spr

  const getNameForSinglePage = () => {
    const p = props.location.pathname
    if (p === routesMap.televisions)
      return "television"
    if (p === routesMap.tablets)
      return "tablet"
  }
  const singleProductPage = getNameForSinglePage()
  const productNodeElements = useMemo(() => {
    return _products.map(product => {
      const goToProduct = () => props.history.push(urlBuilder(singleProductPage, product.id))
      return <LineCard
        key={product.id}
        product={product}
        baseUrlImgs={baseUrlImgs}
        labels={_labels}
        onClick={goToProduct} />
    })
  }, [_productStore.filteredProducts])

  const onFilter = (parameter, value) => dispatch(actionFilterSuccess(_productStore, parameter, value))
  const onPriceFilter = (values) => dispatch(actionSetPriceRangeSuccess(filters, values))

  return (
    <>
      {/* {console.log("========PageLayout======")} */}
      <h1 className={` ${md.title}`}>{title}</h1>

      <div className={md.pageWrapper}>

        <Filters
          filters={filters}
          filterLabels={_labels}
          onFilter={onFilter}
          onPriceFilter={onPriceFilter}
          isMobFilterOpen={mobFilters}
          onCloseMobFilters={hideMobFilters} />

        <div
          className={md.filterButton}
          onClick={openMobFilters}>
          <p>Фильтры</p>
        </div>

        <div className={md.productsWrapper}>
          {isLoading && <LoadingSpinner />}
          {productNodeElements}
        </div>

      </div>
    </>
  )
}

export default withRouter(PageLayout)

PageLayout.defaultProps = {
  className: undefined,
  title: "Товары"
}

PageLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  store: PropTypes.object.isRequired
}