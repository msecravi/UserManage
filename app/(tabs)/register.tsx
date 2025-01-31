import { useState } from 'react';
import { StyleSheet, Image, Platform, ScrollView, Text, View, TextInput, Button, Pressable } from 'react-native';
import { ENV } from '../globals';

export default function RegisterScreen() {
  const [data, setData] = useState({ fullname: '', email: '', password: '' })
  const [errors, setErrors] = useState({ fullname: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const handleChange = (key, value) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }
  function isValidFullname() {
    if (data.fullname == '') {
      setErrors(errors => ({
        ...errors,
        fullname: 'Please enter fullname',
      }))
      return false;
    } else {
      setErrors(errors => ({
        ...errors,
        fullname: '',
      }))
      return true;
    }
  }
  function isValidEmail() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.email) === false) {
      setErrors(errors => ({
        ...errors,
        email: 'Invalid Email',
      }))
      return false;
    } else {
      setErrors(errors => ({
        ...errors,
        email: '',
      }))
      return true;
    }
  }

  function isValidPassword() {
    if (data.password.length < 8) {
      setErrors(errors => ({
        ...errors,
        password: 'Please enter password more than 8 charcaters',
      }))
      return false;
    } else {
      setErrors(errors => ({
        ...errors,
        password: '',
      }))
      return true;
    }
  }
  const validation = () => {
    if (isValidFullname() && isValidEmail() && isValidPassword()) {
      return true;
    }
    return false;
  }
  const submit = async () => {
    if (validation()) {
      const rawResponse = await fetch(ENV.URL + 'users', {
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
            <TextInput onChangeText={(value) => handleChange('fullname', value)} value={data.fullname ?? ''} style={styles.textInput} />
            <Text style={{ color: 'red' }}>{errors.fullname ?? ''}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text>Email</Text>
            <TextInput onChangeText={(value) => handleChange('email', value)} value={data.email ?? ''} style={styles.textInput} />
            <Text style={{ color: 'red' }}>{errors.email ?? ''}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text>Password</Text>
            <TextInput onChangeText={(value) => handleChange('password', value)} value={data.password ?? ''} secureTextEntry={true} style={styles.textInput} />
            <Text style={{ color: 'red' }}>{errors.password ?? ''}</Text>
          </View>
          <Text style={{ color: 'green' }}>{message ?? ''}</Text>
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
    paddingLeft: 10,
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
