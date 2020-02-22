import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'
// import { axios } from 'taro-axios'
import service from '../../utils/service'

const Search = () => {



  const [key, setKey] = useState('')
  const [num, setNum] = useState(null)
  // const [data,setData] = useState({})
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
      url:service,
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

  return (
    <View className='search'>
      <Text>Hello world!</Text>
      <AtSearchBar
        actionName='搜一下'
        value={key}
        onChange={onChange}
        onActionClick={onActionClick}
        onClear={(e)=>console.log('清楚',e)}
      />




    </View>
  )

}
export default Search
