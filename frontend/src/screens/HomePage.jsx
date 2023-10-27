import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    BackHandler
} from 'react-native';
import Like from '../../assets/like.svg';
import LikeFilled from '../../assets/like-filled.svg';
import Dislike from '../../assets/dislike.svg';
import DislikeFilled from '../../assets/dislike-filled.svg';
import Comment from '../../assets/comment.svg';
import Logo from '../../assets/logo.svg';
import Horizontal from '../../assets/horizontal.svg';
import Submit from '../../assets/submit.svg';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import environment from '../environment';
import { formatDistanceToNow } from 'date-fns';

const dummyUsers = [
    {
        "post": {
            "p_id": 1,
            "cust_id": 1,
            "title": "First Post",
            "description": "This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.This is my first post.",
            "like_count": 16,
            "dislike_count": 4,
            "comment_count": 6,
            "post_active": "1",
            "post_image": null,
            "categories": null
        },
        "customer": {
            "cust_id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "ph_no": "123-456-7890",
            "email": "john.doe@email.com",
            "gender": "Male",
            "country": "USA",
            "state": "New York",
            "city": "New York",
            "pincode": "10001",
            "flag_verify": "1",
            "dob": "1990-05-15",
            "role": "C",
            "cust_active": "1",
            "region": null,
            "password": "john",
            "profile_image": null
        },
        "postComments": [
            {
                "pc_id": 1,
                "cust_id": 1,
                "p_id": 1,
                "comment": "Great first post!"
            },
            {
                "pc_id": 2,
                "cust_id": 2,
                "p_id": 1,
                "comment": "Looking forward to more posts from you."
            },
            {
                "pc_id": 9,
                "cust_id": 1,
                "p_id": 1,
                "comment": "Added new post"
            },
            {
                "pc_id": 10,
                "cust_id": 1,
                "p_id": 1,
                "comment": "Added new comment in post-1"
            }
        ],
        "categoryList": [
            {
                "cat_id": 4,
                "cat_name": "Students",
                "cat_description": "Student",
                "cat_timestamp": "2023-10-27 01:41:14",
                "update_timestamp": "2023-10-27 01:41:14"
            }
        ]
    },
    {
        "post": {
            "p_id": 2,
            "cust_id": 2,
            "title": "Summer Vacation",
            "description": "Enjoying the sun and sand!",
            "like_count": 15,
            "dislike_count": 1,
            "comment_count": 7,
            "post_active": "1",
            "post_image": null,
            "categories": null
        },
        "customer": {
            "cust_id": 2,
            "first_name": "Alice",
            "last_name": "Smith",
            "ph_no": "987-654-3210",
            "email": "alice.smith@email.com",
            "gender": "Female",
            "country": "USA",
            "state": "California",
            "city": "Los Angeles",
            "pincode": "90001",
            "flag_verify": "1",
            "dob": "1985-09-20",
            "role": "C",
            "cust_active": "1",
            "region": null,
            "password": "",
            "profile_image": null
        },
        "postComments": [
            {
                "pc_id": 3,
                "cust_id": 3,
                "p_id": 2,
                "comment": "I wish I could go on a summer vacation too."
            },
            {
                "pc_id": 4,
                "cust_id": 4,
                "p_id": 2,
                "comment": "Your pictures are amazing!"
            }
        ],
        "categoryList": [
            {
                "cat_id": 1,
                "cat_name": "Travel",
                "cat_description": "Travel",
                "cat_timestamp": "2023-10-20 16:41:14",
                "update_timestamp": "2023-10-20 16:41:14"
            }
        ]
    },
    {
        "post": {
            "p_id": 3,
            "cust_id": 3,
            "title": "Tech News",
            "description": "New tech gadgets and updates.",
            "like_count": 20,
            "dislike_count": 3,
            "comment_count": 8,
            "post_active": "1",
            "post_image": null,
            "categories": null
        },
        "customer": {
            "cust_id": 3,
            "first_name": "Bob",
            "last_name": "Johnson",
            "ph_no": "555-555-5555",
            "email": "bob.johnson@email.com",
            "gender": "Male",
            "country": "USA",
            "state": "Texas",
            "city": "Dallas",
            "pincode": "75001",
            "flag_verify": "0",
            "dob": "1988-11-10",
            "role": "GO",
            "cust_active": "1",
            "region": null,
            "password": "",
            "profile_image": null
        },
        "postComments": [
            {
                "pc_id": 5,
                "cust_id": 1,
                "p_id": 3,
                "comment": "Exciting tech news!"
            }
        ],
        "categoryList": [
            {
                "cat_id": 2,
                "cat_name": "Technology",
                "cat_description": "Tech",
                "cat_timestamp": "2023-10-20 16:41:14",
                "update_timestamp": "2023-10-20 16:41:14"
            }
        ]
    },
    {
        "post": {
            "p_id": 4,
            "cust_id": 4,
            "title": "Travel Adventure",
            "description": "Exploring new places and cultures.",
            "like_count": 18,
            "dislike_count": 0,
            "comment_count": 12,
            "post_active": "1",
            "post_image": null,
            "categories": null
        },
        "customer": {
            "cust_id": 4,
            "first_name": "Emma",
            "last_name": "Wilson",
            "ph_no": "222-333-4444",
            "email": "emma.wilson@email.com",
            "gender": "Female",
            "country": "USA",
            "state": "California",
            "city": "San Francisco",
            "pincode": "94101",
            "flag_verify": "1",
            "dob": "1992-03-25",
            "role": "C",
            "cust_active": "1",
            "region": null,
            "password": "",
            "profile_image": null
        },
        "postComments": [
            {
                "pc_id": 6,
                "cust_id": 5,
                "p_id": 4,
                "comment": "I love traveling and exploring new places."
            }
        ],
        "categoryList": [
            {
                "cat_id": 1,
                "cat_name": "Travel",
                "cat_description": "Travel",
                "cat_timestamp": "2023-10-20 16:41:14",
                "update_timestamp": "2023-10-20 16:41:14"
            },
            {
                "cat_id": 4,
                "cat_name": "Students",
                "cat_description": "Student",
                "cat_timestamp": "2023-10-20 16:41:14",
                "update_timestamp": "2023-10-20 16:41:14"
            }
        ]
    }]

