import cartStore from './cart'
import phonesStore from './phones'
import orderStore from './order'
import TvStore from './televisions'
import TabletsStore from './tablets'

import * as phones from '../serverApiModel/phones'
import * as tablets from '../serverApiModel/tablets'
import * as televisions from '../serverApiModel/televisions'
import * as apiCart from '../serverApiModel/cart'

class RootStore {
  constructor() {
    this.api = {
      phones,
      tablets,
      televisions,
      apiCart
    }

    //dev base url
    /* this.baseUrlImgs = {
      phones: '/assets/imgs/phones/',
      televisions: '/assets/imgs/televisions/',
      tablets: '/assets/imgs/tablets/'
    } */

    //dist base url. for gitHub page
    this.baseUrlImgs = {
      phones: 'ReactAppStore/dist/assets/imgs/phones/',
      televisions: 'ReactAppStore/dist/assets/imgs/televisions/',
      tablets: 'ReactAppStore/dist/assets/imgs/tablets/'
    }

    this.localStorage = localStorage
    this.cart = new cartStore(this)
    this.phones = new phonesStore(this)
    this.order = new orderStore(this)
    this.televisions = new TvStore(this)
    this.tablets = new TabletsStore(this)
  }
}

export default new RootStore()