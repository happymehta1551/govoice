package com.winnovate.govoice.service;

import com.winnovate.govoice.entity.Post;
import com.winnovate.govoice.entity.PostLikeDislike;
import com.winnovate.govoice.repository.CustomerRepository;
import com.winnovate.govoice.repository.PostLikeDislikeRepository;
import com.winnovate.govoice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostLikeDislikeService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeDislikeRepository postLikeDislikeRepository;

    @Autowired
    private CustomerRepository customerRepository;


    public Post addPostLike(int p_id, int c_id) {
        Post post = postRepository.findById(p_id).orElse(null);
        PostLikeDislike postLikeDislike = postLikeDislikeRepository.findByPIdAndCustId(p_id,c_id);
        assert post != null;
        if (postLikeDislike != null){
            if (postLikeDislike.getLike_dislike().equals("0")) {
                post.setLike_count(post.getLike_count() + 1);
                post.setDislike_count(post.getDislike_count() - 1);
                postLikeDislikeRepository.save(new PostLikeDislike("1",postRepository.findById(p_id).orElse(null),customerRepository.findById(c_id).orElse(null)));
            } else {
                post.setLike_count(post.getLike_count() - 1);
            }
            postLikeDislikeRepository.delete(postLikeDislike);
        }else {
            post.setLike_count(post.getLike_count()+1);
            postLikeDislikeRepository.save(new PostLikeDislike("1",postRepository.findById(p_id).orElse(null),customerRepository.findById(c_id).orElse(null)));
        }
        return post;
    }

    public Post addPostDislike(int p_id, int c_id) {
        Post post = postRepository.findById(p_id).orElse(null);
        PostLikeDislike postLikeDislike = postLikeDislikeRepository.findByPIdAndCustId(p_id,c_id);
        assert post != null;
        if (postLikeDislike != null){
            if (postLikeDislike.getLike_dislike().equals("1")) {
                post.setLike_count(post.getLike_count() - 1);
                post.setDislike_count(post.getDislike_count() + 1);
                postLikeDislikeRepository.save(new PostLikeDislike("0",postRepository.findById(p_id).orElse(null),customerRepository.findById(c_id).orElse(null)));
            } else {
                post.setDislike_count(post.getDislike_count() - 1);
            }
            postLikeDislikeRepository.delete(postLikeDislike);
        }else {
            post.setDislike_count(post.getDislike_count()+1);
            postLikeDislikeRepository.save(new PostLikeDislike("0",postRepository.findById(p_id).orElse(null),customerRepository.findById(c_id).orElse(null)));
        }
        return post;
    }


}
