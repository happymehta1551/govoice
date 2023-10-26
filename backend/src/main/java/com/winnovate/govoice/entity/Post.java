package com.winnovate.govoice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_id")
    private Integer p_id;

    @ManyToOne
    @JoinColumn(name = "cust_id")
    private Customer cust_id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "like_count")
    private int like_count;

    @Column(name = "dislike_count")
    private int dislike_count;

    @Column(name = "comment_count")
    private int comment_count;

    @Column(name = "post_active")
    private String post_active;

//    @Column(name = "post_timestamp")
//    private String post_timestamp;
//
//    @Column(name = "update_timestamp")
//    private String update_timestamp;

    @Lob
    @Column(name = "post_image")
    private byte[] post_image;

    private List<Integer> categories = new ArrayList<>();
}