const HomePage = ({ navigation }) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(dummyUsers.map(() => false));
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState(''); // State for comment input
    const [likedUsers, setLikedUsers] = useState()

    // useEffect(() => {
    //     fetch(`${environment.baseUrl}/post-management/posts`, {
    //     }).then(Response => {
    //         Response.json().then(response => {
    //             console.log(response.response.json(), 'testttt to check ');
    //             setLikedUsers(response.response.json())
    //         });
    //     })
    // }, [])

    // useEffect(() => {
    //     console.log(likedUsers, 'userr');
    // }, [likedUsers])

    const toggleDescriptionExpanded = (index) => {
        const newDescriptionExpanded = [...descriptionExpanded];
        newDescriptionExpanded[index] = !newDescriptionExpanded[index];
        setDescriptionExpanded(newDescriptionExpanded);
    };

    const handleLike = (index) => {
        const updatedUsers = [...dummyUsers];
        updatedUsers[index].liked = !updatedUsers[index].liked;
        // If liked, make sure disliked is reset
        if (updatedUsers[index].liked) {
            updatedUsers[index].disliked = false;
        }
        setLikedUsers(updatedUsers);
    };

    const handleDislike = (index) => {
        const updatedUsers = [...dummyUsers];
        updatedUsers[index].disliked = !updatedUsers[index].disliked;
        // If disliked, make sure liked is reset
        if (updatedUsers[index].disliked) {
            updatedUsers[index].liked = false;
        }
        setLikedUsers(updatedUsers);
    };

    const openCommentModal = (post) => {
        setSelectedPost(post);
        setCommentModalVisible(true);
        onPress: () => BackHandler.exitApp()
    };

    const closeCommentModal = () => {
        setCommentModalVisible(false);
        setCommentText(''); // Clear the comment input when the modal is closed
    };

    const renderComments = () => {
        if (!selectedPost) return null; // No post selected

        return (
            <ScrollView style={{ maxHeight: 200 }}>
                <Text style={styles.commentTitle}>Comments for {selectedPost.title}</Text>
                {selectedPost.postComments.map((comment, index) => (
                    <Text key={index} style={styles.commentText}>
                        {comment.text}
                    </Text>
                ))}
            </ScrollView>
        );
    };

    const handleCommentSubmit = () => {
        // You can handle submitting the comment here
        // Update the 'comments' array in 'selectedPost' and send it to the server
        const updatedSelectedPost = { ...selectedPost };
        updatedSelectedPost.comments.push({ id: Date.now(), text: commentText });
        setSelectedPost(updatedSelectedPost);

        // Clear the comment input
        setCommentText('');
    };

    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Logo width={200} height={60} />
                </View>
                <View style={styles.columnMain}>
                    <Text style={styles.titleMain}>Timeline</Text>
                    <Text style={styles.subtitleMain}>Posts</Text>
                </View>
                {dummyUsers.map((user, index) => (
                    <View key={user.post.p_id} style={styles.userCard}>
                        <View style={styles.column1}>
                            <Image style={styles.userIcon} source={{ uri: `data:image/png;base64,${user.customer.profile_image}` }} />
                            <View>
                                <Text style={styles.userName}>{`${user.customer.first_name} ${user.customer.last_name}`}</Text>
                                <Text style={styles.subtitle}>{user.categoryList.map((category) => `#${category.cat_name}`).join(' ')}</Text>
                            </View>
                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.title}>{user.post.title}</Text>
                            <Text
                                style={[
                                    styles.description,
                                    descriptionExpanded[index] ? { height: 'auto' } : { maxHeight: 40 },
                                ]}
                                numberOfLines={10}
                            >
                                {user.post.description}
                            </Text>
                            <TouchableOpacity onPress={() => toggleDescriptionExpanded(index)}>
                                <Text style={{ color: 'grey' }}>
                                    {descriptionExpanded[index] ? '...Read Less' : '...Show More'}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.time}>
                                {formatDistanceToNow(new Date(user.categoryList[0].update_timestamp), { addSuffix: true })}
                            </Text>
                        </View>
                        {user.media && (
                            <View style={styles.column3}>
                                <Image style={styles.media} source={{ uri: `data:image/png;base64,${user.post.post_image}` }} />
                            </View>
                        )}
                        <View style={styles.column4}>
                            <View style={{ flex: 0.4, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleLike(index)} style={styles.actionButton}>
                                    {user.liked ? <LikeFilled width={25} height={25} /> : <Like width={25} height={25} />}
                                    <Text style={styles.like}>{user.post.like_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDislike(index)} style={styles.actionButton}>
                                    {user.disliked ? (
                                        <DislikeFilled width={25} height={25} />
                                    ) : (
                                        <Dislike width={25} height={25} />
                                    )}
                                    <Text style={styles.like}>{user.post.dislike_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => openCommentModal(user)}>
                                    <Comment width={23} height={23} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
                <GestureRecognizer
                    style={{ flex: 1 }}
                    onSwipeDown={() => closeCommentModal()}
                >
                    <Modal isVisible={commentModalVisible} style={styles.modal}>
                        <View style={styles.commentModal}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 25 }}>
                                <Horizontal width={40} height={25} />
                            </View>
                            {selectedPost && (
                                <>
                                    <ScrollView style={{ maxHeight: 1000 }}>
                                        <Text style={styles.commentTitle}>Comments on {selectedPost.title}</Text>
                                        {selectedPost.postComments.map((comment, index) => (
                                            <Text key={index} style={styles.commentText}>
                                                {comment.comment}
                                            </Text>
                                        ))}
                                    </ScrollView>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.commentInput}
                                            value={commentText}
                                            onChangeText={(comment) => setCommentText(comment)}
                                            placeholder="Add a comment..."
                                            multiline={true}
                                            numberOfLines={3}
                                            placeholderTextColor={'black'}
                                        />
                                        <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                                            <Submit width={25} height={25} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </Modal>
                </GestureRecognizer>
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    columnMain: {
        padding: 10,
        paddingLeft: 20,
        paddingBottom: 40,
    },
    titleMain: {
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        lineHeight: 34.5,
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
        lineHeight: 26.21,
    },
    column2: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    subtitle: {
        fontSize: 16,
        color: '#F58960',
        marginLeft: 10,
        fontWeight: '700',
    },
    time: {
        fontSize: 13,
        color: '#F58960',
        fontWeight: '500',
        paddingTop: 20,
    },
    description: {
        fontSize: 16,
        overflow: 'hidden',
        color: 'black',
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
        justifyContent: 'center',
    },
    like: {
        color: '#545454',
        paddingLeft: 5,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    commentModal: {
        backgroundColor: '#F8F5F0',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'column',
        flex: 1,
    },
    commentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    commentText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 35,
        padding: 10,
        height: 50,
        color: 'black'
    },
    submitButton: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomePage;
