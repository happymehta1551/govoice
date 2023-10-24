package com.winnovate.govoice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cat_id")
    private Integer cat_id;

    @Column(name = "cat_name", nullable = false, columnDefinition = "TEXT default ''")
    private String cat_name;

    @Column(name = "cat_description", nullable = false, columnDefinition = "TEXT default ''")
    private String cat_description;

    @Column(name = "cat_timestamp", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private String cat_timestamp;

    @Column(name = "update_timestamp", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private String update_timestamp;

    // Constructors, getters, and setters
}
