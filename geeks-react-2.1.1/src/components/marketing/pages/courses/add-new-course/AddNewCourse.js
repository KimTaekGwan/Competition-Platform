// import node module libraries
import React, { useState, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components
import GKStepper from "components/elements/stepper/GKStepper";

// import sub components ( Steps )
import BasicInformation from "./steps/BasicInformation";
import CoursesMedia from "./steps/CoursesMedia";
import Curriculum from "./steps/Curriculum";
import Settings from "./steps/Settings";

const AddNewCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const initialValue = `<p>Insert course description</p>
                        <p><br /></p>        
                        <p>Some initial <strong>bold</strong> text</p>
                        <p><br /></p><p><br /></p><p><br /></p><p><br /></p>`;

  const [formData, setFormData] = useState({
    competition_name: "",
    competition_type: "",
    competition_description: "",
    competition_image: "",
    competition_docs: "",
    competition_intro: initialValue,
  });

  console.log(formData);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const next = () => {
    setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  const steps = [
    {
      id: 1,
      title: "공모전 정보",
      content: (
        <BasicInformation
          data={formData}
          handleChange={handleChange}
          next={next}
        />
      ),
    },
    {
      id: 2,
      title: "Courses Media",
      content: (
        <CoursesMedia
          data={formData}
          handleChange={handleChange}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      id: 3,
      title: "Curriculum",
      content: (
        <Curriculum
          data={formData}
          handleChange={handleChange}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      id: 4,
      title: "Settings",
      content: (
        <Settings
          data={formData}
          handleChange={handleChange}
          next={next}
          previous={previous}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <section className="py-4 py-lg-6 bg-primary">
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-white mb-1">새로운 공모전 주최하기</h1>
                  <p className="mb-0 text-white lead">
                    Just fill the form and create your competition.
                  </p>
                </div>
                <div>
                  <Link
                    to="/competition-filter-page/"
                    className="btn btn-white "
                  >
                    Back to Competition
                  </Link>{" "}
                  <Link
                    to="/marketing/instructor/instructor-my-courses/"
                    className="btn btn-dark "
                  >
                    Save
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <GKStepper currentStep={currentStep} steps={steps} />
    </Fragment>
  );
};

export default AddNewCourse;
