import { React, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Link } from "expo-router";
import { useAppContext } from "@/components/provider";
import logoOnTerapia from '@/assets/images/logoOnTerapia.png'

export default function detalhesFicha() {
    const { id } = useLocalSearchParams();
    const { buscaNotaId } = useAppContext();
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        
        const carregarNotas = async () => {
            const dados = await buscaNotaId(id);
            setNotas(dados);
        };
        carregarNotas();
    }, [id]);
    if (!notas) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#477BDE" />
            </View>
        );
    }

    return (
        <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
            <View style={[styles.capa, { fontFamily: 'Poppins-Light' }]}>
                <View style={styles.voltar}>
                    <Link href={`psicologo/anotacoes`} style={styles.goBackButton}>
                        <AntDesign name="leftcircleo" size={24} color="white" />
                    </Link>
                </View>
                <View style={styles.logo}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image source={logoOnTerapia} style={styles.imagem} />
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.titulo}>Registro de Sessão</Text>
            </View>
            {notas.map((nota, index) => (
                <View style={styles.subtituloCard}>
                    <Text style={styles.nome}>Ficha {nota.id} - Data: {nota.created_at.split("T")[0]} </Text>
                </View>
            ))}
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>Nome Paciente</Text>
                </View>
                <Card.Content>
                    {notas.map((nota, index) => (
                        <View style={styles.subtituloCard}>
                            <Text style={styles.tituloRelatorio}>Metas Terapêuticas</Text>
                            <Text style={styles.relatorio}>{nota.metasTerapeuticas} </Text>

                            <Text style={styles.tituloRelatorio}>Anotações Relevantes </Text>
                            <Text style={styles.relatorio}>{nota.anotacoesRelevantes} </Text>

                            <Text style={styles.tituloRelatorio}>Atividades da Semana </Text>
                            <Text style={styles.relatorio}>{nota.atividadesDaSemana} </Text>

                            <Text style={styles.tituloRelatorio}>Feedback</Text>
                            <Text style={styles.relatorio}>{nota.feedback} </Text>

                            <Text style={styles.tituloRelatorio}>Abordar na Próxima Sessão</Text>
                            <Text style={styles.relatorio}>{nota.abordarProximaSessao} </Text>
                            
                            
                            <Text style={styles.tituloRelatorio}> Verificação De Humor </Text>
                            {notas.map((humor) => (
                            <Text style={styles.relatorio}>{humor.verificacaoDeHumor.join(', ')}</Text>
                            ))}
                            </View>
                    ))}
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    capa: {
        width: "100%",
        height: 90,
        backgroundColor: "#F43F5E",
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Esta propriedade é para Android
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    voltar: {
        flex: 0,
        margin: 10,
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontFamily: 'Poppins-Light',
        fontSize: 24,
        color: '#F43F5E',
        fontWeight: "bold",
        paddingVertical: 25
    },
    cardConteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    imagem: {
        width: 50,
        height: 50,
    },
    nome: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 3,
        flex: 1,
    },
    tituloRelatorio: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 3,
        flex: 1,
        marginTop: 15
    },
    relatorio: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginBottom: 3,
        flex: 1,
    },loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    goBackButton: {
        marginRight: 10,
        alignItems: 'left'
    },
    tituloCard: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        fontWeight: "bold",
        color: "#ffff",
        paddingVertical: 5
    },
    subtituloCard: {
        fontSize: 12,
        fontWeight: "bold",
        alignItems: 'center'
    },
    botaoMais: {
        position: 'absolute',
        right: 20,
        bottom: -220
    },
    cabecalhoCard: {
        backgroundColor: "#F43F5E",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    }

})

