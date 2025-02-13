import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Card, Text, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import BarraTopo from '@/components/buscar/barraTopo';
import Header from '@/components/geral/header';

const psicologos = [
    { id: 1, nome: 'Dra. Ana Silva', especialidade: 'TCC', status: 'Disponível', quantEstrelas: 4 },
    { id: 2, nome: 'Dr. João Souza', especialidade: 'Psicanálise', status: 'Indisponível', quantEstrelas: 3 },
    { id: 3, nome: 'Dra. Mariana Lima', especialidade: 'Gestalt-terapia', status: 'Disponível', quantEstrelas: 5 },
];

const renderStars = (quantidade) => {
    return Array.from({ length: quantidade }, (_, index) => (
        <Ionicons key={index} name="star" size={16} color="gold" />
    ));
};

export default function ListaPsicologos() {
    return (
        <ScrollView>
            <Header corFundo="#477BDE" href='paciente/home' />
            <View style={styles.container}>
                <BarraTopo />
                {psicologos.map((psicologo, index) => (
                    <Link key={psicologo.id} href={`paciente/psicologos/${psicologo.id}`}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.cardContent}>
                                    <Ionicons style={styles.icon} name="person-outline" size={25} color={'black'} />
                                    <View style={styles.textContainer}>
                                        <View style={styles.titulo}>
                                            <Text style={styles.nome}>{psicologo.nome}</Text>
                                            <Badge style={psicologo.status === 'Disponível' ? styles.disponivel : styles.indisponivel}>
                                                {psicologo.status}
                                            </Badge>
                                        </View>
                                        <Text style={styles.especialidade} numberOfLines={3}>{psicologo.especialidade}</Text>
                                        <View style={styles.estrelas}>{renderStars(psicologo.quantEstrelas)}</View>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    card: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    especialidade: {
        fontSize: 16,
        marginBottom: 5,
    },
    titulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    disponivel: {
        backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 10,
    },
    indisponivel: {
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 10,
    },
    estrelas: {
        flexDirection: 'row',
        marginTop: 5,
    },
});
