import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Close from '../../assets/close.svg';
import {TextInput} from 'react-native-gesture-handler';
import AddFolder from '../../assets/folder-add.svg';
import AddPhoto from '../../assets/Gallary.svg';
import ArrowNext from '../../assets/ArrowNext.svg';

const AddPost = () => {
  return (
    <View style={localStyles.root}>
      <View style={localStyles.createPostContainer}>
        <View style={localStyles.headerContainer}>
          <View style={{flexDirection: 'row', gap: 15}}>
            <View style={localStyles.greenBox} />
            <Text style={localStyles.headerStyle}>Create Post</Text>
          </View>
          <View style={localStyles.closeButtonStyle}>
            <Close width={20} height={20} />
          </View>
        </View>
        <View style={localStyles.postContainer}>
          <Image
            source={{uri: 'https://i.pravatar.cc/300'}}
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          <TextInput
            placeholderTextColor={'#000000'}
            placeholder="What's on your mind?"
            style={localStyles.titleInput}
          />
        </View>
        <TextInput
          placeholderTextColor={'#000000'}
          placeholder="What would you like to share?"
          style={localStyles.descriptionInput}
        />

        <View style={localStyles.footer}>
          <View style={{flexDirection: 'row', gap: 15}}>
            <AddFolder width={25} height={25} />
            <AddPhoto width={25} height={25} />
          </View>
          <View style={localStyles.postBtnStyle}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Post</Text>
            <ArrowNext width={20} height={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddPost;

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  createPostContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FBE8E8',
    borderRadius: 16,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  greenBox: {
    width: 20,
    height: 30,
    backgroundColor: '#B5E4CA',
    borderRadius: 5,
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1D1F',
  },
  closeButtonStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  titleInput: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    lineHeight: 26.21,
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  descriptionInput: {
    marginTop: 15,
    marginLeft: 35,
    fontSize: 16,
    color: 'black',
    lineHeight: 26.21,
    borderRadius: 16,
    backgroundColor: 'white',
    height: 100,
    textAlignVertical: 'top',
    padding: 10,
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  postBtnStyle: {
    backgroundColor: '#2a85ff80',
    borderRadius: 16,
    padding: 15,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
