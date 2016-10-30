/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

import { Api } from './api';

class EventView extends Component {
  state = {
    liked: false,
  }

  render() {
    const Touchable = (Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback);

    return (
      <View>
        <Image style={styles.image} source={{ uri: this.props.event.image }} />
        <Text style={{color: 'blue'}}>{this.props.event.title}</Text>
        <Touchable onPress={() => this.setState({liked: true}) }>
          <Image style={{height: 20, width: 20 }} source={ this.state.liked ? require('./img/heart_full.png') : require('./img/heart_empty.png') }></Image>
        </Touchable>
      </View>
    )
  }
}
export default class kidslists extends Component {
  state = {
    events: []
  }

  render() {
    let list = this.state.events.map(
      (event) => (<EventView event={event}></EventView>)
     );
    return (
      <ScrollView>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          { this.state.events.length }
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        {list}
      </ScrollView>
    );
  }

  componentWillMount() {
    const events = [ {
      "id": "1",
      "title": "Museo del Prado",
      "age": 12,
      "image": "http://get10things.com/wp-content/uploads/2014/10/del-prado1.jpg",
      }, {
      "id": "2",
      "title": "Parque del Espacio",
      "age": 3,
      "image": "http://www.colegio-santagema.es/blog/wp-content/uploads/2014/08/parque-el-espacio-en-alcobendas.png",
    } ];
    this.setState({events: events});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  events: {
    color: 'blue',
  },
  image: {
    height: 100,
    width: 100,
  }
});

AppRegistry.registerComponent('kidslists', () => kidslists);
