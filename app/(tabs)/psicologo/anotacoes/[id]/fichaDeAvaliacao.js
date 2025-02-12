import { React, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, Button, TextInput, Checkbox } from 'react-native-paper';
import Header from '@/components/geral/header';
import { useAppContext } from '@/components/provider';
import { Link } from 'expo-router';
import { useLocalSearchParams } from "expo-router";


export default function FichaAvaliacao() {
    const { inserirNota } = useAppContext();
    const [metas, setMetas] = useState("");
    const [anotacoes, setAnotacoes] = useState("");
    const [atividades, setAtividades] = useState("");
    const [feedback, setFeedback] = useState("");
    const [abordar, setAbordar] = useState("");
    const [listaHumor, setListaHumor] = useState([]);
    const { id } = useLocalSearchParams();

    const humorSelecionado = (value) => {
        if (listaHumor.includes(value)) {
            setListaHumor(listaHumor.filter(item => item !== value));
        } else {
            setListaHumor([...listaHumor, value]);
        }
    };

    const salvarNota = async () => {
        await inserirNota(1, id, 2, listaHumor, metas, anotacoes, atividades, feedback, abordar)
    };

    return (
        <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47', fontFamily: 'Poppins-Light' }}>
            <Header corFundo={"#F43F5E"} href={`psicologo/anotacoes`}></Header>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.titulo}>FICHA DE AVALIAÇÃO</Text>
                <Text style={{ fontFamily: 'Poppins-Light' }}>Registro e Sessão</Text> 
            </View>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>VERIFICAÇÃO DE HUMOR</Text>
                </View>

                <Card.Content>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('deprimido') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('deprimido')}
                            />
                            <Text style={styles.checkboxLabel}>Deprimido</Text>
                        </View>
                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('ansioso') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('ansioso')}
                            />
                            <Text style={styles.checkboxLabel}>Ansioso</Text>
                        </View>
                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('hiperativo') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('hiperativo')}
                            />
                            <Text style={styles.checkboxLabel}>Hiperativo</Text>
                        </View>

                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('culpado') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('culpado')}
                            />
                            <Text style={styles.checkboxLabel}>Culpado</Text>
                        </View>
                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('euforico') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('euforico')}
                            />
                            <Text style={styles.checkboxLabel}>Eufórico</Text>
                        </View>
                        <View style={styles.checkboxItem}>
                            <Checkbox
                                status={listaHumor.includes('nervoso') ? 'checked' : 'unchecked'}
                                onPress={() => humorSelecionado('nervoso')}
                            />
                            <Text style={styles.checkboxLabel}>Nervoso</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>METAS TERAPÊUTICAS</Text>
                </View>
                <Card.Content>
                    <TextInput style={styles.caixaTexto}
                        label="Digite aqui"
                        value={metas}
                        onChangeText={metas => setMetas(metas)}
                    />
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>ANOTAÇÕES RELEVANTES</Text>
                </View>
                <Card.Content>
                    <TextInput style={styles.caixaTexto}
                        label="Digite aqui"
                        value={anotacoes}
                        onChangeText={anotacoes => setAnotacoes(anotacoes)}
                    />
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>ATIVIDADES DA SEMANA</Text>
                </View>
                <Card.Content>
                    <TextInput style={styles.caixaTexto}
                        label="Digite aqui"
                        value={atividades}
                        onChangeText={atividades => setAtividades(atividades)}
                    />
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>FEEDBACK</Text>
                </View>
                <Card.Content>
                    <TextInput style={styles.caixaTexto}
                        label="Digite aqui"
                        value={feedback}
                        onChangeText={feedback => setFeedback(feedback)}
                    />
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cabecalhoCard}>
                    <Text style={styles.tituloCard}>ABORDAR NA PRÓXIMA SESSÃO</Text>
                </View>
                <Card.Content>
                    <TextInput style={styles.caixaTexto}
                        label="Digite aqui"
                        value={abordar}
                        onChangeText={abordar => setAbordar(abordar)}
                    />
                </Card.Content>
            </Card>
            <View style={styles.estiloSalvar}>
                <Link href=''>
                    <Button style={styles.botaoSalvar}
                        buttonColor="#F43F5E" mode="contained" onPress={salvarNota}>
                        Salvar
                    </Button>
                </Link>
            </View>
        </ScrollView >
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
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 3,
        flex: 1,
    },
    goBackButton: {
        marginRight: 10,
        alignItems: 'left'
    },
    cabecalhoCard: {
        backgroundColor: "#F43F5E",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    botaoMais: {
        position: 'absolute',
        right: 20,
        bottom: -220
    },
    tituloCard: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        fontWeight: "bold",
        color: "#ffff",
        paddingVertical: 5
    },
    botaoSalvar: {
        fontFamily: 'Poppins-Light',
        paddingHorizontal: 30
    },
    estiloSalvar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    caixaTexto: {
        fontFamily: 'Poppins-Light',
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 20,
        fontSize: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    checkboxItem: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontFamily: 'Poppins-Light',
        marginLeft: 8,
    },

})

