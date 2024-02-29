export default function Footer() {
  return (
    <footer className=" bgColor ">
      <ul className="nav justify-content-center  pb-3 mb-1">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-white">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-white">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-white">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-white">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-white">
            About
          </a>
        </li>
      </ul>
      <ul className="list-unstyled d-flex text-white">
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <svg className="bi" width="24" height="24">
              <use xlinkHref="#twitter" />
            </svg>
          </a>
        </li>
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <svg className="bi" width="24" height="24">
              <use xlinkHref="#instagram" />
            </svg>
          </a>
        </li>
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <svg className="bi" width="24" height="24">
              <use xlinkHref="#facebook" />
            </svg>
          </a>
        </li>
      </ul>
      <p className="text-center text-white py-2 navcolor">&copy; 2024 Company, Inc</p>
    </footer>
  );
}
