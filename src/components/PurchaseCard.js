import {StyleSheet} from 'react-native/types';

function PurchaseCard() {
  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
        navigation.navigate('View', item);
      }}>
      <PostCard
        grade={item.grade}
        model_name={item.model_name}
        post_content={item.post_content}
        post_no={item.post_no}
        post_title={item.post_title}
        price={item.price}
        status={item.status}
        updateat={item.updateat}
        photoURL={item.photoURL}
      />
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
