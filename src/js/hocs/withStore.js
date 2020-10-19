import { observer, inject } from 'mobx-react'

export default function (Component) {
	return inject('rootStore')(observer(Component))
}