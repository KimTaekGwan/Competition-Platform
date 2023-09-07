import React, { useState, useEffect } from 'react';
import { apiUtils } from './ApiUtils';
import { handleLogError } from './ErrorUtils';

/* 게시물 리스트 요청 by BoardType */
export async function loadPostList(competition_id, boardType) {
  const formDataToSend = {
    competitionId: competition_id,
    boardType: boardType,
  };
  const sample = [
    {
      post_id: '1',
      title: '제출 1',
      user_id: '1',
      created_date: '0000-00-00',
      contents: '',
    },
    {
      post_id: '2',
      title: '제출 2',
      user_id: '1',
      created_date: '0000-00-00',
      contents: '',
    },
  ]; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetPostInfoByBoardType(formDataToSend)
    .then((response) => {
      const getPostList = response.data;
      return getPostList;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      return sample;
    });
}

/* 공모전 정보 요청 by competition_id */
export async function loadCompetitionInfo(competition_id) {
  const formDataToSend = {
    competitionId: competition_id,
  };
  const sample = {
    competition_info_id: 1,
    competition_name: 'ICT 택관컴퍼니',
    competition_image: 'a941fab3-812a-4a6a-a008-28c70b01e52f',
    competition_readme: '<p>ICT 택관컴퍼니 입니다~</p>',
    competition_description: 'ICT 택관컴퍼니',
    competition_state: null,
    competition_start_date: '2023-08-02T00:00',
    competition_end_date: '2023-08-25T00:00',
    competition_type_list: [
      {
        competition_info_id: 1,
        type: '개발',
      },
      {
        competition_info_id: 1,
        type: '교육',
      },
      {
        competition_info_id: 1,
        type: '엔터테인먼트',
      },
    ],
    competition_docs_list: [
      {
        competition_info_id: 1,
        docs_path: '447d2d03-8d89-4b68-bcf3-20d9cdc864f8',
        file_title: 'competitionDocs',
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.

  return await apiUtils
    .GetCompetitionInfoByCompetitionId(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 게시물 정보 요청 by post_id */
export async function loadPostInfo(post_id) {
  const formDataToSend = {
    postId: post_id,
  };
  const sample = {
    post_info_id: 1,
    user_info_id: 'www',
    competition_info_id: 1,
    board_type: 'NOTICE',
    title: 'notice1',
    contents: '공지에요',
    created_date: '2023-08-04T20:18:21',
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetPostInfoByPostId(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 평가 결과 by postId */
export async function loadResultList(post_id) {
  const formDataToSend = {
    postId: post_id,
  };
  const sample = {
    evaluation_score_list: [
      {
        evaluation_id: 3,
        post_id: 1,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        user_id: '1',
        score: 35,
        comment: '되나?',
      },
      {
        evaluation_id: 4,
        post_id: 1,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        user_id: '1',
        score: 4,
        comment: '하하하',
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetAllScore(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 평가 항목 리스트 요청 by post_id */
export async function loadItemList(post_id) {
  const formDataToSend = {
    postId: post_id,
  };
  const sample = {
    judge_info_list: [
      {
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
      },
      {
        judge_id: '365e1ca6-bd3d-413d-ba09-eb31c54849e2',
        post_id: 1,
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetEvaluationItemByPostId(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 심사위원 점수 불러오기 by postId */
export async function loadScorePost(post_id, judge_id) {
  const formDataToSend = {
    postId: post_id,
    judgeId: judge_id,
  };
  const sample = {
    evaluation_score_list: [
      {
        evaluation_id: 4,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '변경완료',
        score: 4,
      },
      {
        evaluation_id: 5,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '변경완료',
        score: 4,
      },
      {
        evaluation_id: 6,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '변경완료',
        score: 10,
      },
      {
        evaluation_id: 8,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '변경완료',
        score: 10,
      },
      {
        evaluation_id: 19,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '평가 항목 comment comment',
        score: 40,
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetScore(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 심사위원 점수 불러오기 by fileId */
export async function loadScoreFile(file_id, judge_id) {
  const formDataToSend = {
    fileId: file_id,
    judgeId: judge_id,
  };
  const sample = {
    evaluation_score_list: [
      {
        evaluation_id: 4,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: 'loadScoreFile',
        score: 4,
      },
      {
        evaluation_id: 5,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: 'loadScoreFile',
        score: 4,
      },
      {
        evaluation_id: 6,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: 'loadScoreFile',
        score: 10,
      },
      {
        evaluation_id: 8,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: 'loadScoreFile',
        score: 10,
      },
      {
        evaluation_id: 19,
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
        user_id: 1,
        comment: '평가 항목 comment comment',
        score: 40,
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetScoreFile(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 심사위원 리스트 요청 by post_id */
export async function loadJudgeList(post_id) {
  const formDataToSend = {
    postId: post_id,
  };
  const sample = {
    judge_info_list: [
      {
        judge_id: '32af249e-96e3-4524-a46d-c973c0d1b839',
        post_id: 1,
      },
      {
        judge_id: '365e1ca6-bd3d-413d-ba09-eb31c54849e2',
        post_id: 1,
      },
    ],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetJudgeByPostId(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 제출물 파일 QNA 요청*/
export async function getFileQNA(file_id, query) {
  const formDataToSend = {
    fileId: file_id,
    query: query,
  };
  const sample = {
    result: 'result sample',
    source: ['source', 'source', 'source'],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetFileQNA(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 제출물 파일 QNA 요청*/
export async function getCompetitionFileQNA(competition_id, query) {
  const formDataToSend = {
    competitionId: competition_id,
    query: query,
  };
  const sample = {
    result: 'result sample',
    source: ['source', 'source', 'source'],
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetCompetitionFileQNA(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

/* 제출물 페이지 표절 검사 리포트 요청*/
export async function getPageReport(file_id, page_id, comp_page_id) {
  const formDataToSend = {
    file_id: file_id,
    page_id: page_id,
    comp_page_id: comp_page_id,
  };
  const sample = {
    report: 'report sample',
  }; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
  return await apiUtils
    .GetPageReport(formDataToSend)
    .then((response) => {
      const getData = response.data;
      return getData;
    })
    .catch((error) => {
      // alert(error.response.data);
      handleLogError(error);
      const getData = sample;
      return getData;
    });
}

// loadSample(competition_id).then((getData) => {
//   setPostList(getData);
// });

/* 게시물 리스트 요청 by BoardType */
// export async function loadSample(competition_id) {
//   const formDataToSend = {
//     competitionId: competition_id,
//   };
//   const sample = 'sample'; // 실제로는 API 등을 통해 얻어온 데이터를 사용합니다.
//   return await apiUtils
//     .GetPostInfoByBoardType(formDataToSend)
//     .then((response) => {
//       const getData = response.data;
//       return getData;
//     })
//     .catch((error) => {
//       // alert(error.response.data);
//       handleLogError(error);
//       const getData = sample;
//       return getData;
//     });
// }
