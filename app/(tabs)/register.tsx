import { useState } from 'react';
import { StyleSheet, Image, Platform, ScrollView, Text, View, TextInput, Button, Pressable } from 'react-native';

export default function RegisterScreen() {
  const [data, setData] = useState({ fullname: '', email: '', password: '' })
  const [errors, setErrors] = useState({ fullname: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const handleChange = (key, value) => {
    setData((data) => ({
      ...data,
      [key]: value
    }))
  }
  function isValidFullname(){
    if (data.fullname == '') {
      setErrors(errors => ({
        ...errors,
        fullname: 'Please enter fullname',
      }))
      console.log(errors)
      return false;
    }else{
      setErrors(errors => ({
        ...errors,
        fullname: '',
      }))
      return true;
    }
  }
  function isValidEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      setErrors(errors => ({
        ...errors,
        email: 'Invalid Email',
      }))
      console.log(errors)
      return false;
    }else{
      setErrors(errors => ({
        ...errors,
        email: '',
      }))
      return true;
    }
  }
  
  function isValidPassword(){
    if (data.password.length <8) {
      setErrors(errors => ({
        ...errors,
        password: 'Please enter password more than 8 charcaters',
      }))
      return false;
    }else{
      setErrors(errors => ({
        ...errors,
        password: '',
      }))
      return true;
    }
  }
  const validation = () => {
    if(isValidFullname() && isValidEmail() && isValidPassword()){
      return true;
    }
    return false;
  }
  const submit = async () => {
    if (validation()) {
      const rawResponse = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
      setData({ fullname: '', email: '', password: '' });
      setMessage('Registered Successfully')
    }
  }
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 10 }}>
        <View style={{ paddingTop: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Account,</Text>
          <Text>Signup to get started!</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <View style={styles.inputGroup}>
            <Text>Full Name</Text>
            <TextInput onChange={(e) => handleChange('fullname', e.target.value)} value={data.fullname ?? ''} style={styles.textInput} />
            {errors.fullname && <View style={{ color: 'red' }}>{errors.fullname}</View>}
          </View>
          <View style={styles.inputGroup}>
            <Text>Email</Text>
            <TextInput onChange={(e) => handleChange('email', e.target.value)} value={data.email ?? ''} style={styles.textInput} />
            {errors.email && <View style={{ color: 'red' }}>{errors.email}</View>}
          </View>
          <View style={styles.inputGroup}>
            <Text>Password</Text>
            <TextInput onChange={(e) => handleChange('password', e.target.value)}  value={data.password ?? ''} secureTextEntry={true} style={styles.textInput} />
            {errors.password && <View style={{ color: 'red' }}>{errors.password}</View>}
          </View>
          <View style={{ color:'green'}}>{message ?? '' }</View>
          <View style={{ paddingTop: 20 }}>
            <Pressable onPress={() => submit()} style={styles.button}><Text style={styles.text}>Submit</Text></Pressable>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Pressable style={styles.fbutton}><Text style={styles.text}>Facebook</Text></Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    padding: 10
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  fbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
