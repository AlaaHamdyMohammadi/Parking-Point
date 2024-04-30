/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./../styles/FQA.css";
import { CgArrowUpR } from "react-icons/cg";
import { BsArrowDownSquare } from "react-icons/bs";

export default function Fqa() {
    const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const handlesetshow = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="accordion my-5" id="accordionExample">
        <div className={`accordion-item`}>
          <h2 className="accordion-header">
            <button
              className="accordion-button  focus d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={handlesetshow}
            >
              <div>Accordion Item #1</div>
              {show ? <CgArrowUpR className="focuscolor" /> : <BsArrowDownSquare className="focuscolor" />}
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin
              adds the appropriate classNamees that we use to style each element. These classNamees control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS
              or overriding our default variables. It's also worth noting that just about any HTML can go within the{" "}
              <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin
              adds the appropriate classNamees that we use to style each element. These classNamees control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS
              or overriding our default variables. It's also worth noting that just about any HTML can go within the{" "}
              <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin
              adds the appropriate classNamees that we use to style each element. These classNamees control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS
              or overriding our default variables. It's also worth noting that just about any HTML can go within the{" "}
              <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className={`accordion-item`}>
          <h2 className="accordion-header">
            <button
              className="accordion-button  focus d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
              onClick={handlesetshow}
            >
              <div>Accordion Item #</div>
              {show ? <CgArrowUpR className="focuscolor" /> : <BsArrowDownSquare className="focuscolor" />}
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin
              adds the appropriate classNamees that we use to style each element. These classNamees control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS
              or overriding our default variables. It's also worth noting that just about any HTML can go within the{" "}
              <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
