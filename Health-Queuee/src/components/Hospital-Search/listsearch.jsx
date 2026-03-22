import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";

import {
  Search,
  MapPin,
  Star,
  Heart,
  Hospital,
  Bus,
  X,
  TrendingUp,
  Locate,
  Zap,
} from "lucide-react";

import hospitalData from "../../data/listhospital";
import stateData from "../../data/liststate";
import BTSstations from "../../data/btsstation";
import "./listsearch.css";
import resolveAssetPath from "../../utils/assetPath.js";

const HospitalCard = ({ hospital, handleHospital, userLocation }) => {
  const ratingText =
    hospital.stars >= 4.5
      ? "ดีเยี่ยม"
      : hospital.stars >= 4.0
      ? "ดีมาก"
      : hospital.stars >= 3.5
      ? "ดี"
      : "พอใช้";
  const typeVariant = hospital.type === "โรงพยาบาลรัฐ" ? "success" : "warning";
  const isNearBTS = hospital.nearestBTS.distance < 2;

  const distanceDisplay =
    hospital.distanceFromUser && hospital.distanceFromUser < Infinity
      ? hospital.distanceFromUser.toFixed(1) + " กม."
      : null;

  return (
    <Card className="shadow-lg mb-4 hospital-card-custom transition-transform border-0">
      <Card.Body className="p-4 d-flex flex-column flex-md-row align-items-md-center">
        <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle border border-3 border-white shadow"
            style={{ width: "80px", height: "80px" }}
          >
            <Hospital className="text-primary" size={40} />
          </div>
        </div>

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">
              {hospital.name}
            </h5>
            <Badge pill bg={typeVariant} className="text-uppercase ms-2">
              {hospital.type}
            </Badge>
          </div>

          <p className="card-text text-muted mb-2 d-flex align-items-center small">
            <MapPin size={14} className="me-1" />
            {hospital.district}, {hospital.state}
          </p>

          <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Star size={20} className="text-warning fill-warning me-1" />
              <span className="fs-5 fw-bold text-dark">
                {hospital.stars.toFixed(1)}
              </span>
            </div>
            <span className={`fw-medium text-primary me-2`}>
              ({ratingText})
            </span>
            <span className="text-muted small">
              | {hospital.reviews.toLocaleString()} รีวิว
            </span>
          </div>

          <div className="d-flex flex-wrap gap-3 small">
            {distanceDisplay && (
              <span className="text-info d-flex align-items-center">
                <Locate size={14} className="me-1" />
                ห่างจากคุณ {distanceDisplay}
              </span>
            )}
            {isNearBTS && (
              <span className="text-success d-flex align-items-center">
                <Bus size={14} className="me-1" />
                ใกล้ {hospital.nearestBTS.station.name} (
                {hospital.nearestBTS.distance} กม.)
              </span>
            )}
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-md-end mt-3 mt-md-0 ms-md-4">
          <Button
            variant="primary"
            style={{ minWidth: "150px" }}
            className="fw-semibold shadow-sm"
            onClick={() => handleHospital(hospital)}
          >
            นัดหมายแพทย์
          </Button>
          <p
            className="mb-0 text-primary text-decoration-underline small mt-2"
            style={{ cursor: "pointer" }}
            onClick={() => console.log(`View map for ${hospital.name}`)}
          >
            ดูบนแผนที่
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

const FilterOption = ({
  label,
  count,
  isChecked,
  onChange,
  type = "checkbox",
  name,
  icon,
  wrapperClass = "",
}) => (
  <Form.Check
    type={type}
    id={`filter-${name}-${label}`}
    name={name}
    checked={isChecked}
    onChange={onChange}
    label={
      <span className="d-flex justify-content-between align-items-center w-100">
        <span className="text-dark small d-flex align-items-center">
          {icon && (
            <Star size={14} className="text-warning fill-warning me-1" />
          )}
          {label}
        </span>
        <Badge
          bg="light"
          className="text-muted small ms-2 border border-secondary-subtle"
        >
          {count}
        </Badge>
      </span>
    }
    className={`mb-1 p-2 rounded hover-bg-light ${wrapperClass}`}
    style={{ cursor: "pointer" }}
  />
);

export default function Listsearch() {
  const { state } = useLocation();
  const { selectedstate } = state || {};
  const [stateValue, setStateValue] = useState(
    selectedstate || "กรุงเทพมหานคร"
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [letterSearch, setLetterSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const searchSection = useRef(null);
  const navigate = useNavigate();
  const hospitalThai = "โรงพยาบาล";
  const [selectedHospitalType, setSelectedHospitalType] = useState([
    "โรงพยาบาลรัฐ",
    "โรงพยาบาลเอกชน",
  ]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [openFilterPanel, setOpenFilterPanel] = useState(false);
  const userLocation = { lat: 13.8591, lng: 100.5616 };
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [backendHospitals, setBackendHospitals] = useState(hospitalData);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/data/getHospital")
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success" && data.hospitals) {
          const merged = data.hospitals.map(dbHosp => {
            const staticHosp = hospitalData.find(h => h.name === dbHosp.name) || {
              stars: 4.5,
              reviews: 100,
              location: { lat: 13.8, lng: 100.5 }
            };
            let mappedType = dbHosp.type || staticHosp.type || "โรงพยาบาลรัฐ";
            if (mappedType.includes("เอกชน")) {
              mappedType = "โรงพยาบาลเอกชน";
            } else if (
              mappedType.includes("รัฐ") ||
              mappedType.includes("มหาวิทยาลัย") ||
              mappedType.includes("ศูนย์การแพทย์")
            ) {
              mappedType = "โรงพยาบาลรัฐ";
            }

            return {
              ...staticHosp,
              id: dbHosp.id,
              hospital_id: dbHosp.hospital_id,
              name: dbHosp.name,
              type: mappedType,
              state: dbHosp.state || staticHosp.state,
              district: dbHosp.district || staticHosp.district,
            };
          });
          setBackendHospitals(merged);
        }
      })
      .catch(err => console.error("Error fetching hospitals:", err));
  }, []);

  function getDistance(lat1, lng1, lat2, lng2) {
    const kmPerDegreeLat = 111;
    const kmPerDegreeLng = 111 * Math.cos((lat1 * Math.PI) / 180);
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    return Math.sqrt(
      dLat * dLat * kmPerDegreeLat * kmPerDegreeLat +
        dLng * dLng * kmPerDegreeLng * kmPerDegreeLng
    );
  }

  function getNearestBTS(hospital, btsList) {
    let nearest = null;
    let minDistance = Infinity;
    if (!btsList || !hospital.location)
      return { station: null, distance: Infinity };

    btsList.forEach((bts) => {
      const dist = getDistance(
        hospital.location.lat,
        hospital.location.lng,
        bts.lat,
        bts.lng
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearest = bts;
      }
    });
    return { station: nearest, distance: minDistance.toFixed(2) };
  }

  const filteredHospitalList = useMemo(() => {
    let hospitals = backendHospitals
      .filter((hospital) => {
        const matchesState = hospital.state === stateValue;
        const matchesType = selectedHospitalType.includes(hospital.type);
        const matchesStars =
          selectedStars.length === 0 ||
          selectedStars.some((s) => hospital.stars >= s);

        return matchesState && matchesType && matchesStars;
      })
      .map((hospital) => {
        const nearestBTS = getNearestBTS(hospital, BTSstations);
        const distanceFromUser = getDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.location?.lat || 0,
          hospital.location?.lng || 0
        );
        return { ...hospital, nearestBTS, distanceFromUser: distanceFromUser };
      })
      .filter((hospital) => {
        if (selectedTag.includes("nearBTS")) {
          return hospital.nearestBTS.distance < 2;
        }
        return true;
      });

    return hospitals.sort((a, b) => {
      if (selectedTag.includes("popular")) return b.reviews - a.reviews;
      if (selectedTag.includes("nearMe"))
        return a.distanceFromUser - b.distanceFromUser;
      if (selectedTag.includes("nearBTS"))
        return a.nearestBTS.distance - b.nearestBTS.distance;
      return b.stars - a.stars;
    });
  }, [
    stateValue,
    selectedHospitalType,
    selectedStars,
    selectedTag,
    BTSstations,
    userLocation,
    backendHospitals,
  ]);

  const handleTypeToggle = (type) => {
    setSelectedHospitalType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const PUBLIC = "โรงพยาบาลรัฐ";
  const PRIVATE = "โรงพยาบาลเอกชน";

  const handleStarsToggle = (star) => {
    setSelectedStars((prev) => {
      if (star === 0) return [];
      const newStars = prev.includes(star)
        ? prev.filter((s) => s !== star)
        : [...prev, star];

      return newStars.length > 0 ? newStars : [star];
    });
  };

  const handleTagToggle = (tag) => {
    setSelectedTag((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        const sortingTags = ["popular", "nearMe", "nearBTS"];
        if (sortingTags.includes(tag)) {
          return [...prev.filter((t) => !sortingTags.includes(t)), tag];
        }
        return [...prev, tag];
      }
    });
  };

  // /////////////     กดปิด dropdown          ////////////////////////////////////
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchSection.current &&
        !searchSection.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // /////////////     กดเลือกจังหวัดใหม่         ////////////////////////////////////
  function handleSelectState(state) {
    setStateValue(state);
    setLetterSearch("");
    setShowDropdown(false);
    navigate("/hospitals", { state: { selectedstate: state } });
  }

  // /////////////     กดเลือกโรงพยาบาล (เพื่อนำทางไป Queue1)          ////////////////////////////////////
  function handleHospital(hospital) {
    setSelectedHospital(hospital);
    navigate("/queue1", {
      state: { selectedHospital: hospital.name, showDropdown: false },
    });
  }

  const filteredStates = stateData.filter((s) =>
    s.toLowerCase().includes(letterSearch.toLowerCase())
  );

  const filteredHospitalsDropdown = backendHospitals
    .filter(
      (h) =>
        h.name.toLowerCase().includes(letterSearch.toLowerCase()) ||
        hospitalThai.includes(letterSearch)
    )
    .slice(0, 5);

  // /////////////     ฟังชั่น Highlight Text      ////////////////////////////////////
  function highlightText(text) {
    const search = letterSearch.toLowerCase();
    const lowerText = text.toLowerCase();
    const startIndex = lowerText.indexOf(search);

    if (startIndex === -1 || search === "") return text;

    const before = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + search.length);
    const after = text.slice(startIndex + search.length);

    return (
      <>
        {before}
        <span className="fw-bold text-primary">{match}</span>
        {after}
      </>
    );
  }

  // /////////////     Component ย่อยสำหรับ Filter Panel      ////////////////////////////////////
  const FilterPanel = () => (
    <Card className="shadow-lg mb-4">
      <Card.Header
        className="d-flex justify-content-between align-items-center bg-white border-bottom p-3 cursor-pointer"
        onClick={() => setOpenFilterPanel(!openFilterPanel)}
        style={{ cursor: "pointer" }}
      >
        <h3 className="fs-5 fw-bold text-dark mb-0 d-flex align-items-center">
          <Search size={20} className="me-2 text-primary" /> ตัวกรอง
        </h3>
        <Button
          variant="outline-primary"
          size="sm"
          aria-expanded={openFilterPanel}
        >
          {openFilterPanel ? "ซ่อน" : "แสดง"}
        </Button>
      </Card.Header>

      <Collapse in={openFilterPanel}>
        <Card.Body>
          <div className="mb-4 pb-3 border-bottom border-light">
            <h3 className="fs-6 fw-semibold text-secondary mb-3">ประเภท</h3>
            {["โรงพยาบาลรัฐ", "โรงพยาบาลเอกชน"].map((type) => (
              <FilterOption
                key={type}
                label={type}
                count={
                  backendHospitals.filter(
                    (h) => h.type === type && h.state === stateValue
                  ).length
                }
                isChecked={selectedHospitalType.includes(type)}
                onChange={() => handleTypeToggle(type)}
                name="type"
                wrapperClass="ms-3"
              />
            ))}
          </div>

          <div className="mb-4 pb-3 border-bottom border-light">
            <h3 className="fs-6 fw-semibold text-secondary mb-3">คะแนนรีวิว</h3>
            <Form.Group>
              {[4.5, 4.0, 3.5].map((starValue) => (
                <FilterOption
                  key={starValue}
                  type="checkbox"
                  name="minStars"
                  wrapperClass="ms-3"
                  label={`${starValue}+ ขึ้นไป`}
                  count={
                    backendHospitals.filter(
                      (h) => h.stars >= starValue && h.state === stateValue
                    ).length
                  }
                  isChecked={selectedStars.includes(starValue)}
                  onChange={() => handleStarsToggle(starValue)}
                  icon={true}
                />
              ))}
              <Button
                variant="link"
                size="sm"
                onClick={() => setSelectedStars([])}
                className="mt-2 p-0"
              >
                ล้างตัวกรองดาว
              </Button>
            </Form.Group>
          </div>
        </Card.Body>
      </Collapse>
    </Card>
  );

  // /////////////     JSX หลักของ Component      ////////////////////////////////////
  return (
    <div className="bg-light min-vh-100">
      <Container fluid="lg">
        {/* Header / Search Bar Section */}
        <header className="text-center mb-5 pt-3">
          <h1 className="display-6 fw-bold text-dark mb-2 mt-5">
            ค้นหาโรงพยาบาลและนัดหมายแพทย์
          </h1>
          <p className="text-muted fs-5">
            โรงพยาบาลในจังหวัด: <Badge bg="primary">{stateValue}</Badge>
          </p>

          <Row className="justify-content-center mt-4 search-row">
            <Col
              xs={12}
              lg={8}
              className="search-col position-relative"
              ref={searchSection}
            >
              <div className="input-group input-group-lg search-input-group">
                {" "}
                <span className="input-group-text search-icon">
                  <Search size={24} />
                </span>
                <input
                  type="text"
                  placeholder="ค้นหาจังหวัด หรือชื่อโรงพยาบาล..."
                  value={letterSearch}
                  onChange={(e) => {
                    setLetterSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="form-control search-input"
                />
              </div>

              {showDropdown && letterSearch.length > 0 && (
                <ListGroup className="search-dropdown shadow-lg position-absolute w-100 mt-2 z-1">
                  {filteredHospitalsDropdown.map((hospital) => (
                    <ListGroup.Item
                      key={hospital.name}
                      action
                      onClick={() => {
                        handleHospital(hospital);
                        setShowDropdown(false);
                      }}
                    >
                      <Hospital size={16} className="me-2 text-success" />
                      {highlightText(hospital.name)} ({hospital.state})
                    </ListGroup.Item>
                  ))}
                  {filteredStates.map((state) => (
                    <ListGroup.Item
                      key={state}
                      action
                      onClick={() => handleSelectState(state)}
                    >
                      <MapPin size={16} className="me-2 text-info" />
                      {highlightText(state)} (จังหวัด)
                    </ListGroup.Item>
                  ))}

                  {filteredStates.length === 0 &&
                    filteredHospitalsDropdown.length === 0 && (
                      <ListGroup.Item className="text-muted">
                        ไม่พบผลลัพธ์
                      </ListGroup.Item>
                    )}
                </ListGroup>
              )}
            </Col>
          </Row>
        </header>

        <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
          <h5 className="fw-bold text-dark me-2 mb-0 d-flex align-items-center">
            เรียงตาม:
          </h5>
          {[
            {
              key: "popular",
              label: "ยอดนิยม",
              icon: <TrendingUp size={16} />,
            },
            { key: "nearMe", label: "ใกล้ฉัน", icon: <Locate size={16} /> },
            { key: "nearBTS", label: "ใกล้ BTS/MRT", icon: <Bus size={16} /> },
          ].map((tag) => (
            <Button
              key={tag.key}
              variant={
                selectedTag.includes(tag.key) ? "primary" : "outline-secondary"
              }
              size="sm"
              className="fw-semibold d-flex align-items-center"
              onClick={() => handleTagToggle(tag.key)}
            >
              {tag.icon}
              <span className="ms-1">{tag.label}</span>
              {selectedTag.includes(tag.key) && (
                <X size={14} className="ms-1" />
              )}
            </Button>
          ))}
        </div>

        <Row className="g-4">
          <Col lg={3}>
            <FilterPanel />
            <Card className="shadow-sm mt-4">
              <Card.Body>
                <h3 className="fs-6 fw-bold text-secondary mb-3">
                  ตัวกรองที่ใช้งาน:
                </h3>
                <div className="d-flex flex-wrap gap-2">
                  {selectedHospitalType.map((t) => {
                    const color =
                      t === PUBLIC
                        ? "warning"
                        : t === PRIVATE
                        ? "success"
                        : "secondary"; // เผื่อค่าอื่นในอนาคต

                    return (
                      <Badge key={t} bg={color}>
                        {t}
                      </Badge>
                    );
                  })}

                  {selectedStars.map((s) => (
                    <Badge key={s} bg="warning" text="dark">
                      {s}+ ดาว
                    </Badge>
                  ))}
                  {selectedTag.map((t) => (
                    <Badge key={t} bg="success">
                      {t}
                    </Badge>
                  ))}
                  {selectedHospitalType.length === 2 &&
                    selectedStars.length === 0 &&
                    selectedTag.length === 0 && (
                      <p className="text-muted small mb-0">
                        ไม่มีการตั้งค่าตัวกรองเพิ่มเติม
                      </p>
                    )}
                </div>
                <Button
                  variant="link"
                  className="text-decoration-none text-danger small mt-3 p-0"
                  onClick={() => {
                    setSelectedHospitalType(["โรงพยาบาลรัฐ", "โรงพยาบาลเอกชน"]);
                    setSelectedStars([]);
                    setSelectedTag([]);
                  }}
                >
                  ล้างตัวกรองเสริม
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <h2 className="fs-4 fw-bold text-dark mb-4">
              ผลการค้นหาโรงพยาบาลใน {stateValue} ({filteredHospitalList.length}{" "}
              แห่ง)
            </h2>

            {filteredHospitalList.length > 0 ? (
              <div className="hospital-list">
                {filteredHospitalList.map((hospital, index) => (
                  <HospitalCard
                    key={index}
                    hospital={hospital}
                    handleHospital={handleHospital}
                    userLocation={userLocation}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center p-5 border-dashed border-2 text-muted">
                <Heart size={50} className="text-primary mx-auto mb-3" />
                <p className="fs-5 text-secondary mb-1">
                  ไม่พบโรงพยาบาลที่ตรงกับเงื่อนไขการค้นหาของคุณ
                </p>
                <p className="small">โปรดลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <img
          src={"./images/wave-navy.png"}
          alt="footer wave"
          style={{
            width: "100%",
            height: "120px",
            display: "block",
            marginBottom: "-5px",
            marginTop: "-5px",
          }}
        />
      </div>

      <footer
        id="contact"
        className="custom-footer py-5"
        style={{ backgroundColor: "rgb(2, 10, 27)" }}
      >
        <div className="row mb-5">
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-4">
              <span className="h3 fw-bold text-white mb-0">HFU</span>
            </div>
            <p className="text-light small opacity-75 mb-4">
              Health Queue Management System
            </p>

            <h5 className="fw-bold fs-5 mb-3">Contact</h5>
            <ul className="list-unstyled small contact-list">
              <li className="d-flex align-items-start mb-2">
                <i className="bi bi-geo-alt-fill"></i>
                <p className="mb-0">
                  123 Bangkhen, Sripatum, Bangkok, Thailand 10110
                </p>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+6621234567">(66) 9 999 9999</a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-envelope-fill"></i>
                <a href="mailto:support@hfu.co">support@hfu.co.th</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Products</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Queue Management</a>
              </li>
              <li>
                <a href="#">Appointment System</a>
              </li>
              <li>
                <a href="#">Analytics Dashboard</a>
              </li>
              <li>
                <a href="#">Mobile App</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Company</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog & News</a>
              </li>
              <li>
                <a href="#">Our Vision</a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 col-lg-4 mt-4 mt-md-0">
            <h4 className="fw-bold fs-5 mb-4">Support & Legal</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Help Center (FAQ)</a>
              </li>
              <li>
                <a href="#">API Documentation</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary-subtle pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-light opacity-50 small mb-3 mb-md-0">
            &copy; 2025 HFU Healthcare Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
