package com.prototype.app_springboot.data.entity;

import com.prototype.app_springboot.data.type.BoardType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int id;

    @Enumerated(EnumType.STRING)
    private BoardType boardType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    private String title;

    @Lob
    private String contents;

    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competition_id")
    private CompetitionInfo competitionInfo;

    @OneToMany(mappedBy = "postInfo")
    private List<FileInfo> fileInfoList = new ArrayList<FileInfo>();

    @OneToMany(mappedBy = "postInfo")
    private List<UploadPostType> uploadPostTypeList = new ArrayList<UploadPostType>();

    @OneToMany(mappedBy = "postInfo")
    private List<PostDocs> postDocsList = new ArrayList<PostDocs>();

    @Builder
    public PostInfo(int id, BoardType boardType, UserInfo userInfo, String title, String contents, LocalDateTime createdDate, CompetitionInfo competitionInfo, List<FileInfo> fileInfoList, List<UploadPostType> uploadPostTypeList, List<PostDocs> postDocsList) {
        this.id = id;
        this.boardType = boardType;
        this.userInfo = userInfo;
        this.title = title;
        this.contents = contents;
        this.createdDate = createdDate;
        this.competitionInfo = competitionInfo;
        this.fileInfoList = fileInfoList;
        this.uploadPostTypeList = uploadPostTypeList;
        this.postDocsList = postDocsList;
    }
}
