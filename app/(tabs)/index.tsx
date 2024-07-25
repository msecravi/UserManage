import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let url = "https://reqres.in/api/users";
    fetch(url).then((res) => res.json()).then((result) => {
      setUsers(result.data);
    });
  }, [])
  const renderUser = (items) => {
    return <View style={styles.container}>
      <Link href={{pathname:'/profile',params: { id: items.id },}}>
      <View style={styles.row}>
        <View style={styles.image}>
          <Image style={styles.image} source={items.avatar} />
        </View>
        <View style={{paddingLeft:10,paddingTop:5}}>
          <Text style={{fontWeight:'bold'}}>{items.first_name} {items.last_name}</Text>
          <Text>Email : {items.email} </Text>
        </View>
      </View>
      </Link>
    </View>
  }
  return (
    <ScrollView>
      <FlatList
        data={users}
        renderItem={({ item }) => renderUser(item)}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'white',
    padding:10
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingRight:0
  },
});
