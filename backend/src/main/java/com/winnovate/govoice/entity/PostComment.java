package com.winnovate.govoice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "post_comments")
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pc_id")
    private int pc_id;

    @Column(name = "cust_id")
    private int cust_id;

    @Column(name = "p_id")
    private int p_id;

    @Column(name = "comment", nullable = false, columnDefinition = "TEXT default ''")
    private String comment;

//    @Column(name = "post_timestamp", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
//    private Timestamp post_timestamp;
//
//    @Column(name = "update_timestamp", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
//    private Timestamp update_timestamp;
}
