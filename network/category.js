import ajax from '../network/ajax'

export function getCategory() {
  return ajax({
    url: '/category'
  })
}
export function getSubcategory(maitKey) {
  return ajax({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}
export function getCategoryDetail(miniWallkey, type) {
  return ajax({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}