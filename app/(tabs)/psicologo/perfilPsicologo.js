import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import perfil from '@/assets/images/perfil.png';
import logo from '@//assets/images/logoOnTerapia.png';
import { Link } from 'expo-router';
import FraseMotivacional from '../../../components/psicologo/frases';

export default function PerfilPsicologo() {

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={{ marginTop: 15, }}>
                    <Link href={'/'} style={{
                        marginTop: 35,
                        height: 30, margin: 15,
                    }}>
                        <Ionicons name="log-out-outline" size={30} color="white" />
                    </Link>


                </View>
                <View style={{ marginTop: 35, }}>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>

            </View>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={perfil}
                    style={styles.avatar}
                />

            </View>

            {/* Estatísticas */}
            <View style={{

                padding: 10,
                marginHorizontal: 10,

            }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.name}>Dr. Jackson</Text>
                    <Text style={styles.id}>CRP : 12345678</Text>
                </View>
                <View style={styles.statsContainer}>

                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>235</Text>
                        <Text style={styles.statLabel}>Atendimentos</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>68</Text>
                        <Text style={styles.statLabel}>Pacientes</Text>
                    </View>
                    {/* <View style={styles.statItem}>
                        <Text style={styles.statNumber}>540</Text>
                        <Text style={styles.statLabel}>Sessões</Text>
                    </View> */}
                </View>
            </View>

            {/* Botão de crédito */}
            <View style={styles.buttonContainer}>
                <View style={styles.creditButton}>
                    <Text style={styles.buttonText}>Saldo disponível: <Text style={{fontFamily:'Poppins-Semilbold', fontSize:20}}>R$ 200</Text></Text>
                </View>
            </View>
            <FraseMotivacional></FraseMotivacional>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Poppins-Light',

    },
    header: {
        position: 'relative',
        backgroundColor: '#F37187',
        height: 150,
        flexDirection: 'row',
        fontFamily: 'Poppins-Light',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,

        justifyContent: 'space-between',
        fontFamily: 'Poppins-Light',

    },
    settingsButton: {

        margin: 15
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -48,
    },
    avatar: {
        width: 96,
        height: 96,

        borderColor: '#ffffff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        fontFamily: 'Poppins-Light',

    },
    id: {
        color: '#6b7280',
        fontFamily: 'Poppins-Light',

    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // margin: 20,
        fontFamily: 'Poppins-Light',
        gap: 20,
        marginVertical: 5
    },
    statItem: {
        alignItems: 'center',
        fontFamily: 'Poppins-Light',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }, // Pequeno deslocamento
        shadowOpacity: 0.1, // Opacidade bem leve
        shadowRadius: 2, // Espalhamento pequeno
        // Sombra no Android
        elevation: 2,

    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Semibold',
        color: '#F37187'

    },
    statLabel: {
        color: '#6b7280',
        fontFamily: 'Poppins-Light',

    },
    buttonContainer: {
        marginVertical: 2,
        marginBottom:8,
        alignItems: 'center',

    },
    creditButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection:'row',
        justifyContent:'center'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Light',
    },
});