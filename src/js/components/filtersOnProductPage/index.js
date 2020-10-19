/* lib */
import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import LabeledTwoThumbs from '../range';

/* styles */
import moduleStyles from './styles.module.scss'

export default function Filters({
  className,
  filters,
  filterLabels,
  onFilter,
  onPriceFilter,
  onCloseMobFilters,
  isMobFilterOpen,
  ...otherProps }) {

  // const [mobFilters, setMobFilters] = useState(false)

  let checkboxes = []
  for (let key in filters) {

    if (key !== "price") {
      checkboxes.push(
        <div key={key}
          className={moduleStyles.filterWrap}>
          <h4 className={moduleStyles.filterTitle}>{filterLabels[key]}</h4>
          <div className={moduleStyles.filterBlock}>
            {
              Object.keys({ ...filters[key] }).map(val => {
                return (
                  <div key={val}
                    className={moduleStyles.checkBoxFilter}>
                    <Checkbox
                      checked={filters[key][val]}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      onChange={(e) => { onFilter(key, val) }}
                    />
                    <p>{val}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div
        className={isMobFilterOpen ?
          `${moduleStyles.filtersWrapper} ${moduleStyles.filtersWrapper_mob}`
          :
          moduleStyles.filtersWrapper}>

        <div className={moduleStyles.filtersWrapper__closeMobFilters}
          onClick={onCloseMobFilters}>
          <div></div>
          <div></div>
        </div>

        <p className={moduleStyles.title}>Фильтры</p>
        <div className={moduleStyles.filters}>
          <div>
            {checkboxes}
            <div className={moduleStyles.filterWrap}>
              <h4
                className={`${moduleStyles.filterTitle} ${moduleStyles.filterTitle_price}`}>
                Цена
                </h4>
              <div className={moduleStyles.filterBlock}>
                <LabeledTwoThumbs
                  className={moduleStyles.rangeSlider}
                  min={filters.price.min}
                  max={filters.price.max}
                  step={1000}
                  rangeChanger={onPriceFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Filters.defaultProps = {
  className: undefined,
  filters: null,
  filterLabels: null,
  onPriceFilter: () => { },
  onFilter: () => { },
  onCloseMobFilters: () => { },
  isMobFilterOpen: false
}

Filters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.object,
  filterLabels: PropTypes.object,
  onPriceFilter: PropTypes.func,
  onFilter: PropTypes.func,
  onCloseMobFilters: PropTypes.func,
  isMobFilterOpen: PropTypes.bool
}