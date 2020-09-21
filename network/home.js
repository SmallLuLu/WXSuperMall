import ajax from '../network/ajax'

export function getMultidata(){
  return ajax({
    url:'/home/multidata'
  })
}
export function getGoodsdata(type,page){
  return ajax({
    url:'/home/data',
    data:{
      type:type,
      page:page
    }
  })
}

