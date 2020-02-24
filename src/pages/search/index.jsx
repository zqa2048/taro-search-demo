import Taro,{useState, useEffect, usePullDownRefresh, useReachBottom} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default function SearchPage ()  {

  SearchPage.config={
    navigationBarTitleText: '搜索',      // 页面标题
    enablePullDownRefresh: true,        // 这个是启用下拉刷新特性
    backgroundTextStyle: "dark",        // 把显示的文本颜色改成暗色调,亮色的话.你背景不改看不到,因为同色
    backgroundColor:'#f7f7f7',          // 页面的背景色
    onReachBottomDistance:100           // 滑动距离
  }

  const [key, setKey] = useState('')    // 监听用户输入
  const [num, setNum] = useState(1)     // 当前的页面数
  const [data,setData] = useState([])   // 请求来的原始数据
  const [rend, setRend] = useState([])  // 将请求来的数据取出需要的
  let timeEnd = null                  // 防抖定时器

  // 下拉刷新loading
  usePullDownRefresh(()=>{
    console.log('下拉刷新')
    clear()
    Taro.showLoading({
      title: '刷新中'
    })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    }, 1000);
  })

  // 上拉加载更多
  useReachBottom(()=>{
    console.log('上拉加载')
    ToastLoading('加载中')
    if(key && num > 1){
      clearTimeout(timeEnd)
      timeEnd = setTimeout(() => {
        pullDown()
      }, 1600);
    }else if (!key){
      ToastLoading('请输入')
    }else if(num<=1){
      ToastLoading('请点击按钮')
    }
    })

  // loading
  const ToastLoading=(text,type = 'loading',date = 1500)=>{
    Taro.showToast({
      title: text,
      icon: type,
      duration: date,
      mask: 'true'
    })
  }

  // 刷新页面
  const clear=()=>{
    setData([])
    setKey('')
    setNum(1)
    setRend([])
  }

  // 搜索框文字改变时
  const onChange = (e)=>{
    setKey(e)
    setNum(1)
    setData([])
    setRend([])
  }

  // 下拉后执行的操作
  const pullDown=()=>{
    postData()
    setNum(num+1)
  }
  // 点击搜索按钮
  const onActionClick=()=>{
    setNum(1)
    if(key && num == 1){
      postData()
      setNum(num+1)
    }
  }
  // 请求数据
  const postData =()=>{
    let dataProps = {
      'keyword':key,
      'pageNum': num
    }
    // taro 自带的请求方法
    Taro.request({
      url:`http://2l89512r05.zicp.vip/cloud-service/cross/test`,
      data:dataProps,
      method:'POST',
      mode:'cors',
      dataType:'json',
      header:{
        'Content-Type': 'application/json;charset=UTF-8'
      },
      success:(res)=>{
        // 如果当前的页数 <= 1; 即第一次请求数据, 放入data第一条数据
        // 如果当前的页数 <= 总的页数, 追加数据
        if(res.data.result.current <= 1){
          setData([res.data])
        }else
        if(res.data.result.pages  >= res.data.result.current){
          let datas = res.data
          setData([...data,datas])
        }
        if(res.data.result.pages  <= num-1){
          ToastLoading('加载完毕','success')
        }
      }
    })
  }

  // 当请求到数据时,将请求的数据做一次处理,存入数组
  useEffect(() => {
    if (data.length >= 1){
      let list = []
      data.map(it=>it.result.records.map(item=>{list.push(item)}))
      // console.log('list',list)
      setRend(list)
    }
  }, [data])

 const vStyleA = {
      height: '850px'
    }

    return (
      <View style={vStyleA}>
        <AtSearchBar
          actionName='搜一下'
          value={key}
          onChange={onChange}
          onActionClick={onActionClick}
          onClear={clear}
        />
           <AtList hasBorder>
            {
             rend.length >= 1 ? rend.map(
               item=><AtListItem key={item.id} title={item.text} />
               )
             : null
            }
            </AtList>
    </View>
    )
}
