package com.winnovate.govoice.repository;

import com.winnovate.govoice.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment,Integer> {

    @Query("SELECT pc FROM PostComment pc WHERE pc.p_id = :pId")
    List<PostComment> findAllByPostId(@Param("pId") int pId);

    @Query("SELECT pc FROM PostComment pc WHERE pc.cust_id = :cust_id")
    List<PostComment> findAllByCustId(@Param("cust_id") int cust_id);
}

