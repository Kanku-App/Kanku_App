import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import Header from '../../components/Header';
import {get_tour_all_byid} from '../../services/Api';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import UploadImageModal from '../../components/UpdateProfileModal';
import {delete_tour} from '../../services/Api';
const ListYourTourScreen = ({route}) => {
  const navigation = useNavigation();
  const userDetail = useSelector(state => state?.auth);
  const [loading, setLoading] = useState(false);
  const [tourListData, setTourListData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState('');
  const [tourId, setTourId] = useState(0);

  const _edit = () => {
    setShow(false);
    setTimeout(() => {
      navigation.navigate('EditTour', {item: editData});
    }, 300);
  };

  const getTourHandler = () => {
    setLoading(true);
    // setLoading(true);
    get_tour_all_byid(userDetail?.user?.id)
      .then(res => {
        console.log('res', res);
        if (res?.status == '1') {
          setTourListData(res?.tours);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getTourHandler();
    }, []),
  );

  const deleteTour = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('tours_id', tourId);
    delete_tour(formdata)
      .then(result => {
        console.log('deleteresult', result);
        if (result?.status == '1') {
          setTimeout(() => {
            getTourHandler();
          }, 500);
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });
  };
  const confirmDelete = () => {
    setShow(false);
    Alert.alert('Delete Tour', 'Are you sure, you want to delete this tour', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteTour()},
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header navigation={navigation} title={'List your tour'} />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : tourListData?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              justifyContent: 'center',
              fontSize: 16,
              fontFamily: Theme.FONT_FAMILY_MEDIUM,
              color: 'black',
              marginLeft: 20,
            }}>
            No Data here
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          style={{paddingTop: 18, flex: 1}}
          data={tourListData}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginBottom: 20,
                  borderRadius: 20,
                  shadowColor: 'light-grey',
                  backgroundColor: '#fff',
                  elevation: 3,
                  marginHorizontal: 18,
                }}>
                <Image
                  source={{uri: item?.tours_image}}
                  style={{
                    height: 160,
                    borderRadius: 20,
                  }}
                  resizeMode="stretch"
                />
                {/* <Pressable onPress={() => setShow(true)}>
                  <Image
                    source={require('../../assets/icons/edit_tour_icon.png')}
                    style={{
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      right: 12,
                      top: 12,
                    }}
                    resizeMode="cover"
                  />
                </Pressable> */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    paddingHorizontal: 8,
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 20,
                      color: 'black',
                      textAlign: 'left',
                      fontFamily: Theme.FONT_FAMILY_BOLD,
                    }}>
                    {item.tours_name}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setEditData(item);
                      setTourId(item.tours_id);
                      setShow(true);
                    }}>
                    <Image
                      source={require('../../assets/icons/edit_tour_icon.png')}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>

                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 8,
                    paddingBottom: 10,
                  }}>
                  {/* <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 20,
                      color: 'black',
                      textAlign: 'left',
                      fontFamily: Theme.FONT_FAMILY_BOLD,
                    }}>
                    {item.tours_name}
                  </Text> */}

                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      marginTop: 10,
                      paddingRight: 10,
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../assets/tabIcons/tours_icon.png')}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: '#484C52',
                        fontSize: 12,
                        fontFamily: Theme.FONT_FAMILY_MEDIUM,
                      }}>
                      {item?.tours_location}
                      <Text
                        onPress={() => {}}
                        style={{
                          fontSize: 12,
                          color: 'black',
                          textAlign: 'left',
                          fontFamily: Theme.FONT_FAMILY_BOLD,
                          color: Theme.PRIMARY_COLOR,
                          marginRight: 10,
                        }}>
                        {' '}
                        View More
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <MyButton
        title={'Create Tour'}
        loading={false}
        onPress={() => navigation.navigate('TourCreation')}
        textStyle={{
          fontSize: 18,
          fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
          lineHeight: 30,
        }}
        style={{
          borderRadius: 15,
          width: '92%',
          alignSelf: 'center',
          height: 55,
          margin: 10,
          backgroundColor: '#59BFAC',
        }}
      />

      <UploadImageModal
        isVisible={show}
        onPressGallery={confirmDelete}
        onPressCamera={_edit}
        onBackdropPress={() => setShow(false)}
        file={true}
      />
    </View>
  );
};

export default ListYourTourScreen;
