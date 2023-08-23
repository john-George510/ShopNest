import "./topBox.scss";
import { topDealUsers } from "../../data.ts";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods.ts";

const TopBox = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="topBox">
      <h1>New members</h1>
      <div className="list">
        {users.map((user: any) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img
                src={
                  user.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
              />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
