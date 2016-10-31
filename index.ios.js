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
  ScrollView,
  Image,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import { Container, Header, Content, Title, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Api } from './api';

class EventView extends Component {
  state = {
    liked: false,
  }

  dayOfWeekToString(days) {
    const weekday = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ];
    if (days.length == 1) {
      return weekday[days[0]];
    }
    if (days.length == 2) {
      return weekday[days[0]] + ', ' + weekday[days[1]];
    }
    else return "Varios días";
  }

  dayOfWeek() {
    const weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    const event = this.props.event;
    if (event.datetime) {
      return this.dayOfWeekToString([new Date(event.datetime).getDay()]);
    }
    return event.shows[0].weekdays;
  }
  render() {
    const Touchable = (Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback);

    return (
      <Touchable onPress={() => this.props.navigator.push({ id: 'event', event: this.props.event })}>
      <View>
        <Image style={styles.image} source={{ uri: this.props.event.image }}>
          <Button transparent style={styles.button} onPress={() => this.setState({ liked: !this.state.liked })}>
            <Icon style={styles.favorite} name={ this.state.liked ? 'favorite' : 'favorite-border' } />
          </Button>

          <View style={styles.date}>
            <Text style={styles.dateText}>{this.dayOfWeek()}</Text>
          </View>
          <View style={styles.age}>
            <Text style={styles.ageText}>Edades{"\n"}{this.props.event.age_min}-{this.props.event.age_max}</Text>
          </View>
        </Image>
        <View style={styles.eventFooter}>
          <Text style={styles.eventFooterText}>{this.props.event.title}</Text>
          <Text>See more</Text>
        </View>
      </View>
      </Touchable>
    )
  }
}

class FullEventView extends EventView {
  state = {
  }

  render() {
    const Touchable = (Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback);

    return (
      <View style={styles.fullEvent}>
        <Image style={styles.image} source={{ uri: this.props.event.image }}>
          <Button transparent style={styles.button} onPress={() => this.setState({ liked: !this.state.liked })}>
            <Icon name={ this.state.liked ? 'favorite' : 'favorite-border' } />
          </Button>

          <View style={styles.date}>
            <Text style={styles.dateText}>{this.dayOfWeek()}</Text>
          </View>
          <View style={styles.age}>
            <Text style={styles.ageText}>Edades{"\n"}{this.props.event.age_min}-{this.props.event.age_max}</Text>
          </View>
        </Image>
        <View style={styles.eventFooter}>
          <Text style={styles.eventFooterText}>{this.props.event.title}</Text>
        </View>
        <View style={ styles.details }>
          <Text>{this.props.event.description}
          </Text>
          <Text>{this.props.event.url}
          </Text>
          <Button transparent >
            <Icon name="pin"/>
            <Text>{this.props.event.location_name}</Text>
          </Button>
          <Button>
            <Icon name="share"/>
            <Text>Share with friends</Text>
          </Button>
          <Button>
            <Icon name="calendar"/>
            <Text>Add to calendar</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class HomeView extends Component {
  state = {
    events: []
  }

  showSettings() {
  }

  showFavorites() {
  }

  render() {
    let list = this.state.events.map(
      (event) => (<EventView navigator={this.props.navigator} key={event._id} event={event}></EventView>)
     );
    return (
      <ScrollView style={styles.home}>
         {list}
      </ScrollView>
    );
  }

  componentWillMount() {
    Api.getEvents().then(data => {
      this.setState({events: data});
    });
  }
}

class kidslists extends Component {
  showSettings() {
  }

  showFavorites() {
  }

  _renderScene(route, navigator) {
    if (route.id == 'home') return <HomeView navigator={navigator}></HomeView>;
    else return <FullEventView navigator={navigator} event={route.event}></FullEventView>;
  }

  _navigationBar() {
     return (<Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          { return (
          <Button transparent onPress={() => {
            if (route.id !== 'home') { navigator.pop(); }
            else navigator.push({ id: 'settings' });
          }}><Text style={styles.textBar}>{route.event ? 'Back' : 'Filter' }</Text></Button>);
          },
         RightButton: (route, navigator, index, navState) =>
           { return (route.id == 'home' ? <Button transparent onPress={() => { }}><Icon style={styles.favorite} name='favorite' /></Button> : <View/>); },
         Title: (route, navigator, index, navState) =>
           { return (<Text style={styles.textBar}>{route.event ? route.event.title : 'Home' }</Text>); },
       }}
       style={styles.bar}
     />);
  }

  render() {
    let navigator = (
      <Navigator
        renderScene={ this._renderScene }
        navigationBar={ this._navigationBar() }
        initialRoute={{ id: 'home' }}
        configureScene={ () => Navigator.SceneConfigs.FloatFromBottom }>
      </Navigator>
    );
    _navigator = navigator;
    return navigator;
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  eventFooter: {
    flexDirection: 'row',
  },
  eventFooterText: {
    flexGrow: 1,
    padding: 3,
    fontSize: 18,
  },
  details: {
    padding: 10,
  },
  events: {
    color: 'blue',
  },
  image: {
    height: 120,
  },
  button: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  date: {
    position: 'absolute',
    backgroundColor: 'rgba(0.6, 0.6, 0.6, 0.6)',
    padding: 5,
    left: 0,
    top: 20,
  },
  dateText: {
    color: 'white',
  },
  age: {
    position: 'absolute',
    backgroundColor: 'rgba(0.6, 0.6, 0.6, 0.6)',
    padding: 5,
    right: 0,
    bottom: 20,
  },
  ageText: {
    color: 'gold',
    fontWeight: 'bold',
  },
  home: {
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  fullEvent: {
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  bar: {
    backgroundColor: 'white',
  },
  textBar: {
    fontSize: 16,
    marginVertical: 8,
  },
  favorite: {
    color: 'red',
    fontSize: 18,
  }
});

AppRegistry.registerComponent('kidslists', () => kidslists);
