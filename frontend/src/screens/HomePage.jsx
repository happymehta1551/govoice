import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Like from '../../assets/like.svg';
import Dislike from '../../assets/dislike.svg';

const dummyUsers = [
    {
        id: 1,
        name: 'User 1',
        profileImage: 'https://i.pravatar.cc/300',
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nisl',
        media: 'https://picsum.photos/1920/1080',
    },
    {
        id: 2,
        name: 'User 2',
        profileImage: 'https://i.pravatar.cc/300',
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        description: 'This is another sample description for User 2. It can be longer or shorter as needed.',
        media: 'https://picsum.photos/1920/1080',
    },
    // Add more user data entries here...
];

const HomePage = ({ navigation }) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(dummyUsers.map(() => false));
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = () => {
        // Call API to like
        setLiked(!liked);
    };

    const handleDislike = () => {
        // Call API to dislike
        setDisliked(!disliked);
    };

    const toggleDescriptionExpanded = (index) => {
        const newDescriptionExpanded = [...descriptionExpanded];
        newDescriptionExpanded[index] = !newDescriptionExpanded[index];
        setDescriptionExpanded(newDescriptionExpanded);
    };

    return (
        <View style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Text style={styles.title}>GOVOICE</Text>
                </View>
                <View style={styles.columnMain}>
                    <Text style={styles.titleMain}>Timeline</Text>
                    <Text style={styles.subtitleMain}>Posts</Text>
                </View>
                {dummyUsers.map((user, index) => (
                    <View key={user.id} style={styles.userCard}>
                        <View style={styles.column1}>
                            <Image style={styles.userIcon} source={{ uri: user.profileImage }} />
                            <View>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.subtitle}>#{user.subtitle}</Text>
                            </View>
                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.title}>{user.title}</Text>
                            <Text
                                style={[
                                    styles.description,
                                    descriptionExpanded[index] ? { height: 'auto' } : { maxHeight: 40 },
                                ]}
                                numberOfLines={10}
                            >
                                {user.description}
                            </Text>
                            <TouchableOpacity onPress={() => toggleDescriptionExpanded(index)}>
                                <Text style={{ color: 'grey' }}>
                                    {descriptionExpanded[index] ? '...Read Less' : '...Show More'}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.time}>10 mins ago</Text>
                        </View>
                        {user.media && (
                            <View style={styles.column3}>
                                <Image style={styles.media} source={{ uri: user.media }} />
                            </View>
                        )}
                        <View style={styles.column4}>
                            <View style={{ flex: 0.4, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                                    <Like width={25} height={25} />
                                    <Text style={styles.like}>
                                        {10}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
                                    <Dislike width={25} height={25} />
                                    <Text style={styles.like}>
                                        {'3'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={{ color: 'green' }}>
                                        Comment
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    userCard: {
        backgroundColor: '#F8F5F0',
        marginBottom: 20,
        padding: 10,
        width: '80%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,

    },
    columnMain: {
        padding: 10,
        paddingLeft: 20,
        paddingBottom: 40
    },
    titleMain: {
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        lineHeight: 34.5
    },
    subtitleMain: {
        fontSize: 17.47,
        fontWeight: '400',
        color: 'gray',
    },
    column1: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    userIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        marginLeft: 10,
        fontSize: 17.47,
        fontWeight: '500',
        color: 'black',
        lineHeight: 26.21
    },
    column2: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        fontSize: 16,
        color: '#F58960',
        marginLeft: 10,
        // lineHeight: 26.21,
        fontWeight: '700'
    },

    time: {
        fontSize: 13,
        color: '#F58960',
        // lineHeight: 26.21,
        fontWeight: '500',
        paddingTop: 20
    },

    description: {
        fontSize: 16,
        overflow: 'hidden',
        color: 'black'
    },
    column3: {
        padding: 10,
    },
    media: {
        width: '100%',
        height: 200,
    },
    column4: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    like: {
        color: '#545454',
        paddingLeft: 5
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default HomePage;


