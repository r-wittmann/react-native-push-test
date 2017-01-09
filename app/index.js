import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Picker,
  AppState
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import PushController from './PushController'

export default class RNTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 5
    }
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange (appState) {
    if (appState === 'background') {
      PushNotification.localNotificationSchedule({
        message: 'My Notification Message',
        date: new Date(Date.now() + (this.state.seconds * 1000))
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          TimePicker
        </Text>
        <Text style={styles.instructions}>
          Choose your timeout
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({ seconds })}
        >
          <Picker.Item label='5' value={5} />
          <Picker.Item label='10' value={10} />
          <Picker.Item label='15' value={15} />
        </Picker>
        <PushController />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  picker: {
    width: 100
  }
})
