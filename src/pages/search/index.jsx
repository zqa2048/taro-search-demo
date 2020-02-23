import Taro,{useState, useEffect, usePullDownRefresh, useReachBottom} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem, AtMessage } from 'taro-ui'
import './index.scss'

export default function PageView ()  {


  PageView.config={
    navigationBarTitleText: '测试',
    "enablePullDownRefresh": true,
    onReachBottomDistance:100

  }
  // 下拉刷新
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
    console.log('上拉加载，num:',num)
    if(key && (num > 1)){
      pullDown()
      Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 2500)
    }
    }
  )

  // 刷新页面
  const clear=()=>{
    setData([])
    setKey('')
    setNum(1)
    setRend([])
  }




  const [key, setKey] = useState('')
  const [num, setNum] = useState(1)
  const [data,setData] = useState([])
  const [rend, setRend] = useState([])
  const onChange = (e)=>{
    setKey(e)
    setNum(1)
    setData([])
    setRend([])
  }

  const pullDown=()=>{
    postData()
    setNum(num+1)
  }
  const onActionClick=()=>{
    if(key && num == 1){
      postData()
      setNum(num+1)
    }

    console.log('点击时候的 key:',key)
  }
  const postData =()=>{
    let dataProps = {
      'keyword':key,
      'pageNum': num
    }
    // taro 自带的方法
    Taro.request({
      url:`http://2l89512r05.zicp.vip/cloud-service/cross/test`,
      data:dataProps,
      method:'POST',
      mode:'cors',
      dataType:'json',
      responseType:'raw-JSON',
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
          Taro.showToast({
            title: '数据全部加载',
            icon:'success',
            duration: 1500
          })
        }
        console.log('初始化',data,'num是',num,res.data.result.current)
        console.log(rend.length)
      }

    })
  }

  useEffect(() => {
    console.log(key)
    return () => {

    };
  }, [key])

  useEffect(() => {
    if (data.length >= 1){
      let list = []
      data.map(it=>it.result.records.map(item=>{list.push(item)}))
      // console.log('list',list)
      setRend(list)
    }
    console.log('useEffect num',num)
    return () => {

    };
  }, [data,num])

  // const DataRender=(datas)=>{

  //   }


    const vStyleA = {
      height: '850px'
    }


    return (
      <View style={vStyleA}>
        {/* <View style='minHeight:100%'></View> */}
        <AtSearchBar
          actionName='搜一下'
          value={key}
          onChange={onChange}
          onActionClick={onActionClick}
          onClear={clear}
        />
           <AtList
             hasBorder
           >
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
