/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Graph from './graph';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startNode: null,
      endNode: null,
      path: "",
    };
  };

  updatePath = function () {
    if ((this.state.startNode != null) && (this.state.endNode != null)) {
      let map;
      map = new Graph();

      let floorPlan = [];
      floorPlan.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1]);
      floorPlan.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      //console.log(floorPlan)
      for (i = 0; i < 13; i++) {
        for (j = 0; j < 20; j++) {
          if (floorPlan[i][j] == 1) {
            let current = 20 * i + j;
            let up = 20 * (i - 1) + j;
            let upPrevious = (20 * (i - 1) + j - 1);
            let upNext = (20 * (i - 1) + j + 1);
            let Previous = (20 * (i) + j - 1);
            map.addNode(`${current}`);
            if (j == 0) {
              if (floorPlan[i - 1][j] == 1) {
                map.addEdge(`${up}`, `${(current)}`, 1);
              }
              if (floorPlan[i - 1][j + 1] == 1) {
                map.addEdge(`${upNext}`, `${(current)}`, 1.5)
              }
            }
            else {
              if (floorPlan[i][j - 1] == 1) {
                map.addEdge(`${Previous}`, `${(current)}`, 1)
              }
              if (floorPlan[i - 1][j - 1] == 1) {
                map.addEdge(`${upPrevious}`, `${(current)}`, 1.5)
              }
              if (floorPlan[i - 1][j] == 1) {
                map.addEdge(`${up}`, `${(current)}`, 1);
              }
              if (floorPlan[i - 1][j + 1] == 1) {
                map.addEdge(`${upNext}`, `${(current)}`, 1.5)
              }
            }
          }
        }
      }
      // console.log(map.adjacencyList[56]);
      // start = 56;
      // end = 259;
      let newpath = map.findPathWithDijkstra(`${this.state.startNode}`, `${this.state.endNode}`);
      let direction = [];
      let i;
      for (i = 0; i < newpath.length - 1; i++) {
        if (newpath[i + 1] - newpath[i] == 20) {
          direction.push("Move Forward");
        }
        else if (newpath[i + 1] - newpath[i] == 21) {
          direction.push("Move Left Diagonal");
        }
        else if (newpath[i + 1] - newpath[i] == 19) {
          direction.push("Move Right Diagonal");
        }
        else if (newpath[i + 1] - newpath[i] == 1) {
          direction.push("Move Left");
        }
        else if (newpath[i + 1] - newpath[i] == -1) {
          direction.push("Move Right");
        }
        else if (newpath[i] - newpath[i + 1] == 20) {
          direction.push("Move Backward");
        }
        else if (newpath[i] - newpath[i + 1] == 21) {
          direction.push("Move Backward Diagonally Right");
        }
        else if (newpath[i] - newpath[i + 1] == 19) {
          direction.push("Move Backward Diagonally Left");
        }
        else if (newpath[i] - newpath[i + 1] == 1) {
          direction.push("Move Right ");
        }
        else if (newpath[i] - newpath[i + 1] == -1) {
          direction.push("Move Left");
        }

        // direction.push("  ");
      }

      let temp = [];
      let steps =1 ;
      for (var j = 0; j < direction.length; j++) {

          if (direction[j]==direction[j+1]){
            steps ++;
          }else{
            temp.push(<Text style={styles.inditext}>{direction[j] + ` ${steps} Step(s) `}</Text>);
            steps =1;
          }  
      
        // console.log (temp);
      }

      // for (var j = 0; j < direction.length; j++) {
      //   var steps = 0;
      //   while (direction[i] == "Move Forward") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Left Diagonal") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Right Diagonal") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Left") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Right") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward Diagonally Right") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward Diagonally Left") {
      //     steps++;
      //   }
      // }

        // var dict = {};
      //   let array1=[];

      //   for (var j = 0; j < direction.length; j++) {
      //     var item = direction[j];
      //     // console.log(dict[item]);
      //     array1.push(item);
      //     dict[item] = array1.length;
      //     array1=[];
      //     // dict[item] = dict[item] + 1;
      // }
      // while(i<length){
      //   steps =0;
      //   while(a[i]==a[i+1]){
      //     steps++;
      //   }
      //   print(a[i-1],steps)
      // }

      // console.log(newdir);

      // console.log(path);
      this.setState({ path: temp });
      console.log (this.state.path);

    }
    // console.log (newpath);
    // if ((this.state.startNode != null) && (this.state.endNode != null)) {
    //   newpath = Graph.map.findPathWithDijkstra(`${this.state.startNode}`,`${this.state.endNode}`);
    //   this.setState({path: newpath});
    //   // console.log (newpath);
    // }
  };

  handleStart = (text) => {
    if (text=="W1"){
      text = 242;
    }

    else if (text=="G1"){
      text = 246;
    }

    else if (text=="R1"){
      text = 182;
    }

    else if (text=="I1"){
      text = 186;
    }

    else if (text=="S1"){
      text = 189;
    }

    else if (text=="I2"){
      text = 190;
    }

    else if (text=="G2"){
      text = 250;
    }

    else if (text=="C1"){
      text = 146;
    }
    else if (text=="C2"){
      text = 106;
    }

    else if (text=="S2"){
      text = 148;
    }

    else if (text=="S3"){
      text = 149;
    }

    else if (text=="S4"){
      text = 150;
    }

    else if (text=="M1"){
      text = 107;
    }

    else if (text=="M2"){
      text = 108;
    }

    else if (text=="M3"){
      text = 109;
    }

    else if (text=="F1"){
      text = 110;
    }

    this.setState({ startNode: text })
  }
  handleEnd = (text) => {
    if (text=="W1"){
      text = 242;
    }

    else if (text=="G1"){
      text = 246;
    }

    else if (text=="R1"){
      text = 182;
    }

    else if (text=="I1"){
      text = 186;
    }

    else if (text=="S1"){
      text = 189;
    }

    else if (text=="I2"){
      text = 190;
    }

    else if (text=="G2"){
      text = 250;
    }

    else if (text=="C1"){
      text = 146;
    }
    else if (text=="C2"){
      text = 106;
    }

    else if (text=="S2"){
      text = 148;
    }

    else if (text=="S3"){
      text = 149;
    }

    else if (text=="S4"){
      text = 150;
    }

    else if (text=="M1"){
      text = 107;
    }

    else if (text=="M2"){
      text = 108;
    }

    else if (text=="M3"){
      text = 109;
    }

    else if (text=="F1"){
      text = 110;
    }


    this.setState({ endNode: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter Start Node"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleStart} />

        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter End Node"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEnd} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => this.updatePath()
          }>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <Text style = {styles.textstyle}>{this.state.path}</Text>
      </View>
    )

  }


};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  textstyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
  // inditext: {
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   fontSize: 16,
  // }
})