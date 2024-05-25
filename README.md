# Parking Point Website

An online website for booking parking spaces is a system used to reserve available parking spots near homes and buildings, facilitating the booking process.The project aims to improve car users' experience of finding parking more effectively.

## Tech Stack

- **Javascript**: For adding static type definitions to JavaScript, enhancing development experience and code quality.
- **Bootstrap**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **Redux Toolkit**: For efficient global state management .
- **Axios**: For seamless API integration.

## Project Structure

```
Parking-Point-website/
├── public/
│   ├── locales/                                # Directory for localization 
│   │   ├── ar/                                 # Arabic localization
│   │   │    ├── translation.json               # Common translations for Arabic
│   │   └── en/                                 # English localization
│   │        ├── translation.json               # Common translations for English
│   ├── images/                                 # Static images directory
├── src/
│   ├── App.jxs                                 # Main application component
│   ├── App.css                                 # Global CSS styles for the app
│   ├── main.jxs                                # Entry point for the application
│   ├── i18n.js                                 # Internationalization configuration
│   ├── index.css                               # Global CSS styles
│   ├── axiosConfig/                            # Axios configuration for HTTP requests
│   |   ├── instance.jsx                        # Axios instance setup
│   ├── components/                             # Reusable UI components
│   |   ├── dashboard/                          # Components related to dashboard
│   |   |   ├── parkingCard.jsx                 # Parking card component
│   |   |   ├── parkingFilter.jsx               # Parking filter component
│   |   ├── driver/                             # Components for driver-related features
│   |   |   ├── EndDT.jsx                       # End date-time component
│   |   |   ├── HomeLogin.jsx                   # Home login component
│   |   |   ├── Map.jsx                         # Map component
│   |   |   ├── ParkingCard.jsx                 # Parking card component for driver
│   |   |   ├── RatingComponent.jsx             # Rating component
│   |   |   ├── ReserveModal.jsx                # Modal for reservation
│   |   |   ├── SearchInput.jsx                 # Search input component
│   |   |   ├── SelectLocation.jsx              # Location selection component
│   |   |   ├── StarRatingModal.jsx             # Star rating modal component
│   |   ├── footer/                             # Footer components
│   |   |   ├── Footer.jsx                      # Footer component
│   |   ├── formsValidation/                    # Components for form validation
│   |   |   ├── CarTypeInput.jsx                # Car type input component
│   |   |   ├── CitySelect.jsx                  # City selection component
│   |   |   ├── EmailInput.jsx                  # Email input component
│   |   |   ├── NameInputs.jsx                  # First name input component
│   |   |   ├── NameLastInputs.jsx              # Last name input component
│   |   |   ├── PhoneInput.jsx                  # Phone input component
│   |   |   ├── PlateNumberInput.jsx            # Plate number input component
│   |   |   ├── RegionInput.jsx                 # Region input component
│   |   |   ├── stateInput.jsx                  # State input component
│   |   ├── guard/                              # Route guard components
│   |   |   ├── Guard.jsx                       # General guard component
│   |   |   ├── LoginGuard.jsx                  # Guard for login routes
│   |   |   ├── RenterGuard.jsx                 # Guard for renter routes
│   |   ├── header/                             # Header components
│   |   |   ├── Header_2.jsx                    # Alternate header component
│   |   |   ├── Header.jsx                      # Main header component
│   |   |   ├── LanguageSwitch.jsx              # Language switcher component
│   |   ├── home/                               # Components for home page
│   |   |   ├── HomeLogout.jsx                  # Home logout component
│   |   ├── login-register/                     # Login and registratio components
│   |   |   ├── ForgotPassword.jsx              # Forgot password component
│   |   |   ├── ConfirmEmail.jsx                # Confirm email component
│   |   |   ├── ConfirmEmailPop.jsx             # Confirm email popup component
│   |   |   ├── CountdownTimer.jsx              # Countdown timer component
│   |   |   ├── LoginForm.jsx                   # Login form component
│   |   |   ├── RegisterForm.jsx                # Registration form component
│   |   ├── pagination/                         # Pagination components
│   |   |   ├── SimplePagination.jsx            # Simple pagination component
│   |   ├── parking/                            # Parking related components
│   |   |   ├── Download.jsx                    # Download component
│   |   |   ├── SidebarDashboard.jsx            # Sidebar for dashboard
│   |   ├── profile/                            # Profile related components
│   |   |   ├── ChangePassword.jsx              # Change password component
│   |   |   ├── Info.jsx                        # Profile info component
│   |   |   ├── PhotoProfile.jsx                # Profile photo component
│   |   |   ├── SelectEdit.jsx                  # Select edit component
│   |   |   ├── Setting.jsx                     # Settings component
│   |   |   ├── sidebarLink.jsx                 # Sidebar link component
│   |   ├── spinner/                            # Loading spinner components
│   |   |    ├── Spinner.jsx                    # Spinner component
│   |   |    ├── Spinner.css                    # Spinner CSS styles
│   ├── layout/                                 # Layout components
│   |   ├── DefaultLayout.jsx                   # Default layout component
│   |   ├── Layout.jsx                          # General layout component
│   |   ├── RegistLayout.jsx                    # Registration layout component
│   ├── pages/                                  # Page components
│   |   ├── parking/                            # Parking-related pages
│   |   |   ├── AddParking.jsx                  # Add parking page
│   |   |   ├── Dashboard.jsx                   # Dashboard page
│   |   |   ├── EditProfile.jsx                 # Edit profile page
│   |   |   ├── OwnerProfile.jsx                # Owner profile page
│   |   |   ├── ParkDetails.jsx                 # Parking details page
│   |   |   ├── ParkingHome.jsx                 # Parking home page
│   |   |   ├── ParkLocation.jsx                # Parking location page
│   |   |   ├── Sales.jsx                       # Sales page
│   |   |   ├── ViewProfile.jsx                 # View profile page
│   |   ├── cancelPayment.jsx                   # Cancel payment page
│   |   ├── FQA.jsx                             # Frequently Asked Questions page
│   |   ├── HandleError.jsx                     # Error handling page
│   |   ├── Home.jsx                            # Home page
│   |   ├── Map.jsx                             # Map page
│   |   ├── NotFound.jsx                        # 404 Not Found page
│   |   ├── Register.jsx                        # Register page
│   |   ├── SuccessPayment.jsx                  # Success payment page
│   |   ├── Terms.jsx                           # Terms and conditions page
│   ├── store/                                  # Redux store configuration
│   |   ├── slices/                             # Redux slices
│   |   |   ├── authSlice.js                    # Authentication slice
│   |   |   ├── language.js                     # Language slice
│   |   |   ├── login.js                        # Login slice
│   |   |   ├── loginUser.js                    # Login user slice
│   |   |   ├── spinner.js                      # Spinner slice
│   |   ├── store.jsx                           # Redux store setup
│   ├── styles/                                 # CSS styles directory
│   |   ├── formStyle.module.css                # Styles for forms
│   |   ├── FAQ.module.css                      # Styles for FAQ page
│   |   ├── header_2.module.css                 # Styles for alternate header
│   |   ├── header.module.css                   # Styles for main header
│   |   ├── home.module.css                     # Styles for home page
│   |   ├── parkingFilter.module.css            # Styles for parking filter
│   |   ├── register.module.css                 # Styles for register page
│   |   ├── sidebarDashboard.module.css         # Styles for sidebar dashboard

```

## Getting Started

### Prerequisites

- Node.js (version 10.X.X or later)
- npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd parking_point
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
