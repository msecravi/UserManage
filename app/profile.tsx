import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';

import { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

export default function profile() {
  const params = useLocalSearchParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    let url = "https://reqres.in/api/users/" + params.id;
    fetch(url).then((res) => res.json()).then((result) => {
      setUser(result.data);
    });
  }, [])
  return (
    <View>
      <View style={{ height: 200, backgroundColor: 'black' }}>
        <Image style={{ margin: 'auto', width: 100, height: 100, borderRadius: 50 }} source={"https://reqres.in/img/faces/1-image.jpg"} />
      </View>
      <View style={{ padding: 10, height: 200, borderRadius: 5, width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: 'white', marginTop: 175, position: 'absolute' }}>
        <Text style={{ fontSize:18, fontWeight:'bold'}}>{ user.first_name ?? '' }  {user.last_name ?? ''}</Text>
        <Text>Name</Text>
        <Text style={{paddingTop:20,fontSize:18, fontWeight:'bold'}}>{ user.email ?? '' }</Text>
        <Text>Email</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
