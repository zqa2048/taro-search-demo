import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
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

  goTo(){
    Taro.navigateTo({url:'/pages/search/index'})
  }
  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Button onClick={this.goTo}>搜索</Button>
      </View>
    )
  }
}
