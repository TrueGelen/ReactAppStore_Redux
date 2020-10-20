export const baseUrlAssets = 'ReactAppStore/dist/'
// export const baseUrlAssets = '/'
//dev base url
export const baseUrlImgs = {
  phones: `${baseUrlAssets}assets/imgs/phones/`,
  televisions: `${baseUrlAssets}assets/imgs/televisions/`,
  tablets: `${baseUrlAssets}assets/imgs/tablets/`
}

//dist base url. for gitHub page
/* export const baseUrlImgs = {
	phones: 'ReactAppStore/dist/assets/imgs/phones/',
	televisions: 'ReactAppStore/dist/assets/imgs/televisions/',
	tablets: 'ReactAppStore/dist/assets/imgs/tablets/'
} */

export const productLabelsForStores = {
  television: {
    diagonal: 'Диагональ',
    hz: 'Частота обновления экрана (Гц)',
    screenResolution: 'Разрешение экрана',
    wifi: 'Wi-Fi',
    about: 'О товаре'
  },
  phones: {
    diagonal: "Диагональ",
    frontCamera: "Фронтальная камера (МП)",
    mainCamera: "Основная камера (МП)",
    processor: "Процессор",
    memory: "Объем памяти (Гб)",
    about: 'О товаре'
  },
  tablets: {
    diagonal: "Диагональ",
    frontCamera: "Фронтальная камера (МП)",
    mainCamera: "Основная камера (МП)",
    processor: "Процессор",
    memory: "Объем памяти (Гб)",
    about: 'О товаре'
  }
}

