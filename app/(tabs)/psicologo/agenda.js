import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import AgendaItem from '@/components/psicologo/agendaItem';
import { useAppContext } from '@/components/provider';
import Header from '@/components/geral/header';

const getMarkedDates = (availableDates) => {
  const markedDates = {};
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Marcar todas as datas como indisponíveis por padrão, começando pelo dia atual
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    markedDates[dateString] = { disabled: true, disableTouchEvent: true };
  }

  // Marcar as datas disponíveis conforme a agenda
  availableDates.forEach(item => {
    const date = item.data;
    const agendaId = item.idSessao;
    const horario = item.hora_inicio;
    markedDates[date] = {
      disabled: false,
      disableTouchEvent: false,
      dotColor: '#89CC24',
      marked: true,
      agendaId: agendaId,
      horario: horario
    };
  });

 
  return markedDates;
};

const Agenda = () => {
  const { usuarioAtual, AgendaPsicologo } = useAppContext();
  const [markedDates, setMarkedDates] = useState({});
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (usuarioAtual) {
      loadItems();
    }
  }, [usuarioAtual]);

  const loadItems = async () => {
    if (!usuarioAtual) {
      return;
    }

    const psicologoId = usuarioAtual.id;
    const agendaData = await AgendaPsicologo(psicologoId);

    const items = {};
    const formatTime = (time) => {
      return new Date(`1970-01-01T${time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    agendaData.forEach((entry) => {
      const strTime = entry.data;
      if (!items[strTime]) {
        items[strTime] = [];
      }

      items[strTime].push({
        entry
      });
    });

    setItems(items);

    const markedDates = getMarkedDates(agendaData);
    setMarkedDates(markedDates);

    // Set the initial selected date to the first available date
    const firstAvailableDate = Object.keys(markedDates).find(date => !markedDates[date].disabled) || selectedDate;
    setSelectedDate(firstAvailableDate);
  };

  const renderCustomHeaderTitle = () => (
    <Text style={styles.customHeaderTitle}>Custom Header Title</Text>
  );

  return (
    <CalendarProvider
      date={selectedDate}
      showTodayButton
      customHeader={renderCustomHeaderTitle}
      theme={{
        backgroundColor: '#fff',
        selectedDayBackgroundColor: '#477BDE'
      }}
    >
      <Header corFundo={"#F43F5E"} href='psicologo/home'></Header>
      <WeekCalendar
        customHeaderTitle={renderCustomHeaderTitle}
        markedDates={markedDates}
        hideKnob
        firstDay={1}
        theme={{
          textDayFontFamily: 'Poppins-Light',
          textDayFontSize: 14,
          textMonthFontFamily: 'Poppins-Medium',
          textDayHeaderFontFamily: 'Poppins-Light',
          backgroundColor: '#fff',
          textMonthFontSize: 15,
          selectedDayBackgroundColor: '#F43F5E'
        }}
        style={styles.sombra}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
      <AgendaList
        sections={Object.keys(items).map(key => ({ title: key, data: items[key] }))}
        renderItem={({ item }) => <AgendaItem item={item} />}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  section: {
    color: 'grey',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Light',
    borderColor: '#e3e1e1',
    borderBottomWidth: 1,
  },
  customHeaderTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#477BDE',
  },
  sombra: {
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    // Sombra para iOS
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  }
});

export default Agenda;
