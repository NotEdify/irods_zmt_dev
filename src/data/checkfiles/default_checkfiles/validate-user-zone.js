import React from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";

export default {
  name: "Each user is in a valid zone.",
  description: `Checks if any users belong to invalid zones.`,
  minimum_server_version: "4.2.0",
  maximum_server_version: "",
  interval_in_seconds: 86400,
  active: true,
  checker: async function () {
    const result = {
      status: "",
      message: [],
      success: 0,
      failed: [],
    };

    const authToken = localStorage.getItem("zmt-token");
    let warningAboutSpecificQuery = false;
    const specificQuery =
      "SELECT USER_NAME, ZONE_NAME FROM R_USER_MAIN WHERE ZONE_NAME NOT IN (SELECT ZONE_NAME FROM R_ZONE_MAIN)";
    const params = new URLSearchParams({
      op: "execute_specific_query",
      name: specificQuery,
      count: 0, // 0 = return all results
    });
    let resultsArr = [];

    const resp = await fetch(
      `${this.httpApiLocation}/query?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(JSON.stringify(res));
      })
      .catch((err) => {
        if (!err.irods_response || err.irods_response.status_code === 400) {
          warningAboutSpecificQuery = true;
        }
        return data;
      });

    if (resp && resp.rows) {
      resultsArr = resp.rows;
      if (resultsArr.length > 0) {
        resultsArr.map((user) => {
          result.failed.push([user[0], user[1]]);
        });
      }
    } else {
      const generalQuery1 =
        "SELECT USER_NAME, USER_ZONE WHERE USER_TYPE != 'rodsgroup'";
      const params1 = new URLSearchParams({
        op: "execute_genquery",
        query: generalQuery1,
        count: 0, // 0 = return all results
        offset: 0,
      });

      const resp1 = await fetch(
        `${this.httpApiLocation}/query?${params1.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then((res) => res.json());

      const generalQuery2 = "SELECT ZONE_NAME";
      const params2 = new URLSearchParams({
        op: "execute_genquery",
        query: generalQuery2,
        count: 0, // 0 = return all results
        offset: 0,
      });

      const resp2 = await fetch(
        `${this.httpApiLocation}/query?${params2.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then((res) => res.json());

      if (resp1 && resp2) {
        resp1.rows.map((user) => {
          for (let i = 0; i < resp2.rows.length; i++) {
            if (user[1] === resp2.rows[i][0]) {
              return;
            }
          }
          result.failed.push([user[0], user[1]]);
        });
      }
    }

    result.status = result.failed.length > 0 ? "error" : "healthy";

    if (result.failed.length > 0) {
      const pushed = (
        <span key="push1">
          <span>Failed on: </span>
          {result.failed.map((failedUser, index) => (
            <span key={`userNameCheckFailed-${index}`}>
              {index !== 0 && ", "}
              <Link
                className="check_result_link"
                key={`userNameCheckFailed-${index}`}
                to={`/users?filter=${encodeURIComponent(failedUser[0])}`}
              >
                {failedUser[0]}
              </Link>{" "}
              ({failedUser[1]})
            </span>
          ))}
        </span>
      );

      result.message.push(pushed);
    } else {
      result.message.push(
        <span key="push0">All users are in valid zones</span>,
      );
    }

    if (warningAboutSpecificQuery) {
      result.message.push(
        <span key="push2">
          . Additionally, please define the specific query:{" "}
          <Chip label={specificQuery} /> manually, or by using this{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href={`/specific-query?sqlStr=${encodeURIComponent(
              specificQuery,
            )}&alias=usersInvalidZone`}
          >
            dynamically generated link
          </a>{" "}
          to get faster results.
        </span>,
      );

      if (result.status === "healthy") {
        result.status = "warning";
      }
    }

    return result;
  },
};
