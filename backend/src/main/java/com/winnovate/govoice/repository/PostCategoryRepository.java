package com.winnovate.govoice.repository;

import com.winnovate.govoice.entity.Post;
import com.winnovate.govoice.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory,Integer> {
}

