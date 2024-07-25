import { Image, StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { ENV } from '../globals';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalpages, setTotalpages] = useState(1);
  useEffect(() => {
    let url = ENV.URL + "users?per_page=10&page=" + page;
    console.log(url)
    if(page<=totalpages){
      fetch(url).then((res) => res.json()).then((result) => {
        result.data.map((item)=>{
          users.push(item)
        })
        setUsers(users);
        setTotalpages(result.total_pages);
        setLoading(false);
      });
    }
  }, [page])
  const renderUser = (items) => {
    return <View key={items.id} style={styles.container}>
      <Link href={{ pathname: '/profile', params: { id: items.id } }}>
        <View style={styles.row}>
          <View style={styles.image}>
            <Image style={styles.image} source={items.avatar} />
          </View>
          <View style={{ paddingLeft: 10, paddingTop: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>{items.first_name} {items.last_name}</Text>
            <Text>Email : {items.email} </Text>
          </View>
        </View>
      </Link>
    </View>
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, height: windowHeight-70 }}
          data={users}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if(!loading){
              setPage(page+1);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  topText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'white',
    padding: 10
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingRight: 0
  },
});
