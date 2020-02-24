const throttle=(fn, threshold)=> {
  let flag = true
  return (...args)=>{
    if (!flag) return
    flag=false
    setTimeout(() => {
      fn.apply(this,args)
      console.log('这里是节流器')
      flag=true
    }, threshold);
  }
}

export default throttle
