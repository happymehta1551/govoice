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

const HomePage = ({ navigation }) => {
    const [likedUsers, setLikedUsers] = useState([])
    const [descriptionExpanded, setDescriptionExpanded] = useState(likedUsers.map(() => false));
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState({ postComments: [] });
    const [commentText, setCommentText] = useState(''); // State for comment input
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [dislikedPostIds, setDislikedPostIds] = useState([]);

    useEffect(() => {
        fetch(`${environment.baseUrl}/post-management/posts`, {
        }).then(Response => {
            Response.json().then(response => {
                // console.log(response.response, 'testttt to check ');
                setLikedUsers(response.response)
            });
        })
    }, [])

    useEffect(() => {
        // console.log(likedUsers, 'userr');
    }, [likedUsers])

    const toggleDescriptionExpanded = (index) => {
        const newDescriptionExpanded = [...descriptionExpanded];
        newDescriptionExpanded[index] = !newDescriptionExpanded[index];
        setDescriptionExpanded(newDescriptionExpanded);
    };

    const handleLike = (index, user) => {

        const postId = user.post.p_id;
        if (likedPostIds.includes(postId)) {
            // Post is already liked, so remove it from the likedPostIds
            setLikedPostIds(likedPostIds.filter(id => id !== postId));
        } else {
            // Post is not liked, so add it to the likedPostIds
            setLikedPostIds([...likedPostIds, postId]);
        }

        fetch(`${environment.baseUrl}/post-management/post/${user.post.p_id}/likes?c_id=${user.customer.cust_id}`, {
            method: 'POST'
        }).then(Response => {
            Response.json().then(response => {
                // console.log(response, 'latest post liked');
                const postIndex = likedUsers.findIndex(post => post.post.p_id === user.post.p_id);
                if (postIndex !== -1) {
                    // Update the liked and disliked properties
                    likedUsers[postIndex].liked = true;
                    likedUsers[postIndex].disliked = false;
                    // Update other properties as needed from the response
                    likedUsers[postIndex].post.like_count = response.like_count; 
                    likedUsers[postIndex].post.dislike_count = response.dislike_count;// Update the like_count
                    // Add other updates as needed
                }
                setLikedUsers([...likedUsers]); // Update the state
            });
        })

    };

    const handleDislike = (index, user) => {

        const postId = user.post.p_id;
        if (dislikedPostIds.includes(postId)) {
            // Post is already disliked, so remove it from dislikedPostIds
            setDislikedPostIds(dislikedPostIds.filter(id => id !== postId));
        } else {
            // Post is not disliked, so add it to dislikedPostIds and remove from likedPostIds
            setDislikedPostIds([...dislikedPostIds, postId]);
            setLikedPostIds(likedPostIds.filter(id => id !== postId));
        }

        fetch(`${environment.baseUrl}/post-management/post/${user.post.p_id}/dislikes?c_id=${user.customer.cust_id}`, {
            method: 'POST'
        }).then(Response => {
            Response.json().then(response => {
                // console.log(response, 'latest post disliked');
                const postIndex = likedUsers.findIndex(post => post.post.p_id === user.post.p_id);
                if (postIndex !== -1) {
                    // Update the liked and disliked properties
                    likedUsers[postIndex].disliked = true;
                    likedUsers[postIndex].liked = false;
                    // Update other properties as needed from the response
                    likedUsers[postIndex].post.dislike_count = response.dislike_count; // Update the dislike_count
                    likedUsers[postIndex].post.like_count = response.like_count;
                    // Add other updates as needed
                }
                setLikedUsers([...likedUsers]); // Update the state
            });
        })
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
        if (!selectedPost || !selectedPost.postComments || !Array.isArray(selectedPost.postComments)) {
            return (
                <Text style={styles.commentTitle}>No comments available</Text>
            );
        }

        return (
            <ScrollView style={{ maxHeight: 200 }}>
                <Text style={styles.commentTitle}>Comments for {selectedPost.post.title}</Text>
                {selectedPost.postComments.map((comment, index) => (
                    <Text key={index} style={styles.commentText}>
                        {comment.comment}
                    </Text>
                ))}
            </ScrollView>
        );
    };


    const sendCommentToServer = async (postId, custId, commentText) => {
        try {
            const response = await fetch(`${environment.baseUrl}/post-management/post/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cust_id: custId,
                    p_id: postId,
                    comment: commentText,
                }),
            });

            if (response) {
                const data = await response.json();
                console.log(data.comments);
                return data.comments; // Assuming the response contains an array of comments
            } else {
                throw new Error('Failed to add a comment');
            }
        } catch (error) {
            console.error('Error adding a comment:', error);
            throw error;
        }
    };


    const handleCommentSubmit = async () => {
        try {
            // Check if a post is selected
            if (!selectedPost) {
                return;
            }

            // Send the comment to the server
            const newComment = await sendCommentToServer(selectedPost.post.p_id, selectedPost.customer.cust_id, commentText);

            // Update the selected post's comments
            setSelectedPost((prevSelectedPost) => {
                return {
                    ...prevSelectedPost,
                    postComments: [...prevSelectedPost.postComments, newComment],
                };
            });
            console.log(newComment, 'comments check');
            // Clear the comment input
            setCommentText('');
        } catch (error) {
            // Handle the error (e.g., display an error message)
            console.error('Failed to submit a comment:', error);
        }
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
                {likedUsers.map((user, index) => (
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
                                {formatDistanceToNow(new Date(user.categoryList.map(y => y.update_timestamp).map(z => z)[0]), { addSuffix: true })}
                            </Text>
                        </View>
                        {user.post.post_image && (
                            <View style={styles.column3}>
                                <Image style={styles.media} source={{ uri: `data:image/png;base64,${user.post.post_image}` }} />
                            </View>
                        )}
                        <View style={styles.column4}>
                            <View style={{ flex: 0.4, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleLike(index, user)} style={styles.actionButton}>
                                    {likedPostIds.includes(user.post.p_id) ? (
                                        <LikeFilled width={25} height={25} />
                                    ) : (
                                        <Like width={25} height={25} />
                                    )}
                                    <Text style={styles.like}>{user.post.like_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDislike(index, user)} style={styles.actionButton}>
                                    {dislikedPostIds.includes(user.post.p_id) ? (
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
                            {selectedPost && selectedPost.postComments && Array.isArray(selectedPost.postComments) && (
                                <>
                                    <ScrollView style={{ maxHeight: 1000 }}>
                                        {/* <Text style={styles.commentTitle}>Comments on</Text> */}
                                        {selectedPost.postComments && selectedPost.postComments.map((comment, index) => (
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
