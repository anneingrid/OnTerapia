import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-paper';

const AgendaItem = ({ item }) => {
  
  const formatoDuracao = (duracao) => {
    if (!duracao) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#477BDE" />
        </View>
      );
    }
    const [hours, minutes] = duracao.split(':').map(Number);
    return hours > 0 ? `${hours}h` : `${minutes}m`;
  };

  const getInitials = (name = '') => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getRandomColor = (name = '') => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return `#${((hash & 0xffffff) << 5).toString(16).padStart(6, '0')}`;
  };

  return (
    <View style={styles.item}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View style={{ alignItems: 'center', marginRight: 10 }}>
          <Text style={styles.itemText}>{item.hora ? item.hora.substring(0, 5) : '--:--'}</Text>
          <Text style={styles.itemText2}>1h</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.sessaoText, { color: 'black' }]}>
            {item.tipo}: <Text style={{ fontFamily: 'Poppins-Medium' }}>{item.nome}</Text>
          </Text>
        </View>
        <Avatar.Text
          size={32}
          label={getInitials(item.nome)}
          labelStyle={{ fontFamily: 'Poppins-Light', fontWeight: 'bold' }}
          style={{ backgroundColor: getRandomColor(item.nome) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText2: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  sessaoText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgendaItem;
