import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '@/components/geral/header';
import { Ionicons } from '@expo/vector-icons';

export default function TelaSessao() {
    // Dados mockados
    const sessaoAtual = {
        idSessao: 1,
        ativa: true,
        data: '2025-02-13',
        hora_inicio: '10:00',
        Paciente: { nome: 'João da Silva' }
    };

    // Estado do tempo restante (simulação)
    const [minutesLeft, setMinutesLeft] = useState('45 minutos');

    const abrirMeet = () => {
        console.log("Abrindo Meet...");
    };

    const chatPaciente = () => {
        console.log("Abrindo Chat...");
    };

    const concluirSessao = () => {
        alert('Sessão marcada como concluída!');
        setMinutesLeft('Sessão Encerrada');
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <ScrollView>
            <Header corFundo="#F37187" href="/psicologo/agenda" />
            <View style={styles.center}>
                <Text style={[styles.label, { fontSize: 20 }]}>
                    Pronto para sua sessão?
                </Text>
                <Text style={styles.subLabel}>
                    Registro de sessão nº {sessaoAtual.idSessao}
                </Text>
            </View>

            <View style={styles.container}>
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    <View style={styles.sessionInfoContainer}>
                        <Text style={styles.titulo}>Paciente</Text>
                        <Text style={styles.valor}>{sessaoAtual.Paciente.nome}</Text>
                    </View>
                    <View style={styles.sessionInfoContainer}>
                        <Text style={styles.titulo}>DATA</Text>
                        <Text style={styles.valor}>{formatDate(sessaoAtual.data)}</Text>
                    </View>
                    <View style={styles.sessionInfoContainer}>
                        <Text style={styles.titulo}>HORÁRIO</Text>
                        <Text style={styles.valor}>{sessaoAtual.hora_inicio.substring(0, 5)}</Text>
                    </View>

                    {minutesLeft === 'Sessão Encerrada' ? (
                        <View style={styles.center}>
                            <Ionicons name="checkmark-circle" color={'#F43F5E'} size={20} />
                            <Text style={styles.concluidaText}>SESSÃO ENCERRADA</Text>
                        </View>
                    ) : (
                        <View style={styles.sessionInfoContainer}>
                            <Text style={styles.titulo}>TEMPO RESTANTE</Text>
                            <Text style={styles.valor}>{minutesLeft}</Text>
                        </View>
                    )}
                </View>

                {minutesLeft !== 'Sessão Encerrada' && (
                    <View style={styles.actionsContainer}>
                        <Button 
                            mode="contained" 
                            onPress={abrirMeet} 
                            buttonColor="#F37187" 
                            textColor='white'
                            labelStyle={styles.buttonLabel}
                            style={styles.button}
                        >
                            Abrir Meet
                        </Button>
                        <Button 
                            mode="contained" 
                            onPress={chatPaciente} 
                            textColor='white'
                            labelStyle={styles.buttonLabel}
                            style={styles.button}
                        >
                            Chat
                        </Button>
                        <Button 
                            mode="contained" 
                            onPress={concluirSessao} 
                            buttonColor="#8dcc28" 
                            textColor='white'
                            labelStyle={styles.buttonLabel}
                            style={styles.button}
                        >
                            Marcar como concluída
                        </Button>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    sessionInfoContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        width: '100%',
    },
    valor: {
        fontSize: 16,
        fontFamily: 'Poppins-Light',
    },
    label: {
        fontSize: 12,
        color: '#F37187',
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
    },
    subLabel: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        marginBottom: 3,
    },
    actionsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonLabel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    titulo: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#F37187',
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'Poppins-Medium',
        textTransform: 'uppercase'
    },
    concluidaText: {
        fontSize: 16,
        color: '#2c2c2c',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    center: {
        alignItems: 'center',
        marginTop: 20,
    },
});
