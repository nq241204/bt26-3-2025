import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext

export default function SignInScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);  // Lấy hàm login từ context

    const handleSignIn = async () => {
        
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
            return;
        }

        setLoading(true);

        // Giả lập xác thực tài khoản
        const validEmail = 'test@example.com';
        const validPassword = '123456';

        if (email === validEmail && password === validPassword) {
            const userData = { name: 'John Doe', email, avatar: 'https://via.placeholder.com/100' };

            try {
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                console.log('✅ Đăng nhập thành công, lưu thông tin người dùng');
                
                login();  // Gọi hàm login để cập nhật trạng thái đăng nhập

            } catch (error) {
                console.log('❌ Lỗi lưu AsyncStorage:', error);
                Alert.alert('Lỗi', 'Không thể lưu thông tin đăng nhập');
            }
        } else {
            Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng!');
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />

            {loading ? <ActivityIndicator size="large" color="blue" /> : <Button title="Đăng nhập" onPress={handleSignIn} />}

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
    linkText: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
