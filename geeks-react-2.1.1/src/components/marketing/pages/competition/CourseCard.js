// import node module libraries
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Image,
  Card,
  Row,
  Col,
  ProgressBar,
  ListGroup,
  Badge,
} from 'react-bootstrap';

// import custom components
import Ratings from 'components/marketing/common/ratings/Ratings';
import LevelIcon from 'components/marketing/common/miscellaneous/LevelIcon';
import GKTippy from 'components/elements/tooltips/GKTippy';

// import utility file
import { numberWithCommas } from 'helper/utils';

const CourseCard = ({ item, index, isLoggedIn, viewby, extraclass }) => {
  const link = `/detail/${item.competition_info_id}/`;
  /** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
  const GridView = () => {
    return (
      <Link to={link} key={index}>
        <Card className={`mb-4 card-hover ${extraclass}`}>
          <Image
            src="https://d33wubrfki0l68.cloudfront.net/adb87914b5be40415f80f57ce5ca8f0c0b57c549/13b9b/blog/images/reactarticle2.png" //{item.competition_image}
            alt={item.competition_image}
            className="card-img-top rounded-top-md"
          />
          {/* Card body  */}
          <Card.Body>
            {/* 공모전 이름 */}
            <h3 className="h4 text-inherit mb-2 text-truncate-line-2 ">
              {item.competition_name}
            </h3>
            {/* 공모전 분류 */}
            <ListGroup as="ul" bsPrefix="list-inline" className="mb-2">
              {item.competition_type_list.map((i) => (
                <ListGroup.Item
                  key={i.type}
                  as="li"
                  bsPrefix="list-inline-item"
                >
                  <i className="far fa-clock me-1"></i>
                  {i.type}
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* 참가 인원 */}
            <div className="lh-1 mb-2 d-flex align-items-center">
              <span>
                {item.competition_start_date}
                {' ~ '} {item.competition_end_date}
              </span>
            </div>
            {/* 공모전 설명 */}
            <div className={'lh-1 mb-4 d-flex align-items-center'}>
              <span className="fs-6 text-muted">
                {' '}
                {item.competition_description}
                {/* {item.rating.toFixed(1)}-{numberWithCommas(item.ratingby)} */}
                {/* <GKTippy content={item.competition_description}>
                  <Link className="text-dark">
                    {item.competition_description}
                  </Link>
                </GKTippy> */}
              </span>
            </div>

            <div className="lh-1 d-flex align-items-center">
              <Badge pill bg="primary" className="me-1">
                {/* https://geeks-react.netlify.app/elements/badges */}
                {'참가가능 여부'}
              </Badge>
              <Badge pill bg="primary" className="me-1">
                {/* https://geeks-react.netlify.app/elements/badges */}
                {'+23 day'}
              </Badge>
            </div>

            {/* <div className="h-1 mt-3">
            <span className="text-dark fw-bold">
              ${item.price - item.discount}
            </span>{' '}
            <del className="fs-6 text-muted">${item.price}</del>
          </div> */}
          </Card.Body>
          {/* Card Footer */}
          <Card.Footer>
            <Row className="align-items-center g-0">
              <Col className="col-auto">
                <Image
                  src={item.instructor_image}
                  className="rounded-circle avatar-xs"
                  alt={item.instructor_image}
                />
              </Col>
              <Col className="col ms-2">
                <span>{`공모전 주최자 이름`}</span>
              </Col>
              <Col className="col-auto">
                <span className="text-dark me-1 fw-bold">{'000'}명</span>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Link>
    );
  };

  /** Used in Course Filter Page  */
  const ListView = () => {
    return (
      <Card className="mb-4 card-hover">
        <Row className="g-0">
          <Link
            to={link}
            className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
            style={{
              background: `url(${item.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
            }}
          >
            <Image
              src={item.image}
              alt="..."
              className="img-fluid d-lg-none invisible"
            />
          </Link>
          <Col lg={9} md={12} sm={12}>
            {/* <!-- Card body --> */}
            <Card.Body>
              <h3 className="mb-2 text-truncate-line-2 ">
                <Link to={link} className="text-inherit">
                  {item.title}
                </Link>
              </h3>
              {/* <!-- List inline --> */}
              <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <i className="far fa-clock me-1"></i>
                  {item.duration}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <LevelIcon level={item.level} />
                  {item.level}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <span className="text-warning">
                    {' '}
                    <Ratings rating={item.rating} /> {item.rating.toFixed(1)}
                  </span>
                  <span className="fs-6 text-muted">
                    {' '}
                    ({numberWithCommas(item.ratingby)})
                  </span>
                </ListGroup.Item>
              </ListGroup>
              {/* <!-- Row --> */}
              <Row className="align-items-center g-0">
                <Col className="col-auto">
                  <Image
                    src={item.instructor_image}
                    className="rounded-circle avatar-xs"
                    alt=""
                  />
                </Col>
                <Col className="col ms-2">
                  <span>{item.instructor_name}</span>
                </Col>
                <Col className="col-auto">
                  <GKTippy content="Add to Bookmarks">
                    <Link to="#">
                      <i className="fe fe-bookmark"></i>
                    </Link>
                  </GKTippy>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  /** Used in Instructor Profile Page  */
  const ListGroupView = () => {
    return (
      <div className="d-lg-flex align-items-center">
        <div>
          <Image src={item.image} alt="" className="rounded img-4by3-lg" />
        </div>
        <div className="ms-lg-3 mt-2 mt-lg-0">
          <h4 className="text-primary-hover">
            {item.title}{' '}
            <Badge bg="light-success" className="text-success">
              New
            </Badge>
          </h4>
          <ListGroup
            as="ul"
            bsPrefix="list-inline"
            className="fs-6 mb-0 text-inherit"
          >
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <i className="far fa-clock me-1"></i>
              {item.duration}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <LevelIcon level={item.level} />
              {item.level}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <span className="text-warning">
                {' '}
                <Ratings rating={item.rating} /> {item.rating.toFixed(1)}
              </span>
              <span className="fs-6 text-muted">
                {' '}
                ({numberWithCommas(item.ratingby)})
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {/* <GridView /> */}
      {viewby === 'grid' ? (
        <GridView />
      ) : viewby === 'list' ? (
        <ListView />
      ) : (
        <ListGroupView />
      )}
    </Fragment>
  );
};

// Specifies the default values for props
CourseCard.defaultProps = {
  viewby: 'grid',
  isLoggedIn: false,
  extraclass: '',
};

// Typechecking With PropTypes
CourseCard.propTypes = {
  item: PropTypes.object.isRequired,
  viewby: PropTypes.string,
  extraclass: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};

export default CourseCard;
