import React, { useState, useEffect } from "react";
import "./Recommend.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import { updateAnimeList, updateRecommendations } from "../../Redux/Actions";
import ValidUserModal from "../ValidUserModal";

function Recommend(props) {
  // determines anime to be recommended
  const getRecommend = () => {
    props.onUpdateRec();
  };

  // for valid user modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // check if error occurred and alert user
  useEffect(() => {
    if (props.recError === true || props.listError === true) alert("Oops... something went wrong!");
  }, [props.recError, props.listError]);

  return (
    <>
      {/*Info Div*/}
      <div id="info_div">
        <h1>Recommender</h1>
        <div>Determines recommendations based on your favourite/highest rated shows</div>
        <Button
          onClick={() => {
            if (props.name) {
              getRecommend();
            } else handleShow();
          }}
          variant="success"
          id="rec_button"
        >
          Get Recommendations
        </Button>
      </div>

      <div id="rec_container">
        {props.recommended
          ? props.recommended.map((show) => (
              <Card className="anime-card" border="secondary" key={show.mal_id}>
                <Card.Header title={show.title} as="h6">
                  <div className="anime-title">{show.title}</div>
                </Card.Header>
                <a className="image-div" href={show.url} rel="noopener noreferrer" target="_blank">
                  <img className="card-img" src={show.image_url} alt="Cover" />
                </a>
              </Card>
            ))
          : ""}
      </div>

      {/*Requiring Valid User Modal*/}
      <ValidUserModal show={show} handleClose={handleClose} />

      {/*Loading Overlay*/}
      {props.recLoading || props.listLoading ? (
        <div className="modal_background">
          {props.listLoading ? (
            <div className="modal_spinner">
              <Spinner animation="border" variant="light" size="lg" />{" "}
            </div>
          ) : props.recLoading ? (
            <div id="modal_bar">
              <ProgressBar id="progress_bar" animated now={(props.progress / props.total) * 100} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// mapping redux state to props
const mapStateToProps = (state) => {
  return {
    name: state.name.username,
    userdata: state.userdata,
    recommended: state.recommend.recommentations,
    total: state.recommend.total,
    progress: state.recommend.progress,
    recLoading: state.recommend.loading,
    listLoading: state.userdata.loading,
    recError: state.recommend.error,
    listError: state.userdata.error,
  };
};

// mapping redux dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAnimeList: () => dispatch(updateAnimeList()),
    onUpdateRec: () => dispatch(updateRecommendations()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
