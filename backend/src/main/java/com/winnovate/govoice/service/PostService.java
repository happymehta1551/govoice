package com.winnovate.govoice.service;

import com.winnovate.govoice.entity.Post;
import com.winnovate.govoice.entity.PostCategory;
import com.winnovate.govoice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeDislikeRepository postLikeDislikeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PostCategoryRepository postCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Post savePost(Post post) {
        Post createdPost = postRepository.save(post);
        for (Integer c_id: post.getCategories()){
            postCategoryRepository.save(new PostCategory(createdPost,categoryRepository.findById(c_id).orElse(null)));
        }
        return createdPost;
    }

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(int p_id) {
        return postRepository.findById(p_id).orElse(null);
    }

    public int deletePost(int id) {
        postRepository.deleteById(id);
        return id;
    }

    public List<Post> getAllLikedPost(int cust_id){
        return postRepository.getCustomerLikedPost(cust_id);
    }

    public List<Post> getAllDislikedPost(int cust_id){
        return postRepository.getCustomerDislikedPost(cust_id);
    }
}
