import { CiFilter } from "react-icons/ci";
import { PiCaretLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ClubCard,
  Footer,
  Loading,
  Navbar,
} from "../../components/shared";
import ComponentHelmet from "../../utils/ComponentHelmet";
import "./Clubs.scss";
import { useTranslation } from "react-i18next";

const Clubs = () => {
  const { t } = useTranslation();

  // demo 20 array of clubs
  const clubs = Array.from({ length: 20 }, () => ({
    _id: "673ac2814c6e89e58af8ca11",
    userType: "club",
    userName: "tamalcodes",
    name: "God Father Org",
    email: "tamalcodes@gmail.com",
    password: "$2a$10$90vC9McfHXpXpLlzUOFeuulorPR9dIQ2ns37uIP5sX5ehyO5C.Mmm",
    cart: [],
    __v: 0,
  }));

  const navigate = useNavigate();

  return (
    <>
      <ComponentHelmet type="Clubs" />
      <Navbar />

      <div className="clubs_header">
        <div className="clubs_search_parent">
          <label htmlFor="search-clubs">{t("search")}</label>
          <input
            type="text"
            name="search-clubs"
            id="search-clubs"
            placeholder={t("type_to_begin_search")}
            aria-label={t("search_clubs")}
          />
          <button aria-label={t("filter_clubs")}>
            {t("filters")} <CiFilter />
          </button>
        </div>

        <Button
          className="viewdashboard"
          onClickfunction={() => {
            navigate("/dashboard");
          }}
          aria-label={t("go_to_dashboard")}
        >
          {t("your_dashboard")} <PiCaretLeftBold />
        </Button>
      </div>

      <div className="clubs_parent" aria-live="polite">
        {!clubs || clubs?.length === 0 ? (
          <Loading />
        ) : (
          clubs?.map((club, id) => <ClubCard club={club} key={id} />)
        )}
      </div>

      <Footer />
    </>
  );
};

export default Clubs;
