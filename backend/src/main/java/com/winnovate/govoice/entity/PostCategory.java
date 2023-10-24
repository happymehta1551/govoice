package com.winnovate.govoice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "post_categories")
public class PostCategory {
    public PostCategory(Post p_id, Category cat_id) {
        this.p_id = p_id;
        this.cat_id = cat_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_cat_id")
    private Integer p_cat_id;

    @ManyToOne
    @JoinColumn(name = "p_id")
    private Post p_id;

    @ManyToOne
    @JoinColumn(name = "cat_id")
    private Category cat_id;

    // Constructors, getters, and setters
}
