import { React, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Link } from "expo-router";
import { useAppContext } from "@/components/provider";
import logoOnTerapia from '@/assets/images/logoOnTerapia.png'

export default function AnotacoesDetalhes() {
    const { id } = useLocalSearchParams();
    const { pacientes, listarNotas } = useAppContext();
    const [notas, setNotas] = useState([]);

    const paciente = pacientes.find((element) => element.id == id);

    useEffect(() => {
        const carregarNotas = async () => {
            const dados = await listarNotas(id);
            setNotas(dados);
        };
        carregarNotas();
    }, [id]);
    if (!paciente) {
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
                    <Link href={"psicologo/anotacoes/page"} style={styles.goBackButton}>
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
                <Text style={styles.titulo}>{paciente.nome}</Text>
            </View>
            {notas.map((nota, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content style={styles.cardConteudo}>
                        <View style={styles.tituloCard}>
                            <Text style={styles.nome}>Ficha {nota.id} - Data: {nota.created_at.split("T")[0]} </Text>
                        </View>
                        <Link href={`psicologo/anotacoes/${nota.id}/detalhesFicha`}>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Ionicons name="chevron-forward-outline" size={20} color={'#F43F5E'} />
                            </View>
                        </Link>
                    </Card.Content>
                </Card>
            ))}
            <View style={styles.botaoMais}>
                <Link href={`/psicologo/anotacoes/${paciente.id}/fichaDeAvaliacao`}>
                    <IconButton
                        icon="plus"
                        iconColor="#ffff"
                        size={20}
                        mode='contained'
                        containerColor="#F43F5E"

                    />
                </Link>
            </View>
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
    }, loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
    goBackButton: {
        marginRight: 10,
        alignItems: 'left'
    },
    tituloCard: {
        fontSize: 24,
        fontWeight: "bold"
    },
    botaoMais: {
        position: 'absolute',
        right: 20,
        bottom: -220
    }
})

