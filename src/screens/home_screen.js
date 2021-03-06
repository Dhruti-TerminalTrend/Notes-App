import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useSelector} from 'react-redux';
import {MenuIcon} from '../components/asset_icons';
import {Fab} from '../components/fab';
import {AppHeader} from '../components/header';
import AppBarContext from '../context/appbar_context';
import {isDarkMode} from '../styles/theme';
export default HomeScreen = ({navigation, route}) => {
  //STATE MANAGEMENT NOTES
  const notes = useSelector(state => state.note_reducer);
  console.log('NOTES LENGTH => ' + notes.length);

  const handleLongPressOnItem = (id, toggleDeleteButton) => {
    console.log(id);
    toggleDeleteButton();
  };

  return (
    // <ScrollView>
    <View style={{flex: 1}}>
      {notes.length > 0 ? (
        <FlatList
          numColumns={2}
          data={notes}
          style={{width: '100%'}}
          renderItem={item => (
            console.log(item.item.payload),
            (
              <View key={item.item.payload.id} style={style.noteContainer}>
                <AppBarContext.Consumer>
                  {data => {
                    console.log('-------', data);
                    return (
                      <TouchableOpacity
                        onPress={
                          data.toggleDeleteButton
                          // handleLongPressOnItem(item.item.payload.id,toggleDeleteButton)
                        }>
                        <Text style={style.title}>
                          {item.item.payload.title}
                        </Text>
                        <Text style={style.description}>
                          {item.item.payload.description}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                </AppBarContext.Consumer>
              </View>
            )
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text>No Notes till now</Text>
        </View>
      )}
      <Fab onPressed={() => navigation.navigate('Add', {})}></Fab>
    </View>
    // <AppBarContext.Provider value={{showDeleteButton, setShowDeleteButton}}>
    //   <View style={{flex: 1}}>
    //     {notes.length > 0 ? (
    //       <FlatList
    //         numColumns={2}
    //         data={notes}
    //         style={{width: '100%'}}
    //         renderItem={item => (
    //           console.log(item.item.payload),
    //           (
    //             <View key={item.item.payload.id} style={style.noteContainer}>
    //               <TouchableOpacity
    //                 onLongPress={handleLongPressOnItem(item.item.payload.id)}>
    //                 <Text style={style.title}>{item.item.payload.title}</Text>
    //                 <Text style={style.description}>
    //                   {item.item.payload.description}
    //                 </Text>
    //               </TouchableOpacity>
    //             </View>
    //           )
    //         )}
    //         keyExtractor={item => item.id}
    //       />
    //     ) : (
    //       <View
    //         style={{
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           height: '100%',
    //         }}>
    //         <Text>No Notes till now</Text>
    //       </View>
    //     )}
    //     <Fab onPressed={() => navigation.navigate('Add', {})}></Fab>
    //   </View>
    // </AppBarContext.Provider>

    // </ScrollView>
  );
};

const style = StyleSheet.create({
  description: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#757575',
    maxHeight: 300,
    paddingVertical: 10,
  },
  title: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#4ACFAC',
  },
  noteContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
});
