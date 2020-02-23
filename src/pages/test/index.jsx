import Taro,{useState, useEffect, usePullDownRefresh, useReachBottom} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default function PageView ()  {


  PageView.config={
    navigationBarTitleText: '测试',
    "enablePullDownRefresh": true,
    onReachBottomDistance:100

  }

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
  useReachBottom(()=>{
    console.log('上拉加载，num:',num)
    if(key){
      pullDown()
    }
    Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 2500);
  })

  const clear=()=>{
    setData([])
    setKey('')
    setNum(1)
    setRend([])
  }





  const onScrollToUpper = (e) => {

    console.log(e.detail)
    setData([])
    setKey('')
    setNum(1)
    setRend([])


    Taro.showLoading({
      title: '刷新中'
    })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    }, 1000);


  }
  const onScrollToLower =(e) =>{
    if(key){
      pullDown()
    }
    console.log(e.detail)
    Taro.showLoading({
      title: '加载中'

    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 2000);
  }

  function onScroll(e){
    console.log(e.detail.scrollTop)
  }

  const [key, setKey] = useState('农')
  const [num, setNum] = useState(1)
  const [data,setData] = useState([])
  const [rend, setRend] = useState([])
  const onChange = (e)=>{
    setKey(e)
  }

  const pullDown=()=>{
    postData()
    setNum(num+1)
  }
  const onActionClick=()=>{
    postData()
    console.log('点击时候的 key:',key)
  }
  const postData =()=>{
    let dataProps = {
      'keyword':key,
      'pageNum': num
    }

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
        // console.log(res.data)
        if(res.data.result.current <= 1){
          setData([res.data])
          console.log('初始化',data)
        }else if(res.data.result.pages +1 >= res.data.result.current){
          let datas = res.data
          setData([...data,datas])
          console.log('合并后',data,'num是',num,res.data.result.current)
        }
        if(res.data.result.pages +1 < num){
          Taro.showToast({
            title: '数据全部加载',
            icon:'success',
            duration: 2000
          })
        }
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
    return () => {

    };
  }, [data])

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
          onClear={()=>clear()}
        />
           <AtList>
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
