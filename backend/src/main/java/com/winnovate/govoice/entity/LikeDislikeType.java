package com.winnovate.govoice.entity;

import lombok.Getter;

@Getter
public enum LikeDislikeType {
    LIKE("1"),
    DISLIKE("0");

    private final String code;

    LikeDislikeType(String code) {
        this.code = code;
    }

}
