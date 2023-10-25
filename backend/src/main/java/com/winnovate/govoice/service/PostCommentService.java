package com.winnovate.govoice.service;

import com.winnovate.govoice.entity.PostComment;
import com.winnovate.govoice.repository.CustomerRepository;
import com.winnovate.govoice.repository.PostCommentRepository;
import com.winnovate.govoice.repository.PostLikeDislikeRepository;
import com.winnovate.govoice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostCommentService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeDislikeRepository postLikeDislikeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PostCommentRepository postCommentRepository;

    public PostComment addPostComment(PostComment postComment){
        return postCommentRepository.save(postComment);
    }

    public List<PostComment> getAllCommentsByPid(int p_id){
        return postCommentRepository.findAllByPostId(p_id);
    }

    public List<PostComment> getAllCommentsByCustid(int cust_id){
        return postCommentRepository.findAllByCustId(cust_id);
    }

}
