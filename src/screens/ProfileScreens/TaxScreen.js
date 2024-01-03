import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';

const TaxScreen = ({route}) => {
  const navigation = useNavigation();
  const [isTextPayersSelected, setIsTextPayersSelected] = useState(true);

  const taxPayerData = [
    {
      title: 'Taxpayer information',
      description:
        'Tax info is required for most countries/regions. Learn more',
    },
    {
      title: 'Value Added Tax (VAT)',
      description:
        'If you are VAT-registered, please add your \n VAT ID. Learn more',
    },
  ];

  const earningSummaryData = [
    {
      title: '2022',
      description: 'No tax document issued',
    },
    {
      title: '2021',
      description: 'No tax document issued',
    },
    {
      title: '2020',
      description: 'No tax document issued',
    },
    {
      title: '2019',
      description: 'No tax document issued',
    },
    {
      title: '2018',
      description: 'No tax document issued',
    },
    {
      title: '2017',
      description: 'No tax document issued',
    },
  ];

  const earningSummaryRenderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 1,
          shadowColor: '#696969',
          marginBottom: 10,
        }}>
        <Text style={styles.titleTxtStyl}>{item.title}</Text>
        <Text
          style={[styles.descriptionTxtStyl, {marginBottom: 15, marginTop: 4}]}>
          {item.description}
        </Text>
      </View>
    );
  };

  const taxPayerRenderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 1,
          shadowColor: '#696969',
          marginBottom: 10,
        }}>
        <Text style={styles.titleTxtStyl}>{item.title}</Text>
        <Text style={styles.descriptionTxtStyl}>{item.description}</Text>

        <MyButton
          title={'Add tax info'}
          loading={false}
          onPress={() => navigation.navigate('Map')}
          textStyle={{
            fontSize: 18,
            fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
            lineHeight: 30,
          }}
          style={{
            borderRadius: 30,
            width: '50%',
            alignSelf: 'left',
            height: 60,
            marginTop: 15,
            marginBottom: 20,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <MyStatusBar backgroundColor={'#fff'} />

      <View
        style={{
          flexDirection: 'row',
          height: 60,
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
          marginHorizontal: 15,
        }}>
        <Pressable
          onPress={() => navigation.pop(1)}
          style={{width: 35, height: 35, position: 'absolute', left: 0}}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../assets/icons/back_icon.png')}
          />
        </Pressable>

        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: Theme.FONT_FAMILY_BOLD,
            textAlign: 'center',
          }}>
          Taxes
        </Text>
      </View>

      <View style={styles.subContainer}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            onPress={() => setIsTextPayersSelected(true)}
            style={[
              styles.tabFirstTxtStyl,
              {borderBottomWidth: isTextPayersSelected ? 4 : 0},
            ]}>
            Tax Payers
          </Text>
          <Text
            onPress={() => setIsTextPayersSelected(false)}
            style={[
              styles.tabFirstTxtStyl,
              {borderBottomWidth: !isTextPayersSelected ? 4 : 0},
            ]}>
            Tax Documents
          </Text>
        </View>

        {isTextPayersSelected ? (
          <View style={{marginTop: 20}}>
            <FlatList
              style={{height: '50%'}}
              data={taxPayerData}
              renderItem={taxPayerRenderItem}
            />
            <Text style={[styles.titleTxtStyl, {marginTop: 40}]}>
              Need hellp?
            </Text>
            <Text style={styles.descriptionTxtStyl}>
              {'Get answers to questions about taxes in \n our'}
              <Text style={styles.titleTxtStyl}>Help Center.</Text>
            </Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.descriptionTxtStyl}>
              {
                'Tax documents required for filing taxes \n are available to review and download here. \n\n You can also file taxes using detailed \nearnings info, available in the\n'
              }
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    color: Theme.PRIMARY_COLOR,
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                earnings summary
              </Text>
            </Text>

            <FlatList
              style={{height: '50%', marginTop: 20}}
              data={earningSummaryData}
              renderItem={earningSummaryRenderItem}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  tabFirstTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_BOLD,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    marginLeft: 10,
    borderBottomWidth: 4,
    borderColor: Theme.PRIMARY_COLOR,
    paddingBottom: 5,
  },
  titleTxtStyl: {
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_BOLD,
    fontSize: Theme.FONT_SIZE_LARGE,
  },
  descriptionTxtStyl: {
    color: '#8A8A8A',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_MEDIUM,
    marginTop: 10,
  },
});

export default TaxScreen;
