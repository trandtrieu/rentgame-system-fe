import React, { useEffect, useState } from "react";
import CategoriesServices from "../services/CategoriesServices";
import ReactPaginate from "react-paginate";
import axios from "axios";
import PlatformsServices from "../services/PlatformsServices";
import SearchGamesServices from "../services/SearchGamesServices";
import { convertDollarToVND } from "../util/convert";

export default function SearchProduct() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    platforms: [],
    keyword: "",
    sortType: "",
  });
  const pageSize = 4;

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  const fetchData = () => {
    setSearching(true);
    const timer = setTimeout(() => {
      fetchGames();
      fetchCategories();
      fetchPlatforms();
      fetchKeywords();
      setSearching(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const fetchGames = () => {
    const apiUrl = "http://localhost:8080/rent-game/games/search";
    const params = formatParams();

    console.log("API Request:", apiUrl, "with Params:", params);

    axios
      .get(apiUrl, { params })
      .then((res) => {
        if (res.status === 200) {
          setGames(res.data.content);
          console.log(res.data.content);
          setPageCount(res.data.totalPages);
        } else {
          console.error("API request failed with status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error loading games:", error);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const fetchCategories = () => {
    CategoriesServices.getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  };
  const fetchPlatforms = () => {
    PlatformsServices.getAllPlatforms()
      .then((res) => {
        setPlatforms(res.data);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  };
  const fetchKeywords = () => {
    SearchGamesServices.getKeywordsRandom()
      .then((res) => {
        setKeywords(res.data);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: [...prevFilters.categories, { id: categoryId }],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: prevFilters.categories.filter(
          (category) => category.id !== categoryId
        ),
      }));
    }
  };

  const handlePlatformChange = (e) => {
    const platformId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        platforms: [...prevFilters.platforms, { id: platformId }],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        platforms: prevFilters.platforms.filter(
          (platform) => platform.id !== platformId
        ),
      }));
    }
  };

  const handleSortTypeChange = (e) => {
    const selectedSortType = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortType: selectedSortType,
    }));
  };
  const formatParams = () => {
    let selectedCategoryIds = filters.categories.map((category) => category.id);
    let selectedPlatformIds = filters.platforms.map((platform) => platform.id);

    const params = {
      keyword: filters.keyword,
    };

    if (filters.sortType) {
      params.sortType = filters.sortType;
    }

    if (selectedCategoryIds.length > 0) {
      params.categoryIds = selectedCategoryIds.join(",");
    }
    if (selectedPlatformIds.length > 0) {
      params.platformIds = selectedPlatformIds.join(",");
    }

    return params;
  };
  return (
    <>
      <section className="teams-section pb-sm-10 pb-6 pt-120 mt-lg-0 mt-sm-15 mt-10">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex mb-5">
              <div className="col-md-4">
                <h4 className="mb-3">Categories</h4>
                {categories.map((category) => (
                  <div className="form-check" key={category.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`category-${category.id}`}
                      name="categories"
                      value={category.id}
                      onChange={handleCategoryChange}
                      checked={filters.categories.some(
                        (item) => item.id === category.id
                      )}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`category-${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* check box platform */}
              <div className="col-md-4">
                <h4 className="mb-3">Platforms</h4>
                {platforms.map((platform) => (
                  <div className="form-check" key={platform.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`platform-${platform.id}`}
                      name="platforms"
                      value={platform.id}
                      onChange={handlePlatformChange}
                      checked={filters.platforms.some(
                        (item) => item.id === platform.id
                      )}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`platform-${platform.id}`}
                    >
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <h4 className="mb-3">Price</h4>
                <div className="select">
                  <select
                    onChange={handleSortTypeChange}
                    value={filters.sortType}
                  >
                    <option value="asc" className="select-option">
                      Highest
                    </option>
                    <option value="desc" className="select-option">
                      Lowest
                    </option>
                  </select>
                </div>
                <h4 className="mb-3">Rating</h4>
                <div className="select">
                  <select
                    onChange={handleSortTypeChange}
                    value={filters.sortType}
                  >
                    <option value="highest" className="select-option">
                      Highest
                    </option>
                    <option value="lowest" className="select-option">
                      Lowest
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 ">
              <div className="d-flex flex-column  gap-4 mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter keyword"
                    name="keyword"
                    value={filters.keyword}
                    onChange={(e) =>
                      setFilters({ ...filters, keyword: e.target.value })
                    }
                  />
                  <div className="input-group-append ">
                    <button
                      className="btn btn-primary search-btn"
                      onClick={() => {
                        setCurrentPage(0);
                        fetchData();
                      }}
                      disabled={searching}
                    >
                      {searching ? "Searching" : "Search"}{" "}
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-start">
                  {keywords.map((keyword) => (
                    <div
                      className="keyword-display justify-content-start"
                      key={keyword}
                    >
                      <p
                        className="keyword-trend m-1"
                        onClick={() =>
                          setFilters({ ...filters, keyword: keyword })
                        }
                      >
                        {keyword}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tournament-section pb-120" id="tournament-hero">
        {/* Diamond animation */}
        <div className="diamond-area">
          <img className="w-100" src="assets/img/diamond.png" alt="diamond" />
        </div>
        {/* game console animation */}
        <div className="game-console-area">
          <img
            className="w-100"
            src="assets/img/game-console2.png"
            alt="game-console"
          />
        </div>
        <div className="red-ball top-50" />

        <div className="tournament-wrapper">
          <div className="tournament-wrapper-border">
            <div className="container pt-20 pb-20">
              <div className="row justify-content-between align-items-center gy-sm-0 gy-4 mb-15">
                <div className="col-md-6 col-sm-8">
                  <h2
                    className="display-six tcn-1 cursor-scale growUp title-anim "
                    style={{ marginLeft: "50px" }}
                  >
                    OUR GAMES
                  </h2>
                </div>
                <div className="col-md-6 col-sm-4 text-sm-end">
                  <a
                    href="tournaments.html"
                    className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill"
                    style={{ marginRight: "50px" }}
                  >
                    View More
                  </a>
                </div>
              </div>
              <div
                className={`row justify-content-${
                  games.length < 4 ? "center" : "between"
                } align-items-center g-6`}
              >
                {games.length > 0 ? (
                  games.map((game) => (
                    <React.Fragment key={game.id}>
                      <div className="col-xl-3 col-md-6">
                        <div className="tournament-card p-xl-4 p-3 bgn-4">
                          <div className="tournament-img mb-8 position-relative">
                            <div className="img-area overflow-hidden">
                              <img
                                className="w-100"
                                src={`../assets/img/${game.imageUrls[1]}`}
                                style={{ height: "150px" }}
                                alt="tournament"
                              />
                            </div>
                          </div>
                          <div className="tournament-content px-xl-4 px-sm-2">
                            <div className="tournament-info mb-5">
                              <a
                                href="tournaments-details.html"
                                className="d-block"
                              >
                                <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                                  {game.name}
                                </h4>
                              </a>
                              <ul className="d-flex">
                                {game.categories.map((category) => (
                                  <li
                                    key={category}
                                    style={{ paddingRight: "9px" }}
                                  >
                                    {category}
                                    {""}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="hr-line line3" />
                            <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                              <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    className="w-100"
                                    src="assets/img/tether.png"
                                    alt="tether"
                                  />
                                  <span className="tcn-1 fs- sm">
                                    {convertDollarToVND(game.price)}/hr
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="hr-line line3"></div>
                            <div class="card-more-info d-between mt-6">
                              <div class="teams-info d-between gap-xl-5 gap-3">
                                <div class="teams d-flex align-items-center gap-1">
                                  <i class="ti ti-users fs-base"></i>
                                  <span class="tcn-6 fs-sm">
                                    {game.dateReleased}
                                  </span>
                                </div>
                              </div>
                              {/* click de xem chi tiet */}
                              <a href="tournaments-details.html" class="btn2">
                                <i class="ti ti-arrow-right fs-2xl"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h5>No games found.</h5>
                  </div>
                )}
              </div>
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
