import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";
import {
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import AgendaItem from "@/components/psicologo/agendaItem";
import Header from "@/components/geral/header";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const mockAgendaPsicologo = async (psicologoId) => {
  return {
    pacientes: [
      {
        id: 1,
        data: "2025-02-13",
        hora: "10:00",
        tipo: "Consulta",
        nome: "Paciente A",
      },
      {
        id: 2,
        data: "2025-02-14",
        hora: "14:00",
        tipo: "Acompanhamento",
        nome: "Paciente B",
      },
      {
        id: 3,
        data: "2025-02-13",
        hora: "08:00",
        tipo: "Reunião",
        nome: "Equipe",
      },
      {
        id: 4,
        data: "2025-02-14",
        hora: "16:00",
        tipo: "Supervisão",
        nome: "Supervisão Clínica",
      },
    ],
    rotinas: [
      {
        id: 5,
        data: "2025-02-13",
        hora: "12:00",
        tipo: "Reunião interna",
        nome: "Discussão de casos",
      },
      {
        id: 6,
        data: "2025-02-15",
        hora: "09:00",
        tipo: "Planejamento",
        nome: "Definição de estratégias",
      },
    ],
  };
};

const Agenda = () => {
  const usuarioAtual = { id: 1, nome: "Dra. Psicóloga" };
  const [items, setItems] = useState({ pacientes: {}, rotinas: {} });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [markedDates, setMarkedDates] = useState({
    [selectedDate]: { selected: true, marked: true, selectedColor: "#F37187" },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    time: new Date(),
    type: "",
    name: "",
  });

  useEffect(() => {
    if (usuarioAtual) {
      loadItems();
    }
  }, [usuarioAtual]);

  const loadItems = async () => {
    if (!usuarioAtual) return;

    const psicologoId = usuarioAtual.id;
    const agendaData = await mockAgendaPsicologo(psicologoId);

    const pacientes = {};
    const rotinas = {};

    agendaData.pacientes.forEach((entry) => {
      const strTime = entry.data;
      if (!pacientes[strTime]) {
        pacientes[strTime] = [];
      }
      pacientes[strTime].push(entry);
    });

    if (agendaData.rotinas) {
      agendaData.rotinas.forEach((entry) => {
        const strTime = entry.data;
        if (!rotinas[strTime]) {
          rotinas[strTime] = [];
        }
        rotinas[strTime].push(entry);
      });
    }

    setItems({ pacientes, rotinas });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#F37187",
      },
    });
  };

  const handleSaveAppointment = () => {
    setModalVisible(false);
    if (Platform.OS === "android") {
      ToastAndroid.show(
        "Compromisso adicionado com sucesso!",
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert("Sucesso", "Compromisso adicionado com sucesso!");
    }
  };

  return (
    <CalendarProvider date={selectedDate} showTodayButton>
      <Header corFundo={"#F37187"} href="psicologo/home" />
      <WeekCalendar
        style={{ height: 100 }} // Define altura fixa para evitar sumiço dos números
        markedDates={markedDates}
        firstDay={1}
        hideExtraDays={false} // Mantém os dias visíveis
        allowFontScaling={false} // Evita que a escala da fonte esconda os dias
        onDayPress={handleDayPress}
        disableAllTouchEventsForDisabledDays={false} // Permite interação com os dias desativados
        renderHeader={(date) => (
          <Text style={styles.monthText}>{date.toString("MMMM yyyy")}</Text>
        )}
        theme={{
          calendarBackground: "#FFFFFF", // Garante fundo branco para melhor contraste
          textDayFontFamily: "Poppins-Regular",
          textMonthFontFamily: "Poppins-Regular",
          textDayHeaderFontFamily: "Poppins-Regular",
          textDayStyle: { fontSize: 16, color: "#000" }, // Ajusta tamanho e cor dos dias
          todayTextColor: "#F37187",
          selectedDayBackgroundColor: "#F37187",
          selectedDayTextColor: "#ffffff",
          textDisabledColor: "#a3a3a3", // Garante que os dias desativados ainda fiquem visíveis
          dayTextColor: "#000000", // Garante que os números dos dias estejam sempre visíveis
          arrowColor: "#F37187", // Cor das setas de navegação
          monthTextColor: "#000", // Cor do mês
          indicatorColor: "#F37187", // Cor do indicador de carregamento
        }}
      />

      <Text style={styles.sectionTitle}>Pacientes</Text>
      <AgendaList
        sections={Object.keys(items.pacientes).map((key) => ({
          title: key,
          data: items.pacientes[key] || [],
        }))}
        renderItem={({ item }) => <AgendaItem item={item} />}
      />
      <Text style={styles.sectionTitle}>Rotinas do Cotidiano</Text>
      <AgendaList
        sections={Object.keys(items.rotinas).map((key) => ({
          title: key,
          data: items.rotinas[key] || [],
        }))}
        renderItem={({ item }) => <AgendaItem item={item} />}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floatingButton}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Compromisso</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Compromisso"
              placeholderTextColor={"#e63946"}
              value={newAppointment.type}
              onChangeText={(text) =>
                setNewAppointment((prev) => ({ ...prev, type: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nome do Compromisso"
              placeholderTextColor={"#e63946"}
              value={newAppointment.name}
              onChangeText={(text) =>
                setNewAppointment((prev) => ({ ...prev, name: text }))
              }
            />
            <View style={{ flexDirection: "row", gap: 20, margin: 5 }}>
              <Button
                contentStyle={[styles.botao, { backgroundColor: "#F43F5E" }]}
                labelStyle={{ fontFamily: "Poppins-Regular", color: "white" }}
                onPress={() => setModalVisible(false)}
              >
                Cancelar
              </Button>
              <Button
                contentStyle={[styles.botao, { backgroundColor: "#8dcc28" }]}
                labelStyle={{ fontFamily: "Poppins-Regular", color: "white" }}
                onPress={handleSaveAppointment}
              >
                Salvar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    color: "#F37187",
    fontFamily: "Poppins-Light",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F37187",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "Poppins-Light",
  },
  input: {
    borderWidth: 1,
    borderColor: "#F37187",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    borderRadius: 15,
    fontFamily: "Poppins-Light",
    color: "grey",
    backgroundColor: "#FFF9F9",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F37187",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  botao: {
    borderRadius: 5,
  },
  date: {
    backgroundColor: "#E8E8E8",
    padding: 5,
    borderRadius: 5,
    fontFamily: "Poppins-Light",
  },
});

export default Agenda;
