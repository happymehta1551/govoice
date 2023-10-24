package com.winnovate.govoice.controller;

import java.util.List;

import com.winnovate.govoice.entity.Category;
import com.winnovate.govoice.service.CategoryService;
import com.winnovate.govoice.service.PostLikeDislikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.winnovate.govoice.entity.Post;
import com.winnovate.govoice.service.PostService;

@RestController
@RequestMapping("/post-management")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private PostLikeDislikeService postLikeDislikeService;

    @Autowired
    private CategoryService categoryService;

    //Manage Posts
    @PostMapping("/post")
    public Post createPost(@RequestBody Post post) {
        return postService.savePost(post);
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




}
