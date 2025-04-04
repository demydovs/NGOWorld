import profileImage from "@/assets/pictures/Navbar/profilePlaceholderImage.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCaretDown, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navbarbrand from "../../../assets/pictures/Navbar/MilanNavBrand.svg";
import { resetUserData, selectUser } from "../../../redux/slice/userSlice";
import { Logout } from "../../../service/MilanApi";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasts";
import Button from "../buttons/globalbutton/Button";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";

const getLinks = (t) => [
  {
    name: t('home'),
    link: "/",
  },
  {
    name: t('clubs'),
    link: "/clubs",
  },
  {
    name: t('trending'),
    link: "/trending",
  },
  {
    name: t('events'),
    link: "/events",
  },
  {
    name: t('shops'),
    link: "/shop",
  },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector(selectUser);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function handleLogout() {
    const data = await Logout();

    if (data?.status === 200) {
      showSuccessToast(data?.data?.message);
      navigate("/");
      dispatch(resetUserData());
      localStorage.clear();
      document
        .querySelector(".nav_dropdown")
        .classList.remove("nav_dropdown_visible");
    } else {
      showErrorToast(data?.message);
    }
  }

  const links = getLinks(t);

  return (
    <nav>
      <div className="navbar_parent">

        <Link className="navbar_brand" to={"/"} aria-label={t('go_to_home')}>
          <img src={navbarbrand} alt="Milan logo" className="nav_brand_img" />
        </Link>

        {windowWidth > 900 && (
          <div className="navbar_links_parent">
            <div className="navbar_links">
              {links.map((item, index) => (
                <div key={index}>
                  <Link
                    key={index}
                    className="navbar_link"
                    to={item.link}
                    aria-label={t(`go_to_${item.name.toLowerCase()}`)}
                  >
                    {item.name}
                  </Link>
                  <div
                    className={
                      location.pathname === item?.link ? "active-link" : ""
                    }
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
            {Cookies.get("Token") && isLoggedIn ? (
              <p
                onClick={() => {
                  document
                    .querySelector(".nav_dropdown")
                    .classList.toggle("nav_dropdown_visible");
                }}
                className="navbar_dropdown_name"
                aria-expanded={isNavbarOpen ? "true" : "false"}
                aria-label={t("profile_dropdown")}
              >
                {t("profile")} <RxCaretDown />
              </p>
            ) : (
              <Button to="/auth/signup" className="navbar_cta">
                <span>{t("sign_up")}</span>
              </Button>
            )}

          </div>
        )}

        {!isNavbarOpen && (
          <>
            {Cookies.get("Token") ? (
              <img
                src={user?.profileImage || profileImage}
                alt={`Profile of ${user?.userName}`}
                className="navbar_hamimg"
                onClick={() => toggleNavbar()}
                aria-label={t("open_menu")}
              />
            ) : (
              <GiHamburgerMenu
                className="navbar_ham"
                onClick={() => toggleNavbar()}
                aria-label={t("open_menu")}
              />
            )}
          </>
        )}

        {isNavbarOpen && (
          <div className="navbar_mobile_linksparent">
            <div className="navbar_mobile_links">
              <RxCross2
                className="navbar_mobile_close"
                onClick={() => toggleNavbar()}
                aria-label={t("close_menu")}
              />

              {links.map((item, index) => (
                <div key={index}>
                  <Link
                    key={index}
                    className="navbar_mobile_link"
                    to={item.link}
                    aria-label={t(`go_to_${item.name.toLowerCase()}`)}
                  >
                    {item.name}
                  </Link>
                  <div
                    className={
                      location.pathname === item?.link ? "active-link" : ""
                    }
                    aria-hidden="true"
                  />
                </div>
              ))}

              {isLoggedIn ? (
                <>
                  <div>
                    <Link
                      className="navbar_mobile_link"
                      to={"/dashboard"}
                      aria-label={t("go_to_dashboard")}
                    >
                      {user?.userType === "individual"
                        ? "Profile"
                        : "Dashboard"}
                    </Link>
                  </div>
                  <div>
                    <p
                      className="navbar_mobile_link"
                      onClick={() => {
                        handleLogout();
                        setIsNavbarOpen(false);
                      }}
                      aria-label={t("logout")}
                    >
                      {t("logout")}
                    </p>
                  </div>
                </>
              ) : (
                <Button to={"/auth/signup"} className="navbar_mobile_cta">
                  <span>{t("sign_up")}</span>
                  <FaChevronRight />
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="nav_dropdown">
          <div className="myaccount">
            <span className="name">Hello @{user?.userName}</span>
            <div
              role="separator"
              aria-orientation="horizontal"
              className="myaccount_separator"
            ></div>
            <Link
              to={
                user?.userType === "individual"
                  ? `/user/${user?.userName}`
                  : `/dashboard`
              }
              aria-label={t("go_to_dashboard")}
            >
              {user?.userType === "individual" ? "Your Profile" : "Dashboard"}
            </Link>
            {user?.userType === "club" && (
              <Link to={"/event/create"} aria-label={t("your_events")}>
                {t("your_events")}
              </Link>
            )}
            <Link aria-label={t("settings")}>{t("settings")}</Link>
          </div>
          <div className="myaccount">
            <div
              role="separator"
              aria-orientation="horizontal"
              className="myaccount_separator"
            ></div>
            <Link aria-label={t("support")}>{t("support")}</Link>
            <Link
              onClick={() => handleLogout()}
              aria-label={t("logout")}
            >
              {t("logout")}
            </Link>
          </div>
        </div>

        <div style={{ whiteSpace: 'nowrap' }}>
          {i18n.language === "fr" ? (
            <Link to="?lang=en" hrefLang="en" aria-label={t("switch_to_english")}>Switch to English</Link>
          ) : (
            <Link to="?lang=fr" hrefLang="fr" aria-label={t("switch_to_french")}>Switch to French</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
