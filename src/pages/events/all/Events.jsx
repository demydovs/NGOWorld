import { Button, Footer, Loading, Navbar } from "@components/shared";
import EventCard from "@components/shared/cards/event/EventCard";
import EventSlider from "@components/shared/cards/event/EventSlider";
import CreateEvent from "@components/shared/createEvent/createEvent";
import ComponentHelmet from "@utils/ComponentHelmet";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Events.scss";
import { useTranslation } from "react-i18next";

const Events = () => {
  const { t } = useTranslation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const events = Array.from({ length: 20 }, () => ({
    _id: "673ac2814c6e89e58af8ca11",
    userType: "club",
    userName: "tamalcodes",
    name: "God Father Org",
    email: "tamalcodes@gmail.com",
    password: "$2a$10$90vC9McfHXpXpLlzUOFeuulorPR9dIQ2ns37uIP5sX5ehyO5C.Mmm",
    cart: [],
    __v: 0,
  }));

  return (
    <>
      <ComponentHelmet type="Clubs" />
      <Navbar />

      <div className="events_header">
        <div className="events_search_parent">
          <label htmlFor="search-events">{t("search")}</label>
          <input
            type="text"
            name="search-events"
            id="search-events"
            placeholder={t("type_to_begin_search")}
            aria-label={t("type_to_begin_search")}
          />
          <button
            aria-label={t("filter_events")}
          >
            {t("filters")} <CiFilter />
          </button>
        </div>

        <Button
          className="createevent"
          onClickfunction={() => {
            setShowCreateModal(true);
          }}
          aria-label={t("create_new_event")}
        >
          <FaPlus /> {t("create_event")}
        </Button>
      </div>

      <EventSlider />

      <hr className="events_separator" />

      <div className="events_parent" aria-live="polite">
        {!events || events?.length === 0 ? (
          <Loading />
        ) : (
          events?.map((event, id) => <EventCard event={event} key={id} />)
        )}
      </div>

      {showCreateModal && (
        <div
          role="dialog"
          aria-labelledby="create-event-modal"
          aria-hidden={!showCreateModal}
        >
          <CreateEvent setShowCreateModal={setShowCreateModal} />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Events;
