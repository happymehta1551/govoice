package com.winnovate.govoice.repository;

import com.winnovate.govoice.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer> {

    @Query("SELECT p FROM Post p " +
            "INNER JOIN PostLikeDislike pld ON p.p_id = pld.p_id.p_id " +
            "WHERE pld.cust_id.cust_id = :cust_id AND pld.like_dislike = '1'")
    List<Post> getCustomerLikedPost(@Param("cust_id") int cust_id);

    @Query("SELECT p FROM Post p " +
            "INNER JOIN PostLikeDislike pld ON p.p_id = pld.p_id.p_id " +
            "WHERE pld.cust_id.cust_id = :cust_id AND pld.like_dislike = '0'")
    List<Post> getCustomerDislikedPost(@Param("cust_id") int cust_id);
}

