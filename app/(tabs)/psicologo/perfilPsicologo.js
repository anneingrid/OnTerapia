import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import perfil from '@/assets/images/perfil.png';
import logo from '@//assets/images/logoOnTerapia.png';

export default function PerfilPsicologo() {

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Image source={logo} style={{
                        width: 30,
                        height: 30, margin: 15
                    }}></Image>
                </View>
                <View>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color="white" />
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
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                marginHorizontal:10
            }}>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.name}>Dr. Psicólogo</Text>
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
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>540</Text>
                        <Text style={styles.statLabel}>Sessões</Text>
                    </View>
                </View>
            </View>

            {/* Botão de crédito */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.creditButton}>
                    <Text style={styles.buttonText}>Crédito disponível: R$ 200</Text>
                </TouchableOpacity>
            </View>
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
        height: 100,
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
        justifyContent:'space-between',
        margin: 20,
        fontFamily: 'Poppins-Light',

    },
    statItem: {
        alignItems: 'center',
        fontFamily: 'Poppins-Light',

    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Light',

    },
    statLabel: {
        color: '#6b7280',
        fontFamily: 'Poppins-Light',

    },
    buttonContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    creditButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Light',
    },
});