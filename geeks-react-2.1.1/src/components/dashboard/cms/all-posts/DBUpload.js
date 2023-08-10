// import node module libraries
import React, { Fragment, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Nav, Button, Form, Tab } from 'react-bootstrap';

// import sub components
import PostsTable from './PostsTable';

// import data files
import {
  allposts,
  allPublishedPosts,
  allScheduledPosts,
  allDraftPosts,
  allDeletedPosts,
} from 'data/courses/AllPostsData';
// impoort Auth module
import { apiUtils } from 'components/utils/ApiUtils';
import { handleLogError } from 'components/utils/ErrorUtils';
// import { downloadFile, s3Link } from 'helper/utils';

const DBUpload = () => {
  const { isLoggedIn, Auth } = useOutletContext();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate('/');
  }

  const handleSubmit = (e) => {
    console.log(e);

    let formData = {
      competitionName: e.target.formCompetitionName,
      formDepth1: e.target.formDepth1,
      formDepth2: e.target.formDepth2,
      formDepth3: e.target.formDepth3,
      formDepth4: e.target.formDepth4,
      link: e.target.formLink,
    };

    const formDataToSend = new FormData();
    formDataToSend.append(
      'data',
      new Blob([JSON.stringify(formData)], { type: 'application/json' }),
    );
    formDataToSend.append('file', e.target.formFile[0]);

    // 'Content-type': 'multipart/form-data',
    alert(JSON.stringify(formDataToSend));
    const user = Auth.getUser();
    apiUtils
      .AddCompFileInfo(user, formDataToSend)
      .then((response) => {
        console.log(response.data);
        // const { accessToken, refreshToken } = response.data;
      })
      .catch((error) => {
        // alert(error.response.data);
        handleLogError(error);
      });
  };

  return (
    <Fragment>
      <Row>
        <Col lg={4} md={4} sm={12}>
          <Card className="mt-3 bg-light shadow-none">
            <Card.Body className="p-md-4">
              <h3 className="mb-4">표절 DB 파일 추가 </h3>
              {/* form to apply for the job */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCompetitionName">
                  <Form.Label>
                    공모전명 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLink">
                  <Form.Label>
                    링크 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepth1">
                  <Form.Label>
                    formDepth1 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepth2">
                  <Form.Label>
                    formDepth2 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepth3">
                  <Form.Label>
                    formDepth3 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepth4">
                  <Form.Label>
                    formDepth4 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>
                    파일 업로드 <span className="text-danger">*</span>
                    <br /> 업로드 가능한 파일 종류
                  </Form.Label>
                  <Form.Control type="file" required accept=".pdf" />
                  {/* 기간 만료 */}
                  {/* <Form.Control type="file" disabled /> */}
                </Form.Group>
                <Button variant="primary" type="submit">
                  업로드
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} md={8} sm={12}>
          <Tab.Container defaultActiveKey="all">
            <Card>
              <Card.Header className="border-bottom-0 p-0 bg-white">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="file" className="mb-sm-3 mb-md-0">
                      파일별
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="page" className="mb-sm-3 mb-md-0">
                      페이지별
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="file" className="pb-0">
                    <PostsTable table_data={allposts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="page" className="pb-0">
                    <PostsTable table_data={allPublishedPosts} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DBUpload;