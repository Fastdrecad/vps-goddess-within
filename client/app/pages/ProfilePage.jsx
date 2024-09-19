import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/Button";
import {
  useLogoutMutation,
  useProfileMutation
} from "../redux/slices/usersApiSlice";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import { logout, setCredentials } from "../redux/slices/authSlice";
import { useGetMyOrdersQuery } from "../redux/slices/ordersApiSlice";
import Message from "../components/common/Message";
import Input from "../components/common/Input";
import Meta from "../components/common/Meta";
import TableOrders from "../components/common/TableOrders";
import { NavLink, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/slices/cartSlice";
import { clearAllWishlistItems } from "../redux/slices/wishlistSlice";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearAllWishlistItems());
      navigate("/login");
      setIsHovering(false);
    } catch (err) {
      console.error(err);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstName,
          lastName,
          email,
          password
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Meta />
      <Col md={3}>
        <div className="user-profile">
          {userInfo && (
            <div className="profileTab-logout justify-content-start p-0 mb-3">
              <NavLink to="/login" type="button" onClick={logoutHandler}>
                <span>
                  Not{" "}
                  {`${
                    userInfo.firstName.charAt(0).toUpperCase() +
                    userInfo.firstName.slice(1)
                  }`}
                  ? Log out
                </span>
              </NavLink>
            </div>
          )}
        </div>
        <h1>User Profile</h1>

        <form onSubmit={handleSubmit}>
          <Col xs="12" md="12">
            <Input
              id="firstName"
              type="text"
              label="First Name*"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onInputChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="lastName"
              type="text"
              label="Last Name*"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onInputChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="email"
              type="text"
              label="Email Address*"
              name="email"
              placeholder="Email address"
              value={email}
              onInputChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="password"
              type="password"
              label="password*"
              name="password"
              placeholder="Password"
              value={password}
              onInputChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password*"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onInputChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
          <Button
            type="submit"
            variant="primary"
            text="Update"
            size="lg"
            className="my-3"
          />
          {loadingUpdateProfile && (
            <Row className="align-items-center justify-content-center">
              <Loader />
            </Row>
          )}
        </form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {isLoading ? (
          <Row className="align-items-center justify-content-center">
            <Loader />
          </Row>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <TableOrders orders={orders} />
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
