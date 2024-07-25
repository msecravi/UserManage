import { StyleSheet, View, Image, Text, Pressable, TextInput } from 'react-native';

import { useEffect, useState } from 'react';
import { useLocalSearchParams, Link } from "expo-router";
import { ENV } from './globals';

export default function edit() {
  const [data, setData] = useState({ fullname: '', email: '' })
  const [errors, setErrors] = useState({ fullname: '', email: '' })
  const [message, setMessage] = useState('')
  const params = useLocalSearchParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    let url = ENV.URL+"users/" + params.id;
    fetch(url).then((res) => res.json()).then((result) => {
      setUser(result.data);
      setData((data)=>({...data,fullname:result.data.first_name+ ' '+result.data.last_name,email:result.data.email}));
      console.log(data)
    });
  }, [])
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
  
  const validation = () => {
    if(isValidFullname() && isValidEmail()){
      return true;
    }
    return false;
  }
  const submit = async() => {
    if (validation()) {
      const rawResponse = await fetch(ENV.URL+'users/'+params.id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
      setMessage('Updated Successfully')
    }
  }
  return (
    <View>
      <View style={{ height: 200, backgroundColor: 'black' }}>
        <Image style={{ margin: 'auto', width: 100, height: 100, borderRadius: 50 }} source={user.avatar} />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.inputGroup}>
          <Text>Name</Text>
          <TextInput onChange={(e) => handleChange('fullname', e.target.value)} value={data.fullname ?? ''} style={styles.textInput} />
          <Text style={{ color: 'red' }}>{errors.fullname ?? '' }</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text>Email</Text>
          <TextInput onChange={(e) => handleChange('email', e.target.value)} value={data.email ?? ''} style={styles.textInput} />
          <Text style={{ color: 'red' }}>{errors.email ?? ''}</Text>
        </View>
        <Text style={{ color:'green'}}>{message ?? '' }</Text>
        <View style={{ paddingTop: 20 }}>
          <Pressable onPress={() => submit()} style={styles.button}><Text style={styles.text}>Submit</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    padding: 10
  },
  textInput: {
    paddingLeft:10,
    height: 40,
    borderWidth: 1,
  },
  titleContainer: {
    padding: 10, height: 200,
    borderRadius: 5,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    marginTop: 175,
    position: 'absolute',
    flex: 1
  },
  button: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
