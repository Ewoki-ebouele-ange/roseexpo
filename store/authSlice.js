import { createSlice } from "@reduxjs/toolkit"

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataValue = async (value) => {
  try {
    await AsyncStorage.setItem('my', value);
  } catch (e) {
    // saving error
  }
  console.log("storeDataValue", value)
};

const storeDataObject = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
    console.log("storeDataObjetc", jsonValue)
  } catch (e) {
    // saving error
  }

};

const mergeUsers = async (value) => {
  try {
    //save first user
    await AsyncStorage.setItem('@MyApp_user', JSON.stringify(value))

    // merge USER_2 into saved USER_1
    //  await AsyncStorage.mergeItem('@MyApp_user', JSON.stringify(USER_2))

    // read merged item
    const currentUser = await AsyncStorage.getItem('@MyApp_user')

    console.log("currentUser", currentUser)
  } catch (e) { }
}
const initialState = {
  id:"",
  isLoggedIn: false,
  ville: "",
  metier: "",
  email: "",
  name: "",
  genre: "",
  age: 0,
  dateNaissance: [],
  interet: [],
  categorieRose: "",
  position: "",
  password: "",
  phoneNumber: "",
  tabImg: [],
  distanceMax: 1000,
  distanceMaxBoolean: false,
  bois: false,
  fumes: false,
  ageMax: 18,
  ageMaxBoolean: false,
}

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.userName;
      state.age = action.payload.age;
      state.ville = action.payload.ville;
      state.metier = action.payload.metier;

      state.interet = action.payload.interet;
      state.genre = action.payload.genre;
      state.dateNaissance = action.payload.dateNaissance;

      state.phoneNumber = action.payload.phoneNumber;
      state.position = action.payload.position;
      state.tabImg = action.payload.tabImg;
      state.categorieRose = action.payload.categorieRose;

      state.distanceMax = 1000;
      state.distanceMaxBoolean = false;
      state.bois = false;
      state.fumes = false;
      state.ageMax = 18;
      state.ageMaxBoolean = false;

      mergeUsers((action.payload))

    },
    setSignOut: (state) => {
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
    },
    setLogin: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
      //  console.log(action)
      storeDataObject(action.payload)
      mergeUsers(action.payload)
      console.log("action", action)
      console.log("state", state)
    },
    validerParametre: (state, action) => {
      state.distanceMax = action.payload.distanceMax,
        state.distanceMaxBoolean = action.payload.distanceMaxBoolean;
      state.ageMax = action.payload.ageMax;
      state.ageMaxBoolean = action.payload.ageMaxBoolean;
      state.interet = action.payload.interet;
      state.categorieRose = action.payload.categorieRose;
      console.log(action.payload)
    },
    test: (state, action) => {
      console.log("valaba", action.payload)
    },
    updateUserDate: (state, action) => {
      mergeUsers(action.payload)
    }

  }
});

export const { setSignIn, setSignOut, setLogin, validerParametre, test, updateUserDate } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectEmail = (state) => state.userAuth.email;
export const selectName = (state) => state.userAuth.name;
export const selectGenre = (state) => state.userAuth.genre;
export const selectDateNaissance = (state) => state.userAuth.dateNaissance;
export const selectInteret = (state) => state.userAuth.interet;
export const selectPosition = (state) => state.userAuth.position;
export const selectPhoneNumber = (state) => state.userAuth.phoneNumber;
export const selecttabImg = (state) => state.userAuth.tabImg;

export const selectDistanceMax = (state) => state.userAuth.distanceMax;
export const selectDistanceMaxBoolean = (state) => state.userAuth.distanceMaxBoolean;
export const selectAgeMax = (state) => state.userAuth.ageMax;
export const selectAgeBoolean = (state) => state.userAuth.ageMaxBoolean;
export const selectFumes = (state) => state.userAuth.fumes;
export const selectBois = (state) => state.userAuth.bois;
//export const selectAgeBoolean = (state) => state.userAuth.ageMaxBoolean;
//export const selectA = (state) => state.userAuth.tabImg;


export default authSlice.reducer;