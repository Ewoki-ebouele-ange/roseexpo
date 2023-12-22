import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import CartePhoto from '../otherscreens/CartePhoto';
import ModalScreen from '../otherscreens/ModalScreen';
import Swiper from 'react-native-deck-swiper';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
const WIDTH = Dimensions.get('screen').width

import { db } from '../../config'
import { collection, doc, setDoc, onSnapshot, getDocs, query, where, getDoc, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import firebase from '../../config';
import { NavContext } from '../../App';
import generateId from '../../lib/generated';
import { useNavigation } from '@react-navigation/native';
import MatchPage from '../otherscreens/MatchPage';
import LottieView from 'lottie-react-native';



export default function OneScreen() {

  const swipeRef = useRef(null)
  const navigation = useNavigation()
  const animation = useRef(null);

  const { user, userData, modalMatch, setModalMatch } = useContext(NavContext)
  const [profiles, setProfiles] = useState([])

  function dist(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon moyen de la Terre en kilomètres

    // Convertir les latitudes et longitudes de degrés à radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Calculer les différences de latitude et de longitude
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Appliquer la formule de Haversine
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculer la distance en kilomètres
    const distance = R * c;

    return distance
}

//&& (dist(userData.position[0], userData.position[1], doc.data().position[0], doc.data().position[1]) <= userData.distanceMax ) && (doc.data().age <= userData.ageMax )

  useEffect(() => {
    let unsubscribe

    const fectCards = async () => {

      const passes = await getDocs(collection(db, 'users', userData.id, 'passes')).then
        (snapshot => snapshot.docs.map(doc => doc.id)
        )

      const swipes = await getDocs(collection(db, 'users', userData.id, 'swipes')).then
        (snapshot => snapshot.docs.map(doc => doc.id)
        )

      const passedUserIds = passes.length > 0 ? passes : ['test']
      const swipedUserIds = swipes.length > 0 ? swipes : ['test']

      unsubscribe = onSnapshot(
        query(
          collection(db, 'users'),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs.filter(doc => (doc.id !== userData.id) ).map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          )
        })
    }
    fectCards();
    return unsubscribe;
  }, [db])

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex]
    console.log(`You swiped PASS on ${userSwiped.email}`)

    setDoc(doc(db, 'users', userData.id, 'passes', userSwiped.id),
      userSwiped
    )
  }

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex]

    const loggedInProfile = await (
      await getDoc(doc(db, 'users', userData.id))
    ).data()

    //check if the user swiped on you...
    await getDoc(doc(db, 'users', userSwiped.id, 'swipes', userData.id)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //User t'a matché avant que toi tu ne le fasses


          console.log(`Heyyyy, You MATCHED with ${userSwiped.email}`)
          setDoc(doc(db, 'users', userData.id, 'swipes', userSwiped.id),
            userSwiped
          )

          //Création du MATCH
          setDoc(doc(db, 'matches', generateId(userData.id, userSwiped.id)),
            {
              users: {
                [userData.id]: loggedInProfile,
                [userSwiped.id]: userSwiped
              },
              usersMatched: [userData.id, userSwiped.id],
              timestamp: serverTimestamp()
            })


          //Générer la modal du match entre deux personnes

          // navigation.navigate("Match", {
          //   loggedInProfile,
          //   userSwiped
          // })

          setModalMatch(true)

          //  {!modalMatch && <MatchPage loggedInProfile={loggedInProfile} userSwiped={userSwiped} /> }

        } else {
          //User has swiped as first interaction between the two or didnt get swiped on...
          //console.log(`You swiped  on ${userSwiped.email} (${userSwiped.job})`)

          setDoc(doc(db, 'users', userData.id, 'swipes', userSwiped.id),
            userSwiped
          )
          console.log('userSwiped', userSwiped)
        }
      }
    )

    /* console.log('userSwiped',userSwiped)
   
     console.log(`You swiped  on ${userSwiped.email} (${userSwiped.job})`)
   
     setDoc(doc(db, 'users', JSON.parse(se).uid, 'swipes', userSwiped.id),
     userSwiped
     )*/

  }





  return (
    <React.Fragment>
      <View style={styles.swiperView}>
        {/*<TouchableOpacity onPress={unsubscribe}>Remplir le tableau</TouchableOpacity>*/}
        <Swiper
          ref={swipeRef}
          cards={profiles}
          containerStyle={{ backgroundColor: "transparent", }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          animateCardOpacity
          verticalSwipe={true}
          onSwiped={(cardIndex) => { console.log("Bien connecté") }}
          onSwipedAll={() => { console.log('onSwipedAll') }}
          cardIndex={0}
          backgroundColor={'#4FD8E9'}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe NOPE")
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH")
            swipeRight(cardIndex)
          }}
          renderCard={(card) => card ?

            (

              <CartePhoto swipeLeft={() => swipeRef.current.swipeLeft()} swipeRight={() => swipeRef.current.swipeRight()} card={card} />

            ) : (
              <View style={styles.Infos2}>
                <Text style={{ fontSize: 24, lineHeight: 32 }}>
                  No more pictures
                </Text>
                <LottieView
                  autoPlay
                  loop
                  ref={animation}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require('../../assets/anime2.json')}
                />
              </View>
            )
          }

        ></Swiper>
      </View>

      <ModalScreen />
      <MatchPage />

    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  heartCross: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30
  },
  Infos2: {
    //  backgroundColor:'white',
    gap: 40,
    height: "75%",
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  Infos: {
    // backgroundColor:'white',
    width: "100%",
    height: 70,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 15
  },
  image: {
    width: 80,
    height: 80
  },
  swiperView: {
    //  flex:1,
    marginTop: -60,
    //  backgroundColor:"white",
    width: WIDTH,
    zIndex: 9999
  },
  imgProf: {
    width: "100%",
    position: 'absolute',
    top: 0,
    height: "100%",
    borderRadius: 10
  }
});
