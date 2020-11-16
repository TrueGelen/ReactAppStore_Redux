/* lib */
import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import LabeledTwoThumbs from '../range';

/* styles */
import md from './styles.module.scss'

function Filters({
  className,
  filters,
  filterLabels,
  onFilter,
  onPriceFilter,
  onCloseMobFilters,
  isMobFilterOpen,
  ...props }) {

  // const [mobFilters, setMobFilters] = useState(false)

  let checkboxes = []
  for (let key in filters) {

    if (key !== "price") {
      checkboxes.push(
        <div key={key}
          className={md.filterWrap}>
          <h4 className={md.filterTitle}>{filterLabels[key]}</h4>
          <div className={md.filterBlock}>
            {
              Object.keys({ ...filters[key] }).map(val => {
                return (
                  <div key={val}
                    className={md.checkBoxFilter}>
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
          `${md.filtersWrapper} ${md.filtersWrapper_mob}`
          :
          md.filtersWrapper}>

        <div className={md.filtersWrapper__closeMobFilters}
          onClick={onCloseMobFilters}>
          <div></div>
          <div></div>
        </div>

        <p className={md.title}>Фильтры</p>
        <div className={md.filters}>
          <div>
            {checkboxes}
            <div className={md.filterWrap}>
              <h4
                className={`${md.filterTitle} ${md.filterTitle_price}`}>
                Цена
                </h4>
              <div className={md.filterBlock}>
                <LabeledTwoThumbs
                  className={md.rangeSlider}
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

export default Filters

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