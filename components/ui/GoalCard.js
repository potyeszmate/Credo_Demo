/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import * as Progress from 'react-native-progress';

const GoalCard = ({ goal, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(true);

  let progressValue = 0
  let remainingAmount = 0

  if(goal.Current_Ammount < 1 || goal.Current_Ammount == null || goal.Current_Ammount == undefined ){
    progressValue = 0.0;
    remainingAmount = goal.Total_Ammount;
  }else{
    progressValue = goal.Current_Ammount / goal.Total_Ammount;
    remainingAmount = goal.Total_Ammount - goal.Current_Ammount;
  }
  

  return (
    <View style={styles.cardContainer}>
      {/* First Row */}
      <View style={styles.rowContainer}>
        <Text style={styles.goalName}>{goal.Name}</Text>
        <View style={styles.iconContainer}>
          {/* Edit Icon */}
          <TouchableOpacity onPress={() => onEdit(goal)}>
            <Feather name="edit" size={24} color="#1A1A2C" style={styles.icon} />
          </TouchableOpacity>
          {/* Delete Icon */}
          <TouchableOpacity onPress={() => onDelete(goal)}>
            <Feather name="trash-2" size={24} color="#FF5733" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Second Row */}

      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progressValue}
          width={Math.round(Dimensions.get('window').width * 0.82)}
          height={12}
          color={'#1A1A2C'}
          borderRadius={10}
        />
      </View>

      {/* Third Row */}
      <View style={styles.rowContainer}>
      <Text style={[styles.amountTextCurrent, { color: '#1A1A2C' },]}>${goal.Current_Ammount}</Text>

      <View style={styles.rightPart}>
        <Text style={[styles.remainingAmount, { color: '#7E8086', marginRight: 4 }]}>${remainingAmount}</Text>
        <Text style={[styles.amountText, { color: '#7E8086', marginLeft: 4 }]}>left of</Text>
        <Text style={[styles.amountTextTotal, { color: '#1A1A2C', marginLeft: 4 }]}>${goal.Total_Ammount}</Text>
      </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 12,
  },
  rightPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalName: {
    fontSize: 16,
    color: '#1A1A2C',
  },
  goalDate: {
    fontSize: 16,
    color: '#7E8086',
  },
  progressBarContainer: {
    marginBottom: 8,
    marginLeft: -1,

  },
  remainingAmount: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    color: '#1A1A2C'
  },
  amountTextCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2C',
  },
  amountTextTotal: {
    fontSize: 16,
    color: '#1A1A2C'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
});

export default GoalCard;
