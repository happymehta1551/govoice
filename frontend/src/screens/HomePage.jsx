import React, { useState } from 'react';
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


const dummyUsers = [
    {
        id: 1,
        name: 'User 1',
        profileImage: 'https://i.pravatar.cc/300',
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nislLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet ultricies urna. Duis nec bibendum nisl',
        media: 'https://picsum.photos/1920/1080',
        liked: false,
        disliked: false,
        comments: [
            { id: 1, text: 'This is a comment by User 1.' },
            { id: 2, text: 'Another comment by User 1.' },
        ],
    },
    {
        id: 2,
        name: 'User 2',
        profileImage: 'https://i.pravatar.cc/300',
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        description:
            'This is another sample description for User 2. It can be longer or shorter as needed.',
        media: 'https://picsum.photos/1920/1080',
        liked: false,
        disliked: false,
        comments: [
            { id: 1, text: 'Comment by User 2.' },
        ],
    },
    // Add more user data entries here...
];

const HomePage = ({ navigation }) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(dummyUsers.map(() => false));
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState(''); // State for comment input
    const [likedUsers, setLikedUsers] = useState()

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
                {selectedPost.comments.map((comment, index) => (
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
                                <TouchableOpacity onPress={() => handleLike(index)} style={styles.actionButton}>
                                    {user.liked ? <LikeFilled width={25} height={25} /> : <Like width={25} height={25} />}
                                    <Text style={styles.like}>{10}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDislike(index)} style={styles.actionButton}>
                                    {user.disliked ? (
                                        <DislikeFilled width={25} height={25} />
                                    ) : (
                                        <Dislike width={25} height={25} />
                                    )}
                                    <Text style={styles.like}>3</Text>
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
                                        {selectedPost.comments.map((comment, index) => (
                                            <Text key={index} style={styles.commentText}>
                                                {comment.text}
                                            </Text>
                                        ))}
                                    </ScrollView>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.commentInput}
                                            value={commentText}
                                            onChangeText={(text) => setCommentText(text)}
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