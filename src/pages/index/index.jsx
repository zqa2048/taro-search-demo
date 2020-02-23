import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goToSearch(){
    Taro.navigateTo({url:'/pages/search/index'})
  }
  render () {
    return (
      <View className='index'>
        <AtButton type='primary' size='normal' onClick={this.goToSearch}>搜索</AtButton>
      </View>
    )
  }
}
