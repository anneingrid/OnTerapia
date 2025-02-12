import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { Card, Avatar } from 'react-native-paper';
import logoOnTerapia from '@/assets/images/logoOnTerapia.png'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useAppContext } from "@/components/provider";
import { Link } from "expo-router";
import Header from '@/components/geral/header'


export default function Anotacoes() {
    const { pacientes } = useAppContext()

    return (
        <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47'}}>
            <Header corFundo={"#F43F5E"} href='psicologo/home'></Header>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.titulo}>ANOTAÇÕES</Text>
            </View>
            {pacientes.map(paciente => (
                <Card id={paciente.id} style={styles.card}>
                    <Card.Content style={styles.cardConteudo}>
                        <Avatar.Icon style={{ backgroundColor: "#F43F5E", marginRight: 10 }} size={60} icon={() => <Ionicons name="person" size={24} color="#ffff" />} />
                        <View style={styles.tituloCard}>
                            <Text style={styles.nome}>{paciente.nome}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Link href={`/psicologo/anotacoes/${paciente.id}`} >
                                <Ionicons name="chevron-forward-outline" size={20} color={'#F43F5E'} />
                            </Link>
                        </View>
                    </Card.Content>
                </Card>
            ))}
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
        fontFamily: 'Poppins-Light' ,
        fontSize: 18,
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
    }
})