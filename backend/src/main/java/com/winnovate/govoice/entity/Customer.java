package com.winnovate.govoice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_id")
    private int cust_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "ph_no")
    private String ph_no;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private String gender;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "flag_verify")
    private String flag_verify;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "profile_pic")
    private String profile_pic;

    @Column(name = "cust_active")
    private String cust_active;

    @Column(name = "insert_timestamp")
    private String insert_timestamp;

    @Column(name = "update_timestamp")
    private String update_timestamp;

    @Column(name = "password")
    private String password;
}