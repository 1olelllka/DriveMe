import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, TextInput, Animated, Alert, SafeAreaView, Platform} from 'react-native'
import { useFonts } from 'expo-font';
import {FontAwesome} from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';


export const List = ({navigation}) => {

    const [carList, setCarList] = useState([])
    const [category, setCategory] = useState([])
    const [user, setUser] = useState('anonymos') // user data
    const [token, setToken] = useState('none') // token 
    const [refreshed, setRefresh] = useState(false)

    const [signupModal, setSignupModal] = useState(false)
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupFullname, setSignupFullname] = useState('')

    const [loginModal, setLoginModal] = useState(false)
    const [loginUsername, setLoginUsername] = useState('') 
    const [loginPassword, setLoginPassword] = useState('')

    // CARS AND STUFF
    useEffect(() => {
        fetch('http://localhost:8000/', {
        })
        .then(response => response.json())
        .then((data) => {
            setCarList(data)
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8000/categories/', {
        })
        .then(response => response.json())
        .then((data) => {
            setCategory(data)
        })
    }, [])

    // AUTH 

    useEffect(() => {
        fetch(`http://localhost:8000/user/${loginUsername.trim()}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token.auth_token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
            navigation.addListener('focus', () => {
                console.log('Refreshed! \n -----------');
                setRefresh(!refreshed)
            });
            if (token != 'none') {
                setUser(data)
            }
        })
    }, [token, navigation, refreshed])

    const auth = (user) => {
        fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(() => {
            login({'username':user.username, 'password':user.password})
        })
    }

    const login = (user) => {
        fetch('http://localhost:8000/auth/token/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then((data) => {
            if (data.auth_token) {
                setToken(data)
            } else {
                Alert.alert('Login Error', 'Credentials were provided incorrectly, please try again')
            }
        })
    }

    const logout = () => {
        fetch('http://localhost:8000/auth/token/logout/', {
            method: 'POST',
            headers: {
                'Authorization' : `Token ${token.auth_token}`
            }
        })
        .then(setUser('anonymos'))
        .then(() => {
            setLoginUsername('')
            setToken('none')
        })
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------

    // ANIMATION FOR OPACITY (MODAL)

    const opacityAnimation = useRef(new Animated.Value(1)).current
    const opacityStyle = {opacity: opacityAnimation}
    const startAnimateElem = () => {
        Animated.timing(opacityAnimation, {
            toValue: 0.1,
            duration: 400,
            useNativeDriver: true
        }).start()
    }
    const endAnimateElem = () => {
        Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start()
    }

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------


    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('../fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../fonts/Roboto-Light.ttf'),
        'Roboto-Black': require('../fonts/Roboto-Black.ttf'),
        'Roboto-Regular': require('../fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../fonts/Roboto-Medium.ttf'),
        'Montserrat-Regular': require('../fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../fonts/Montserrat-Medium.ttf')
      });

    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView>
        {/* LOGIN  */}
        <Modal animationType='fade' transparent={true} visible={loginModal} onShow={() => startAnimateElem()} onRequestClose={() => {
            setLoginModal(false)
            endAnimateElem()
            }}>
            <View style={styles.modal}>
                {Platform.OS === 'ios' 
                ?
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: '10%', marginBottom: '5%'}}>
                    <TouchableOpacity style={styles.back} onPress={() => {
                        setLoginModal(false)
                        endAnimateElem()}} >
                        <AntDesign name="arrowleft" size={22} color="black" />
                    </TouchableOpacity>
                    <Text style={{marginTop: '1%', fontFamily: 'Roboto-Medium', fontSize: 25, marginLeft: '15%'}}>Log In Form</Text>
                </View>
                : <Text style={{marginTop: '10%', fontFamily: 'Roboto-Medium', fontSize: 25, textAlign: 'center'}}>Log In Form</Text>
                }
                
                <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Username</Text>
                <TextInput style={styles.loginUsernameInput} value={loginUsername} onChangeText={setLoginUsername} placeholder='Username'/>
                <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Password</Text>
                <TextInput style={styles.loginUsernameInput} value={loginPassword} onChangeText={setLoginPassword}  placeholder='Password' secureTextEntry={true}/>
                <TouchableOpacity 
                    style={styles.submit}
                    onPress={() => {
                        if (!loginUsername) {
                            Alert.alert('Error', 'Username cannot be empty')
                        } else if (!loginPassword) {
                            Alert.alert('Error', 'Password cannot be empty')
                        } else {
                            login({'username': loginUsername.trim(),
                                'password': loginPassword})
                        }
                        setLoginModal(false)
                        setLoginPassword('')
                    endAnimateElem()
                    }}>
                    <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </Modal>

        {/* SIGNUP */}
        <Modal animationType='fade' transparent={true} visible={signupModal} onShow={() => startAnimateElem()} onRequestClose={() => {
            setSignupModal(false)
            endAnimateElem()
            }}>
            <KeyboardAwareScrollView resetScrollToCoords={{x:0, y:0}} showsVerticalScrollIndicator={false}>
                <View style={styles.modalsignup}>
                    {Platform.OS === 'ios' 
                    ?
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: '10%', marginBottom: '5%'}}>
                        <TouchableOpacity style={styles.back} onPress={() => {
                            setSignupModal(false)
                            endAnimateElem()}} >
                            <AntDesign name="arrowleft" size={22} color="black" />
                        </TouchableOpacity>
                        <Text style={{marginTop: '1%', fontFamily: 'Roboto-Medium', fontSize: 25, marginLeft: '15%'}}>Sign Up Form</Text>
                    </View>
                    : <Text style={{marginTop: '10%', fontFamily: 'Roboto-Medium', fontSize: 25, textAlign: 'center'}}>Sign Up Form</Text>
                    }
                    <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Username</Text>
                    <TextInput style={styles.loginUsernameInput} value={signupUsername} onChangeText={setSignupUsername} placeholder='Username'/>
                    <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Full Name</Text>
                    <TextInput style={styles.loginUsernameInput} value={signupFullname} onChangeText={setSignupFullname} placeholder='Full name'/>
                    <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Email</Text>
                    <TextInput style={styles.loginUsernameInput} value={signupEmail} onChangeText={setSignupEmail} placeholder='Email'/>
                    <Text style={{marginTop: '5%', marginLeft: '5%',fontFamily: 'Roboto-Regular', fontSize: 20}}>Your Password</Text>
                    <TextInput style={styles.loginUsernameInput} value={signupPassword} onChangeText={setSignupPassword}  placeholder='Password' secureTextEntry={true}/>
                    <TouchableOpacity 
                        style={styles.submit}
                        onPress={() => {
                        if (!signupUsername) {
                            Alert.alert('Error', 'Username cannot be empty')
                        } else if (!signupPassword) {
                            Alert.alert('Error', 'Password cannot be empty')
                        } else if (signupPassword.length < 8) {
                            Alert.alert('Error', 'Password must be at least 8 characters long')
                        } else if (!signupFullname) {
                            Alert.alert('Error', 'Full name cannot be empty')
                        } else if (!signupEmail) {
                            Alert.alert('Error', 'Email cannot be empty')
                        } else {
                            auth({'username': signupUsername, 'password': signupPassword, 'full_name': signupFullname, 'email': signupEmail})
                        }
                        setLoginUsername(signupUsername)
                        setSignupModal(false)
                        setSignupUsername('')
                        setSignupPassword('')
                        setSignupEmail('')
                        setSignupFullname('')
                        endAnimateElem()
                        }}>
                        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </Modal>

        <Animated.ScrollView style={[{backgroundColor: "#F3F4F6"}, opacityStyle]} showsVerticalScrollIndicator={false}>

            {/* User  */}

            {user == 'anonymos'
            ?
                <View style={{flex:1, flexDirection: 'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={[styles.auth, {paddingHorizontal: '10%'}]} onPress={() => {
                        startAnimateElem()
                        setLoginModal(true)
                        }}>
                        <Text style={{fontFamily: 'Roboto-Medium',fontSize: 20,}}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.auth} onPress={() => setSignupModal(true)}>
                        <Text style={{fontFamily: 'Roboto-Medium',fontSize: 20,}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            :
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.account} onPress={() => navigation.navigate('User', {'user': user, 'token':token.auth_token})}>
                        <View style={{flex:1, flexDirection: 'row', justifyContent:'space-around'}}>
                            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 23, alignSelf: 'center', marginLeft: '5%'}}>{user.full_name}</Text>
                            {user.photo 
                            ? <Image source={{uri: user.photo}} style={{width: '23%', height: '75%', borderRadius: 15, alignSelf: 'center'}}/>
                            : <Text style={styles.noPhoto}>No Photo</Text>
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logout} onPress={() => logout()}>
                        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 18}}>Log out</Text>
                    </TouchableOpacity>
                </View>
            }

            {/* Categories  */}

            <View>
                <Text style={styles.available}>Available Categories</Text>
                <FlatList style={{marginLeft: 15}} horizontal={true} data={category} renderItem={({item}) => (
                    <Text style={styles.carType}>{item.name}</Text>
                )} />
            </View>

            {/* SUV  */}

            <View style={{marginTop: '3%', marginLeft: '4%'}}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 28}}>SUV</Text>
                    <FlatList style={{marginTop: 20}} showsHorizontalScrollIndicator={false} horizontal={true} data={carList} renderItem={({item}) => (
                            <View>
                            {item.category.name == 'SUV' && 
                                        <TouchableOpacity style={[styles.cars, 
                                            item.color.name == 'Red' ? 
                                                {backgroundColor: '#f07067'} 
                                                : item.color.name == 'Yellow' ? 
                                                {backgroundColor: '#F7C576'} 
                                                : item.color.name == 'White' ?
                                                {backgroundColor: '#e8e7e6'}
                                                : item.color.name == 'Gray' ?
                                                {backgroundColor: '#23272B'}
                                                : {backgroundColor: '#000'}]} onPress={() => navigation.navigate('Detail', {'slug': item.slug, 'user':user, 'token':token.auth_token})}>
                                            <Text style={[{color: 'black', fontFamily: 'Roboto-Medium', paddingLeft: 20, paddingTop: 20}, 
                                            item.color.name == 'Gray' && {color: 'white'}]}>
                                                <FontAwesome name="star" size={15} color={item.color.name == 'Gray' ? 'white' : 'black'} /> {item.shop_rating}
                                            </Text>
                                            <Image source={{ uri: 'http://localhost:8000' + item.image}} style={{width: 200, height: 150}} resizeMode='contain'/>
                                            <Text style={[{fontFamily: 'Roboto-Medium', fontSize: 17, paddingLeft: 10},
                                            item.color.name == 'Gray' && {color: '#fff'}]}>
                                                {item.full_name}
                                            </Text>     
                                            <Text style={[{fontFamily: 'Roboto-Light', fontSize: 15, paddingTop: 5, paddingLeft: 10, paddingBottom: 7}, 
                                            item.color.name == 'Red' ? 
                                            {color: '#000'}
                                            : {color: '#e3e3e3'}]}>
                                            
                                            <Text style={[{fontFamily: 'Roboto-Medium', fontSize: 17, color: 'black'}, 
                                            item.color.name == 'Gray' ?
                                            {color: 'white'}
                                            : {color: '#000'}]}>
                                                ${item.price_per_day}
                                            </Text> /Day</Text>
                                        </TouchableOpacity>
                                    }  
            
                                </View>
                        )} />
            </View>

            {/* Sedan */}

            <View style={{marginTop: '5%', marginLeft: '4%'}}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 28}}>Sedan</Text>
                    <FlatList style={{marginTop: 20}} showsHorizontalScrollIndicator={false} horizontal={true} data={carList} renderItem={({item}) => (
                        <View>
                        {item.category.name == 'Sedan' && 
                                    <TouchableOpacity style={[styles.cars, 
                                        item.color.name == 'Red' ? 
                                            {backgroundColor: '#f07067'} 
                                            : item.color.name == 'Yellow' ? 
                                            {backgroundColor: '#F7C576'} 
                                            : item.color.name == 'White' ?
                                            {backgroundColor: '#e8e7e6'}
                                            : item.color.name == 'Green' ?
                                            {backgroundColor: '#bdebb9'}
                                            : {backgroundColor: '#000'}]}  onPress={() => navigation.navigate('Detail', {'slug': item.slug, 'user':user, 'token':token.auth_token})}>
                                        <Text style={{color: 'black', fontFamily: 'Roboto-Medium', paddingLeft: 20, paddingTop: 20}}><FontAwesome name="star" size={15} color="black" /> {item.shop_rating}</Text>
                                        <Image source={{ uri: 'http://localhost:8000' + item.image}} style={{width: 200, height: 150}} resizeMode='contain'/>
                                        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 17, paddingLeft: 10}}>{item.full_name}</Text>     
                                        <Text style={[{fontFamily: 'Roboto-Light', fontSize: 15, paddingTop: 5, paddingLeft: 10, paddingBottom: 7}, item.color.name == 'Red' && {color: '#000'}]}><Text style={{fontFamily: 'Roboto-Medium', fontSize: 17, color: 'black'}}>${item.price_per_day}</Text> /Day</Text>
                                    </TouchableOpacity>
                                }  
          
                            </View>
                    )} />
            </View>

            {/* Convertible */}

            <View style={{marginTop: '5%', marginLeft: '4%'}}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 28}}>Convertible</Text>
                    <FlatList style={{marginTop: 20, marginBottom: 20}} horizontal={true} showsHorizontalScrollIndicator={false} data={carList} renderItem={({ item }) => (
                    <View>
                    {item.category.name == 'Convertible' && 
                                <TouchableOpacity style={[styles.cars, 
                                    item.color.name == 'Red' ? 
                                        {backgroundColor: '#f07067'} 
                                        : item.color.name == 'Yellow' ? 
                                        {backgroundColor: '#F7C576'} 
                                        : {backgroundColor: '#000'}]}  onPress={() => navigation.navigate('Detail', {'slug': item.slug, 'user':user, 'token':token.auth_token})}>
                                    <Text style={{color: 'black', fontFamily: 'Roboto-Medium', paddingLeft: 20, paddingTop: 20}}><FontAwesome name="star" size={15} color="black" /> {item.shop_rating}</Text>
                                    <Image source={{ uri: 'http://localhost:8000' + item.image}} style={{width: 200, height: 150}} resizeMode='contain'/>
                                    <Text style={{fontFamily: 'Roboto-Medium', fontSize: 17, paddingLeft: 10}}>{item.full_name}</Text>     
                                    <Text style={[{fontFamily: 'Roboto-Light', fontSize: 15, paddingTop: 5, paddingLeft: 10, paddingBottom: 7}, item.color.name == 'Red' && {color: '#000'}]}><Text style={{fontFamily: 'Roboto-Medium', fontSize: 17, color: 'black'}}>${item.price_per_day}</Text> /Day</Text>
                                </TouchableOpacity>
                            }  
      
                        </View>
                    )} />
            </View>
        </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    account: {
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? '2%' : '12%',
        // paddingVertical: '4%',
        width: '65%',
        alignSelf: 'center',
        borderRadius: 25,
        elevation: 1,
    },
    carType: {
        color: 'grey',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        textAlign: 'center',
        marginLeft: 3,
    },
    cars: {
      borderRadius: 20,
      marginRight: 20,
      elevation: 3,
      alignContent: 'center',
      justifyContent: 'center',
      maxWidth: '90%'
    },
    available: {
        marginLeft: '5%',
        marginTop: '4%',
        marginBottom: '2%',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'grey'
    },
    logout: {
        marginTop: Platform.OS == 'ios' ? '3%' : '12.5%',
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '6.5%',
    },
    auth: {
        marginTop: Platform.OS === 'ios' ? '2%' : '10%',
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingVertical: '4%',
        elevation: 1
    },
    modal: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '85%',
        marginTop: '50%',
        borderRadius: 20,
    },
    modalsignup: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '85%',
        marginTop: '35%',
        borderRadius: 20
    },
    loginUsernameInput: {
        borderBottomWidth: 1,
        marginTop: '5%',
        width: '85%',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    submit: {
        marginTop: '8%',
        fontSize: 20,
        alignSelf: 'center',
        borderColor: '#dedede',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: '6%',
        paddingVertical: '2%',
        backgroundColor: '#f2f2f2',
        marginBottom: '5%'
    },
    noPhoto: {
        fontFamily: 'Roboto-Regular',
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
        width: '23%',
        borderRadius: 10,
        backgroundColor: '#f2f2f2'
    },
    back: {
        padding: '2.5%',
        textAlign: 'center',
        borderRadius: 15,
        alignSelf: 'flex-start',
        backgroundColor: '#dedede',
        marginTop: Platform.OS == 'ios' ? '2% ':'10%',
        marginLeft: '4%'
    },
})