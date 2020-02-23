import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import './index.scss'

const Search = () => {



  const [key, setKey] = useState('')
  const [num, setNum] = useState(null)
  const [data,setData] = useState({})
  const onChange = (e)=>{
    setKey(e)
  }

  const onActionClick=()=>{
    postData()
    console.log('点击时候的 key:',key)
  }
  const postData =()=>{
    let dataProps = {
      'keyword':key,
      'pageNum': num ? num : 1
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
        console.log(res.data)
        setData(res.data)
      }

    })
  }

  useEffect(() => {
    console.log(key)
    return () => {

    };
  }, [key])

  const scrollStyle={
    height: '600px'
  }
  const Threshold = 10
  const scrollTop = 0
  const onScrollToUpper=(e)=>{
    console.log(e.detail)
  }
  const onScrollToLower=(e)=>{
    console.log(e.detail)
  }
  const onScroll=(e)=>{
    console.log(e)
  }
  return (
    <ScrollView
      className='scrollView'
      scrollY
      scrollWithAnimation
      scrollTop={scrollTop}
      style={scrollStyle}
      lowerThreshold={Threshold}
      upperThreshold={Threshold}
      onScrollToUpper={onScrollToUpper}
      onScrollToLower={onScrollToLower}
      onScroll={onScroll}
    >
      <View>
        <AtSearchBar
          actionName='搜一下'
          value={key}
          onChange={onChange}
          onActionClick={onActionClick}
          onClear={(e)=>console.log('清楚',e)}
        />

        <AtList style={{height:'700px'}}>
        {
          data.code === 0 ? data.result.records.map(
            item=><AtListItem
              key={item.id}
              title={item.text}
            />
          ) : null

        }

      </AtList>
      </View>
      </ScrollView>
  )

}
export default Search
