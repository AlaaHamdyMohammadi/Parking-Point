import { SlSocialInstagram } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const whatsappNumber = "+96877344277";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const { t } = useTranslation();
  return (
    <footer className=" bgColor mb-0 z-3 end-0 position-absolute w-100 ">
      <ul className="nav justify-content-center   py-3 mb-1">
        <li className="nav-item">
          <Link className=" px-2 hoverColor animate transition">{t('home')}</Link>
        </li>

        <li className="nav-item">
          <Link to={"/Terms"} className=" px-2 hoverColor animate transition">
            {t('footer.terms')}
          </Link>
        </li>
        <li className="nav-item">
          <a
            className=" px-2 hoverColor animate transition"
            href="mailto:parkingpoint@outlook.com"
          >
            {t('header.support')}
          </a>
        </li>
      </ul>

      <ul className="list-unstyled d-flex justify-content-center text-center">
        <li className="ms-3">
          <a
            className="link-body-emphasis"
            href="mailto:parkingpoint@outlook.com"
          >
            <TfiEmail className="fs-4 animate transition hoverColor" />
          </a>
        </li>
        <li className="ms-3">
          <Link to={`https://x.com/parkingpointt?s=11`}>
            <BsTwitterX className="fs-4 animate transition hoverColor" />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            to={`https://www.instagram.com/_parkingpoint?igsh=Z2Qyeno1NGlseWZm&utm_source=qr`}
          >
            <SlSocialInstagram className="fs-4 animate  transition hoverColor" />
          </Link>
        </li>
        <li className="ms-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="fs-3 animate transition hoverColor" />
          </a>
        </li>
      </ul>
      <p className="text-center p-2 Gray mb-0 transition navcolor">
        {` < Developed by < `}
        <small className="">
          &copy; 2024 <a href="https://www.facebook.com/profile.php?id=61555179886514"
          target="_blank" rel="noreferrer" className="Gray"> Promisify Company </a> </small>
      </p>
    </footer>
    // <footer className="z-3 position-absolute w-100 bgColor mb-0 ">
    // //   <div className="d-lg-flex justify-content-evenly">
    // //     <div className=" col-lg-3 col-md-3 col-sm-12 p-3">
    // //       <div className="d-flex animate transition ">
    // //         <img src="/parkingpointlogo2.png" style={{ height: "5rem", width: "5rem" }} />
    // //         <span className=" yellowcolor align-self-center">
    // //           <h5>parking point</h5>
    // //         </span>
    // //       </div>

    // //       <div className="d-flex flex-column p-4">
    // //         <div className="mb-3  ">
    // //           <Link to={``}>
    // //             <TfiEmail className="fs-4  animate transition hoverColor" />
    // //           </Link>
    // //           <span className="hoverColor pointer transition px-2">promisify@gmail.com</span>
    // //         </div>
    // //         <div className="mb-3   transition">
    // //           <Link to={``}>
    // //             <ImWhatsapp className="fs-4   animate hoverColor" />
    // //           </Link>
    // //           <span className="hoverColor pointer transition px-2">12345645678</span>
    // //         </div>
    // //       </div>
    // //     </div>
    // //     <div className="col-lg-6 col-md-6 col-sm-12"></div>
    // //     <div className="col-lg-3 col-md-3 col-sm-12 align-self-center mt-5 pt-2">
    // //       <ul className="nav justify-content-center   pb-3 mb-1">
    // //         <li className="nav-item">
    // //           <Link className=" px-2 hoverColor animate transition">Home</Link>
    // //         </li>
    // //         {/* <li className="nav-item">
    // //           <a href="#" className="nav-link px-2 hoverColor animate transition">
    // //             Features
    // //           </a>
    // //         </li> */}

    // //         <li className="nav-item">
    // //           <Link className=" px-2 hoverColor animate transition">FAQs</Link>
    // //         </li>
    // //         <li className="nav-item">
    // //           <Link className=" px-2 hoverColor animate transition">About</Link>
    // //         </li>
    // //       </ul>

    // //       <ul className="list-unstyled d-flex justify-content-center text-center">
    // //         <li className="ms-3">
    // //           <Link to={`https://twitter.com/`}>
    // //             {/* <SlSocialTwitter className="fs-4 animate transition hoverColor" /> */}
    // //             <BsTwitterX className="fs-4 animate transition hoverColor" />
    // //           </Link>
    // //         </li>
    // //         <li className="ms-3">
    // //           <Link to={`https://www.instagram.com/`}>
    // //             <SlSocialInstagram className="fs-4 animate  transition hoverColor" />
    // //           </Link>
    // //         </li>
    // //         <li className="ms-3">
    // //           <Link to={`https://www.linkedin.com/`}>
    // //             <SlSocialLinkedin className="fs-4 animate transition hoverColor" />
    // //           </Link>
    // //         </li>
    // //       </ul>
    // //     </div>
    // //   </div>

    // //   <p className="text-center p-2  Gray mb-0  transition navcolor">
    // //     <small>&copy; 2023 Promisify Company</small>
    // //   </p>
    // // </footer>
  );
}
