import { observable, action, computed } from "mobx"

export default class {
  @observable tabletsFromServer = []
  @observable tablets = []

  @observable product = null

  @observable filters = {
    price: {
      min: 0,
      max: 0,
      range: {
        min: 0,
        max: 0
      }
    }
  }

  constructor(rootStore) {
    this.api = rootStore.api.tablets

    this.baseUrlImgs = rootStore.baseUrlImgs.tablets

    this.labels = {
      diagonal: "Диагональ",
      frontCamera: "Фронтальная камера (МП)",
      mainCamera: "Основная камера (МП)",
      processor: "Процессор",
      memory: "Объем памяти (Гб)",
      about: 'О товаре'
    }
  }

  @action rangeChanger = (values) => {
    this.filters.price.range.min = values[0]
    this.filters.price.range.max = values[1]

    this.filter()
  }

  @action setFilters = () => {
    for (let key in this.labels) {
      if (key !== "about") {
        //.map() - get all values by key and in Set we make it unique. Also find a max price
        [...new Set(this.tabletsFromServer.map(prod => {
          this.filters.price.max = Math.max(this.filters.price.max, Number(prod.data().price))
          this.filters.price.range.max = this.filters.price.max
          return prod.data().description[key]
        }))]
          //by key we write new obj where key is unique value and value is boolean
          .forEach(val => {
            this.filters[key] = { ...this.filters[key], [val]: true }
          })
      }
    }
  }

  @action filter = (parameter = null, value = null) => {
    this.tablets = [...this.tabletsFromServer]
    if (parameter !== null && value !== null)
      this.filters[parameter][value] = !this.filters[parameter][value]

    for (let param in this.filters) {
      this.tablets = this.tablets.filter(
        tv => Object.keys(this.filters[param])
          .some(val => {
            if (param === "price") {
              return this.filters.price.range.min <= tv.data().price && this.filters.price.range.max >= tv.data().price
            } else {
              return this.filters[param][val] && val === tv.data().description[param].toString()
            }
          })
      )
    }
  }

  @action getTablets = async () => {
    this.tabletsFromServer = await this.api.getTablets()
    this.tablets = [...this.tabletsFromServer]

    this.setFilters()
  }
  @action getProduct = async (id) => this.product = { id, ...await this.api.getTabletById(id) }

  urlToImg = (url) => `${this.baseUrlImgs}${url}`
}