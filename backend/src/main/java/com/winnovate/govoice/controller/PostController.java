package com.winnovate.govoice.controller;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winnovate.govoice.entity.Category;
import com.winnovate.govoice.entity.PostComment;
import com.winnovate.govoice.service.CategoryService;
import com.winnovate.govoice.service.PostCommentService;
import com.winnovate.govoice.service.PostLikeDislikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.winnovate.govoice.entity.Post;
import com.winnovate.govoice.service.PostService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/post-management")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private PostLikeDislikeService postLikeDislikeService;

    @Autowired
    private PostCommentService postCommentService;

    @Autowired
    private CategoryService categoryService;

    //Manage Posts
    @PostMapping("/post")
    public Post createPost(@RequestParam("post_image") MultipartFile post_image, @RequestParam String postJsonData) {
        Post jsonObject = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonObject = objectMapper.readValue(postJsonData, Post.class);
            System.out.println("JSON object: " + jsonObject);
            jsonObject.setPost_image(post_image.getBytes());
            return postService.savePost(jsonObject);
        } catch (Exception e) {
            e.printStackTrace();
            return jsonObject;
        }
    }

    @DeleteMapping("/post/{id}")
    public int deletePost(@PathVariable int id) {
        return postService.deletePost(id);
    }
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getPosts();
    }
    @GetMapping("/post/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.getPostById(id);
    }
    @PostMapping("/post/{p_id}/likes")
    public Post addPostLike(@PathVariable int p_id, @RequestParam("c_id") int c_id) {
        return postLikeDislikeService.addPostLike(p_id,c_id);
    }

    @PostMapping("/post/{p_id}/dislikes")
    public Post addPostDislike(@PathVariable int p_id, @RequestParam("c_id") int c_id) {
        return postLikeDislikeService.addPostDislike(p_id, c_id);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }


    //Add and retrieve Comments
    @PostMapping("/post/comments")
    public PostComment addPostComment(@RequestBody PostComment postComment) {
        return postCommentService.addPostComment(postComment);
    }

    @GetMapping("/post/{p_id}/comments")
    public List<PostComment> getPostComment(@PathVariable int p_id) {
        return postCommentService.getAllCommentsByPid(p_id);
    }


    //Retrieve Customer post activities
    @GetMapping("/post/likes")
    public List<Post> getCustomerLikedPost(@RequestParam int cust_id) {
        return postService.getAllLikedPost(cust_id);
    }

    @GetMapping("/post/dislikes")
    public List<Post> getCustomerDislikedPost(@RequestParam int cust_id) {
        return postService.getAllDislikedPost(cust_id);
    }

    @GetMapping("/post/comments")
    public List<PostComment> getCustomerCommentedPost(@RequestParam int cust_id) {
        return postCommentService.getAllCommentsByCustid(cust_id);
    }
    
}
