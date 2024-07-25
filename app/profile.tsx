import { StyleSheet, View, Image, Text, Platform, Pressable } from 'react-native';

import { useEffect, useState } from 'react';
import { useLocalSearchParams, Link } from "expo-router";
import { ENV } from './globals';

export default function profile() {
  const params = useLocalSearchParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    let url = ENV.URL+"users/" + params.id;
    fetch(url).then((res) => res.json()).then((result) => {
      setUser(result.data);
    });
  }, [])
  return (
    <View>
      <View style={{ height: 200, backgroundColor: 'black' }}>
        <Image style={{ margin: 'auto', width: 100, height: 100, borderRadius: 50 }} source={user.avatar} />
      </View>
      <View style={styles.titleContainer}>
        <View style={{ paddingTop: 20, justifyContent:'flex-end',alignItems:'flex-end' }}>
          <Link  style={styles.button} href={{pathname:'/edit',params: { id: params.id }}}>
            <Text style={styles.text}>Edit</Text>
          </Link>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.first_name ?? ''}  {user.last_name ?? ''}</Text>
        <Text>Name</Text>
        <Text style={{ paddingTop: 20, fontSize: 18, fontWeight: 'bold' }}>{user.email ?? ''}</Text>
        <Text>Email</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width:100,
    alignItems:  'center',
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
