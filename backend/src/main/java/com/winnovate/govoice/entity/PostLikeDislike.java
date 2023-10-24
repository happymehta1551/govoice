package com.winnovate.govoice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "post_like_dislike")
public class PostLikeDislike {

    public PostLikeDislike(){

    }

    public PostLikeDislike(int pld_id, String like_dislike, Post p_id, Customer cust_id) {
        this.pld_id = pld_id;
        this.like_dislike = like_dislike;
        this.p_id = p_id;
        this.cust_id = cust_id;
    }

    public PostLikeDislike(String like_dislike, Post p_id, Customer cust_id) {
        this.like_dislike = like_dislike;
        this.p_id = p_id;
        this.cust_id = cust_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pld_id")
    private int pld_id;

    @Column(name = "like_dislike")
//    @Enumerated(EnumType.STRING)
    private String like_dislike;

    @ManyToOne
    @JoinColumn(name = "p_id")
    private Post p_id;

    @ManyToOne
    @JoinColumn(name = "cust_id")
    private Customer cust_id;
}
