import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import humanizeDuration from "humanize-duration";

import { APICtx, ErrorCtx } from "../App";
import {
  FriendlyError,
} from "../api";

/**
 * Get the unix timestamp for the date.
 * @param date {Date} To convert.
 * @returns {integer}
 */
function unixTime(date) {
  return Math.floor(date.getTime() / 1000);
}

const HomePage = () => {
  const api = useContext(APICtx);
  const setError = useContext(ErrorCtx);
  
  const [deals, setDeals] = useState([]);

  const fetchDeals = async () => {
    return await api.listGameDeals();
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const now = unixTime(new Date());
  
  return (
    <>
      {deals.map((deal) => {
        const expiresDt = deal.end_date - now;
        let expiresStr = humanizeDuration(expiresDt);

        if (expiresDt < 0) {
          expiresStr = `Expired ${expiresStr} ago`;
        } else {
          expiresStr = `Expires in ${expiresStr}`;
        }

        
        return (
          <div key={deal._id}>
            <p>
              {expiresStr}
            </p>

            <p>
              <a href={deal.link}>
                Go to deal
              </a>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
