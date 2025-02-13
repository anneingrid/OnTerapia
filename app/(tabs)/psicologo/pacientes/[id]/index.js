import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from '@/components/provider';
import Header from '@/components/geral/header';
import { Link } from 'expo-router';

const BarraProgresso = ({ totalSessoes, sessoesConcluidas }) => {
    return (
        <View style={styles.containerBarra}>
            {[...Array(totalSessoes)].map((_, i) => (
                <View
                    key={i}
                    style={[
                        styles.barra,
                        { backgroundColor: i < sessoesConcluidas ? '#7fc517' : '#E0E0E0' },
                    ]}
                />
            ))}
        </View>
    );
};

const sessions = [
    { id: 1, date: "13/02/2025", time: "10:00", completed: false },
    { id: 2, date: "12/02/2025", time: "14:30", completed: false },
    { id: 3, date: "11/02/2025", time: "16:15", completed: true },
    { id: 4, date: "10/02/2025", time: "09:45", completed: true },
];

const SessionCard = ({ date, time, completed }) => {
    return (
        <View style={styles.sessionCard}>
            <View>
            <Text style={styles.sessionDate}>{date} - {time} </Text>
            </View>
            <Text style={[styles.sessionStatus, { backgroundColor: completed ? '#7fc517' : '#F43F5E' }]}> 
                {completed ? "Concluída" : "Pendente"}
            </Text>
        </View>
    );
};

const SessionList = () => {
    return (
        <View style={styles.sessionWrapper}>
            <Text style={styles.sessionTitle}>Sessões</Text>
            <Card style={styles.sessionContainer}>
                {sessions.map((session) => (
                    <SessionCard key={session.id} date={session.date} time={session.time} completed={session.completed} />
                ))}
            </Card>
        </View>
    );
};

export default function PacienteDetalhes() {
    const { id } = useLocalSearchParams();
    const { pacientes, sessoes_por_paciente } = useAppContext();
    const [sessoes, setSessoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const paciente = pacientes.find(p => p.id === parseInt(id));

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const sessoes = await sessoes_por_paciente(id);
                setSessoes(sessoes);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar sessões:', error.message);
                setLoading(false);
            }
        };
        buscaDados();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#477BDE" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header corFundo={'#ED7A8B'} href='psicologo/index' style={styles.header}/>
            <Card style={styles.profileCard}>
                <View style={styles.profileContent}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" }} style={styles.imagemPerfil} />
                    <View style={styles.textContainer}>
                        <Text style={styles.nomePaciente}>{paciente.nome}</Text>
                        <Text style={styles.descricaoPaciente}>{paciente.idade} anos</Text>
                        </View>
                </View>
            </Card>
            <Card style={styles.iconeCard}>
                <View style={styles.iconeContainer}>
                    <View style={styles.iconeItem}>
                        <TouchableOpacity style={styles.iconeCirculoBorda}>
                            <Ionicons name="document-text" size={24} color="#F43F5E" />
                        </TouchableOpacity>
                        <Text style={styles.iconeTexto}>Anotações</Text>
                    </View>
                    <View style={styles.iconeItem}>
                        <TouchableOpacity style={styles.iconeCirculoBorda}>
                            <Ionicons name="chatbubble" size={24} color="#F43F5E" />
                        </TouchableOpacity>
                        <Text style={styles.iconeTexto}>Chat</Text>
                    </View>
                    <View style={styles.iconeItem}>
                        <TouchableOpacity style={styles.iconeCirculoBorda}>
                            <Ionicons name="information-circle" size={24} color="#F43F5E" />
                        </TouchableOpacity>
                        <Text style={styles.iconeTexto}>More info</Text>
                    </View>
                </View>
            </Card>
            <SessionList />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins-Light',
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        paddingVertical: 0,
    },
    header: {
        marginTop: 0,
        paddingTop: 0,
    },
    profileCard: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 15,
        padding: 20,
        marginVertical: 15,
        elevation: 3,
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexShrink: 1,
    },
    imagemPerfil: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    sessionDate: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-Light',
    },
    sessionTime: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-Light',
    },
    nomePaciente: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-Light',
    },
    descricaoPaciente: {
        fontSize: 14,
        color: '#666',
    },
    iconeCard: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        elevation: 3,
        alignItems: 'center',
        fontFamily: 'Poppins-Light',
    },
    iconeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        fontFamily: 'Poppins-Light',
    },
    iconeItem: {
        alignItems: 'center',
        padding: 12,
        fontFamily: 'Poppins-Light',
    },
    iconeCirculoBorda: {
        borderWidth: 2,
        borderColor: '#ED7A8B',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Light',
    },
    iconeTexto: {
        fontSize: 12,
        color: '#ED7A8B',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Poppins-Light',
    },
    botaoAgendar: {
        backgroundColor: '#ED7A8B',
        width: '90%',
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
        fontFamily: 'Poppins-Light',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-Light',
    },
    sessionWrapper: {
        width: '90%',
        alignSelf: 'center',
    },
    sessionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    sessionTitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins-Light',
    },
    sessionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontFamily: 'Poppins-Light',
    },
    sessionDateTime: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Poppins-Light',
    },
    sessionStatus: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        minWidth: 100,
        fontFamily: 'Poppins-Light',
    },
    completed: {
        backgroundColor: '#7fc517',
    },
    pending: {
        backgroundColor: '#F43F5E',
    },
    textDefault: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Light',
    }
});