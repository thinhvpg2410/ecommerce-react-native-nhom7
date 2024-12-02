import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import CommonLayout from "./CommonLayout";
import {useUser} from '../context/UserContext';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import CLOUDINARY_CONFIG from "../utils/CloudinaryConfig";

const ProfileDetail = ({navigation}) => {
    const {userName, userEmail, userPhotoUrl, setUserName, setUserPhotoUrl} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(userName);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);


    const defaultPhotoURL = 'https://www.svgrepo.com/show/452030/avatar-default.svg';

    // Handle avatar editing
    const handleEditAvatar = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const { uri, type, fileName } = response.assets[0];

                // Check if URI is valid
                if (!uri) {
                    console.error('Invalid URI from ImagePicker:', response.assets[0]);
                    return;
                }

                // Default values if metadata is missing
                const fileType = type || 'image/jpeg';
                const fileNameWithExtension = fileName || 'upload.jpg';

                try {
                    setIsUploadingAvatar(true);
                    console.log('Starting upload with URI:', uri);
                    const cdnUrl = await uploadToCloudinary(uri, fileType, fileNameWithExtension);
                    setUserPhotoUrl(cdnUrl);
                } catch (error) {
                    Alert.alert('Upload failed', 'Failed to upload the image. Please try again.');
                    console.error('Cloudinary upload error:', error);
                } finally {
                    setIsUploadingAvatar(false);
                }
            }
        });
    };

// Function to upload to Cloudinary
    const uploadToCloudinary = async (uri, fileType, fileName) => {
        // Create FormData with properly structured file object
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: fileType,
            name: fileName,
        });
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

        // Log FormData details for debugging
        console.log('FormData:', {
            uri,
            type: fileType,
            name: fileName,
        });

        try {
            const response = await axios.post(CLOUDINARY_CONFIG.apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Upload successful:', response.data);
                return response.data.secure_url;
            } else {
                console.error('Cloudinary upload failed:', response.data);
                throw new Error('Failed to upload image to Cloudinary');
            }
        } catch (error) {
            if (error.response) {
                console.error('Cloudinary Error Response:', error.response.data);
            }
            throw error;
        }
    };

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        if (updatedName.trim()) {
            setUserName(updatedName);
        }
        setIsEditing(false);
    };

    const handleCancelPress = () => {
        setUpdatedName(userName);
        setIsEditing(false);
    };

    return (
        <CommonLayout>
            <View style={styles.container}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{uri: userPhotoUrl || defaultPhotoURL}}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.avatarEditButton} onPress={handleEditAvatar}>
                        <Icon name="pencil" size={wp('2%')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Full Name:</Text>
                    {isEditing ? (
                        <>
                            <TextInput
                                value={updatedName}
                                onChangeText={setUpdatedName}
                                style={styles.input}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.fullName}>{userName}</Text>
                            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </CommonLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarEditButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        width: '80%',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileDetail;
