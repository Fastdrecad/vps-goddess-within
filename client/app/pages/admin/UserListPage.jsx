import {
  useDeleteUserMutation,
  useGetUsersQuery
} from "../../redux/slices/usersApiSlice";
import { Col, Row } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import TableUsers from "../../components/common/TableUsers";

// TODO: CONTROL OF THE LIMIT
const limit = 3;

const UserListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, refetch } = useGetUsersQuery({
    page: pageNumber,
    limit
  });

  const displayPagination = data?.totalPages > 1;
  const left = limit * (data?.currentPage - 1) + 1;
  const totalUsers = data?.users.length;
  const right = totalUsers + left - 1;

  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <Loader />
        </Row>
      ) : (
        <>
          <Row className="mx-0 text-end">
            <Col className="pe-0 pb-2 pt-2 fw-bolder">
              <span>Showing: </span>
              {data?.totalUsers > 0
                ? `${left}-${right} data of ${data?.totalUsers} data`
                : `${data?.totalUsers} data`}
            </Col>
          </Row>

          <TableUsers users={data?.users} handleDelete={handleDelete} />

          {displayPagination && (
            <div className="d-flex justify-content-center text-center mt-4">
              <Pagination
                totalPages={data?.totalPages}
                onPagination={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserListPage;
