import { observable, action, computed } from "mobx"

export default class {
  @observable phonesFromServer = []
  @observable phones = []

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
    this.api = rootStore.api.phones

    this.baseUrlImgs = rootStore.baseUrlImgs.phones

    this.labels = {
      diagonal: "Диагональ",
      frontCamera: "Фронтальная камера (МП)",
      mainCamera: "Основная камера (МП)",
      processor: "Процессор",
      memory: "Объем памяти (Гб)",
      about: 'О товаре'
    }
  }

  @action setFilters = () => {
    for (let key in this.labels) {
      if (key !== "about") {
        //.map() - get all values by key and in Set we make it unique. Also find a max price
        [...new Set(this.phonesFromServer.map(prod => {
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

  @action rangeChanger = (values) => {
    this.filters.price.range.min = values[0]
    this.filters.price.range.max = values[1]

    this.filter()
  }

  @action filter = (parameter = null, value = null) => {
    this.phones = [...this.phonesFromServer]
    if (parameter !== null && value !== null)
      this.filters[parameter][value] = !this.filters[parameter][value]

    for (let param in this.filters) {
      this.phones = this.phones.filter(
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

  // @action getPhones = async () => this.phones = await this.api.getPhones()
  @action getPhones = async () => {
    this.phonesFromServer = await this.api.getPhones()
    this.phones = [...this.phonesFromServer]

    this.setFilters()
  }
  @action getProduct = async (id) => this.product = { id, ...await this.api.getPhoneById(id) }

  urlToImg = (url) => `${this.baseUrlImgs}${url}`
	/* @action getPhones = async () => {
		this.phones = ['one', 'two', 'three']
	} */
}
