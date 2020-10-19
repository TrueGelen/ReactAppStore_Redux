import { observable, action, computed } from "mobx"


export default class {
  @observable products = {}
  // @observable detailedProducts = []

  constructor(rootStore) {

    this.api = rootStore.api.apiCart
    this.localStorage = rootStore.localStorage
  }

  @action getCartFromLocalStorage() {
    Object.keys(this.localStorage).forEach(id => {
      id !== 'loglevel:webpack-dev-server' ? this.products[id] = { amount: parseInt(this.localStorage.getItem(id)) } : false
    })
  }

  @action async getDetailedProducts() {
    await Promise.all(Object.keys(this.products).map(async id => {
      let product = await this.api.getProductById(id)
      this.products[id] = { ...product, ...this.products[id] }
      // return { ...product, amount: this.products.amount, id }
    }))
  }

  @computed get totalPositionsInCart() {
    return Object.keys(this.products).length
  }

  @computed get totalProductsInCart() {
    let total = 0
    for (let key in this.products) {
      total += Number(this.products[key].amount)
    }
    return total
  }

  @computed get total() {
    return Object.keys(this.products).reduce((total, id) => {
      return total + this.products[id].price * this.products[id].amount
    }, 0)
  }

  inCart(id) {
    return id in this.products
  }

  @action async addToCart(id) {
    if (!this.inCart(id)) {
      this.localStorage.setItem(id, 1)
      this.products[id] = { amount: 1 }
    }
  }

  @action async removeFromCart(id) {
    if (this.inCart(id)) {
      this.localStorage.removeItem(id)
      delete this.products[id]
    }
  }

  @action async changeAmount(id, amount) {
    if (this.inCart(id)) {
      this.localStorage.setItem(id, amount)
      this.products[id] = { ...this.products[id], amount }
    }
  }
}