import {StyleSheet} from 'react-native/types';

function PurchaseCard() {
  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
        navigation.navigate('View', item);
      }}>
      <PostCard props={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderItem} />
      <PlusButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
});

export default PurchaseCard;
