import React from "react";
import DatePicker from "react-datepicker";
import { Table } from "react-bootstrap";
import moment from "moment";
import { useState, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import "./userdetail.css";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { get } from "../Central-api/Usersapi";
import { Container, Row, Col ,Form} from "react-bootstrap";
export const UserDetail = () => {
  const history = useHistory("");
  if (localStorage.length === 0) {
    history.push("/");
  }
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [paginationFlag, setPaginationFlag] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  useEffect(() => {
    loadUserData(0);
    get("totalrecordcount").then((res) => {
      var count = Math.ceil(res.data.length / 5);
      setCount(count);
    });
  }, []);

  const handlePageClick = (currentPage) => {
    if (!paginationFlag) {
      loadUserData(currentPage.selected);
    }
  };

  const loadUserData = async (page) => {
    get(`Details/${page}`)
      .then((response) => {
        setData(response.data);
      })

      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    setPaginationFlag(false);
    loadUserData();
  };
  const handleSearch = async (e) => {
    e.preventDefault();

    get(`searchDetail/${name}`)
      .then((response) => {
        setData(response.data);
        setPaginationFlag(true);
        setCount(Math.ceil(response.data.length / 5));
        // setName("");
      })
      .catch((err) => console.log(err));
  };

  const filterData = () => {
    const params = new URLSearchParams({
      name: localStorage.getItem("Name"),
      start: moment(startDate).format("YYYY-MM-DD"),
      end: moment(endDate).format("YYYY-MM-DD"),
    }).toString();

    get(`/filterDetail?${params}`)
      .then((response) => {
        setData(response.data);
        setPaginationFlag(true);
        setCount(Math.ceil(response.data.length / 5));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <MDBContainer>
        <form
          // style={{
          //   margin: "auto",
          //   padding: "15px",
          //   maxWidth: "400px",
          //   alignContext: "center",
          // }}
          className="d-flex input-group w-auto"
        >
          <input
            type="text"
           style={{marginLeft:"300px",width:"300px"}}
            //  className="w-25"
            placeholder=" Search name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          &nbsp;
          <button className="btn btn-outline-success"  onClick={handleSearch}>
            Search
          </button>
          &nbsp;
          <button className="btn btn-outline-success" onClick={handleReset}>
            Reset
          </button>
        </form>
      </MDBContainer>
      <MDBContainer>
        <div
          className="col-md-8 offset-md-2 mt-3"
          // style={{
          //   marginLeft: "200px",
          //   padding: "15px",
          //   maxWidth: "400px",
          //   alignContext: "center",
          // }}
        >
          <div className="row">
            <div className="col-md-4">
              StartDate:
              <DatePicker
                selected={startDate}
                onChange={(e) => setStartDate(e)}
                placeholderText="Enter Start Date"
              />
            </div>
            <div className="col-md-4">
              EndDate:
              <DatePicker
                selected={endDate}
                onChange={(e) => setendDate(e)}
                placeholderText="Enter End Date"
              />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-success d-inline-block  mt-3"
                onClick={filterData}
                // style={{ marginLeft: "650px", marginTop: "-120px" }}
              >
                Filter by Date
              </button>
            </div>
          </div>
        </div>
      </MDBContainer>
      <MDBContainer>
        <div className="mt-5">
          <Container fluid>
            <Row>
              <Col xs lg="12" id="no-more-tables">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">InTime</th>
                      <th scope="col"> OutTime</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Total Hours</th>
                    </tr>
                  </thead>
                    
                  {data.length === 0 ? (
                   <tbody><tr><td>No Data found</td></tr></tbody>
                  ) : (
                    data.map((item, index) => (
                      <tbody key={index}>
                        <tr><th scope="row" data-title="No">{index + 1}</th>
                          <td colSpan={1} data-title="Name">
                            {item.name}
                          </td>
                          <td colSpan={1} data-title="Start Date">
                          {moment(item.start).format("DD-MM-YYYY")}
                          </td>
                          <td colSpan={1} data-title="InTime">
                            {item.inTime}{" "}
                          </td>
                          <td data-title="OutTime">{item.outTime}</td>
                          <td data-title="End Date">{moment(item.end).format("DD-MM-YYYY")}</td>
                          <td data-title="Total Hours">
                            {item.totalHour} hours
                          </td>
                        </tr>
                      </tbody>
                    ))
                  )}
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </MDBContainer>
      <br />
      <br />
      <br />
      <br />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplay={2}
        pageRangeDisplay={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};
