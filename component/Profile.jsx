import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommonLayout from "./CommonLayout";
import {getAuth, signOut} from "firebase/auth";
import firebaseApp from "../utils/FirebaseConfig";
import {useUser} from '../context/UserContext';


const Profile = ({navigation}) => {
    const {userName, userEmail, userPhotoUrl} = useUser();

    const handleLogout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth)
            .then(() => {
                alert('Logged out successfully!');
                navigation.navigate('SignIn');
            })
            .catch((error) => {
                alert('Failed to log out: ' + error.message);
            });
    };
    return (
        <CommonLayout title='Profile'>
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image source={{uri: userPhotoUrl}} style={styles.profileImage}/>
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{userName}</Text>
                        <Text style={styles.profileInfo}>{userEmail}</Text>
                    </View>

                </View>

                <View style={styles.sectionContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemContent}>
                            <Icon name="person" size={wp('6%')} color="#000"/>
                            <Text style={styles.menuText}>Biodata</Text>
                        </View>
                        <Icon name="chevron-forward" size={wp('6%')} color="#000"/>
                    </TouchableOpacity>

                {/*    <TouchableOpacity style={styles.menuItem}>*/}
                {/*        <View style={styles.menuItemContent}>*/}
                {/*            <Icon name="cube" size={wp('6%')} color="#000"/>*/}
                {/*            <Text style={styles.menuText}>Shipping</Text>*/}
                {/*        </View>*/}
                {/*        <Icon name="chevron-forward" size={wp('6%')} color="#000"/>*/}
                {/*    </TouchableOpacity>*/}

                {/*    <TouchableOpacity style={styles.menuItem}>*/}
                {/*        <View style={styles.menuItemContent}>*/}
                {/*            <Icon name="lock-closed" size={wp('6%')} color="#000"/>*/}
                {/*            <Text style={styles.menuText}>Security</Text>*/}
                {/*        </View>*/}
                {/*        <Icon name="chevron-forward" size={wp('6%')} color="#000"/>*/}
                {/*    </TouchableOpacity>*/}
                </View>

                {/*<View style={styles.sectionContainer}>*/}
                {/*    <TouchableOpacity style={styles.menuItem}>*/}
                {/*        <View style={styles.menuItemContent}>*/}
                {/*            <Icon name="help-circle" size={wp('6%')} color="#000"/>*/}
                {/*            <Text style={styles.menuText}>Help</Text>*/}
                {/*        </View>*/}
                {/*        <Icon name="chevron-forward" size={wp('6%')} color="#000"/>*/}
                {/*    </TouchableOpacity>*/}

                {/*    <TouchableOpacity style={styles.menuItem}>*/}
                {/*        <View style={styles.menuItemContent}>*/}
                {/*            <Icon name="document" size={wp('6%')} color="#000"/>*/}
                {/*            <Text style={styles.menuText}>Terms and Conditions</Text>*/}
                {/*        </View>*/}
                {/*        <Icon name="chevron-forward" size={wp('6%')} color="#000"/>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </CommonLayout>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: wp('4%'),
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileImage: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('10%'),
    },
    profileDetails: {
        flex: 1,
        marginLeft: wp('4%'),
    },
    profileName: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
    },
    profileInfo: {
        fontSize: wp('4%'),
        color: '#777',
    },
    profileEditButton: {
        padding: wp('2%'),
    },
    sectionContainer: {
        marginTop: hp('2%'),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp('4%'),
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        marginLeft: wp('4%'),
        fontSize: wp('4.5%'),
    },
    logoutButton: {
        marginTop: hp('2%'),
        padding: wp('4%'),
        alignItems: 'center',
    },
    logoutText: {
        color: 'red',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
});

export default Profile;