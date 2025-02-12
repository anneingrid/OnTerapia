import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Card, Text, Button } from 'react-native-paper';

const ProntuarioScreen = () => {
    const [expanded, setExpanded] = useState(null);
    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const evolucoes = [
        { data: '01/05/2023', hora: '17:00', descricao: 'Terapia Cognitivo-Comportamental (TCC)...' },
        { data: '03/05/2023', hora: '08:00', descricao: 'Terapia de Relaxamento e Gerenciamento de Estresse...' },
        { data: '07/05/2023', hora: '08:00', descricao: 'Psicoterapia de Apoio...' },
        { data: '14/05/2023', hora: '08:00', descricao: 'Terapia de Aceitação e Compromisso (ACT)...' },
    ];

    return (
        <ScrollView style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
            <Text variant="headlineMedium" style={{ textAlign: 'center', fontFamily: 'Poppins' }}>Prontuário Psicológico</Text>
            <Card style={{ marginBottom: 10, padding: 15 }}>
                <Text variant="titleMedium">Identificação</Text>
                <Text>Nome: Joana Porfírio Salazar</Text>
                <Text>Data de Nasc.: 07/09/1970</Text>
                <Text>Contato: (85)98542-5844</Text>
                <Text>Profissão: Fotógrafa</Text>
            </Card>
            <Card style={{ marginBottom: 10, padding: 15 }}>
                <Text variant="titleMedium">Anamnese</Text>
                <Text>Joana menciona que sua rotina envolve carregar equipamentos pesados...</Text>
            </Card>
            <Card style={{ marginBottom: 10, padding: 15 }}>
                <Text variant="titleMedium">Evolução</Text>
                {evolucoes.map((item, index) => (
                    <List.Accordion
                        key={index}
                        title={`${item.data} - ${item.hora}`}
                        expanded={expanded === index}
                        onPress={() => toggleExpand(index)}
                    >
                        <List.Item title={item.descricao} />
                    </List.Accordion>
                ))}
            </Card>
            <Button mode="contained" style={{ marginTop: 10 }}>
                Adicionar Evolução
            </Button>
        </ScrollView>
    );
};

export default ProntuarioScreen;
