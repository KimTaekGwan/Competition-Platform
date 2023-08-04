// import node module libraries
import React, { useState, Fragment } from 'react';
import { Col, Row, Container, Tab } from 'react-bootstrap';

// import custom components
import FormSelect from 'components/elements/form-select/FormSelect';
import GridListViewButton from 'components/elements/miscellaneous/GridListViewButton';
import PageHeading from 'components/marketing/common/page-headings/PageHeading';

// import sub components
import FilterOptions from 'components/marketing/pages/competition/competition-filter-page/FilterOptions';
import CourseGridView from 'components/marketing/pages/competition/competition-filter-page/CourseGridView';
import CourseListView from 'components/marketing/pages/competition/competition-filter-page/CourseListView';

// function getDefaultFilter(index) {
//   let res = [];
//   for (let i = 0; i < 3; i++) {
//     res.append(i === index);
//   }
// }

const CourseFilterPage = () => {
  const sortByOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'free', label: 'Free' },
    { value: 'most-popular', label: 'Most Popular' },
    { value: 'highest-rated', label: 'Highest Rated' },
  ];

  // const [selectedFilters, setSelectedFilters] = useState(getDefaultFilter( || -1));

  return (
    <Fragment>
      {/* Page header */}
      <PageHeading pagetitle="Filter Page" />

      {/* Content */}
      <section className="py-6">
        <Container>
          <Tab.Container defaultActiveKey="grid">
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-4">
                <Row className="d-lg-flex justify-content-between align-items-center">
                  <Col md={6} lg={8} xl={9}>
                    <h4 className="mb-3 mb-lg-0">
                      Displaying 9 out of 68 courses
                    </h4>
                  </Col>
                  <Col md={6} lg={4} xl={3} className="d-inline-flex">
                    <div className="me-2">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                    <FormSelect options={sortByOptions} placeholder="Sort by" />
                  </Col>
                </Row>
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
                <FilterOptions />
              </Col>
              {/* Tab content */}
              <Col xl={9} lg={9} md={8} sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    <CourseGridView />
                  </Tab.Pane>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    <CourseListView />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseFilterPage;
