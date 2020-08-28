import React, { useEffect, useState } from "react";
import "./Schedule.css";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { updateSchedule, updateAnimeList } from "../../Redux/Actions";

function Schedule(props) {
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  // update days array
  useEffect(() => {
    const cur_day = new Date().getDay();
    // order starting from current day of week
    let new_days = [...days.slice(cur_day), ...days.slice(0, cur_day)];
    setDays(new_days);
    props.onUpdateSchedule();
  }, []);

  return (
    <>
      <div id="week_container">
        {days.map((day) => {
          return (
            <div className="day-container" key={day}>
              <div className="day-title">
                <h1>{day}</h1>
              </div>
              <div className="anime-container">
                {props.shows
                  ? props.shows[day].map((anime) => {
                      return (
                        <Card className="anime-card" border="secondary" key={anime.title}>
                          <Card.Header title={anime.title} as="h6">
                            <div className="anime-title">{anime.title}</div>
                          </Card.Header>
                          <Card.Img variant="top" src={anime.image_url} />
                          <Card.Footer>
                            <small className="text-muted">{anime.airing_start}</small>
                          </Card.Footer>
                        </Card>
                      );
                    })
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => props.onUpdateAnimeList()}>Test</button>
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    shows: state.schedule.days,
    loading: state.schedule.loading,
    error: state.schedule.error,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSchedule: () => dispatch(updateSchedule()),
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
