import ajax from '../network/ajax'

export function getMultidata(){
  return ajax({
    url:'/home/multidata'
  })
}

