import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';

export interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

class Touch extends React.Component<HomeScreenProps, object> {
  constructor(props: any) {
    super(props);
  }

  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  scale = new Animated.Value(1);
  handleGestureMove = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );
  _onGestureChangeMove = (evt: any) => {
    let { nativeEvent } = evt;
    Alert.alert('Drag Touch Working Fine', '', [
      { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
    ]);
  };

  render() {
    let circleTransformStyle;
    circleTransformStyle = {
      transform: [
        { translateY: this.translateY },
        { translateX: this.translateX },
      ],
    };
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <PanGestureHandler
            onGestureEvent={this.handleGestureMove}
            onEnded={this._onGestureChangeMove}>
            <Animated.View style={[styles.circle, circleTransformStyle]}>
              <Text style={styles.textStyle}>Drag</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  circle: {
    width: 150,
    height: 150,
    marginTop: 650,
    backgroundColor: '#c00000',
    borderRadius: 100,
    alignSelf: 'center',
  },

  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    paddingTop: 60,
  },
});

export default Touch;
