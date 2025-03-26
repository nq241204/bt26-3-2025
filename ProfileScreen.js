import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
            <Text style={styles.name}>John Doe</Text>
            <Button title="Đăng xuất" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
