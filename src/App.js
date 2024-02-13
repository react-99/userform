import { useState } from "react";
import { data } from "./data";
import "bootstrap/dist/css/bootstrap.css";

// console.log(data);

function App() {
  const [userSearch, setUserSearch] = useState("");

  // console.log(userSearch);
  const keys = ["first_name", "last_name", "email", "phone"];

  const thisSearch = (userData) => {
    return userData.filter((userData) =>
      keys.some((key) =>
        userData[key].toLowerCase().includes(userSearch.toLowerCase())
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // get the current page of items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = thisSearch(data).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // change page number
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="container">
        <div className="mt-5">
          <form action="">
            <div className="input-group mb-3">
              <input
                type="text"
                onChange={(event) => setUserSearch(event.target.value)}
                placeholder="Search..."
                className="form-control"
              />
            </div>
          </form>
        </div>
        <div className="mt-5">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {/* map through the array of objects and create a new row for each object */}
              {currentItems.map((userData) => (
                <tr key={userData.id}>
                  <th scope="row">{userData.id}</th>
                  <th scope="row">{userData.first_name}</th>
                  <th scope="row">{userData.last_name}</th>
                  <th scope="row">{userData.email}</th>
                  <th scope="row">{userData.phone}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <nav>
            <ul className="pagination">
              {thisSearch(data).length > itemsPerPage &&
                Array.from(
                  { length: Math.ceil(thisSearch(data).length / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default App;
