package com.winnovate.govoice.repository;

import com.winnovate.govoice.entity.PostLikeDislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostLikeDislikeRepository extends JpaRepository<PostLikeDislike,Integer> {

    @Query("SELECT pld FROM PostLikeDislike pld WHERE pld.p_id.id = :pId AND pld.cust_id.id = :custId")
    PostLikeDislike findByPIdAndCustId(@Param("pId") int pId, @Param("custId") int custId);
}

