import "./styles.css";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";
import { SPINNER_TYPES } from "./Loading";

const Sequence = (props) => {
  const data = props.sequence.map((func, index) => ({
    idx: index,
    name: func,
  }));

  const itemsPerPage = 30;
  const [hasMore, setHasMore] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const loadMore = () => {
    if (records >= data.length) {
      setHasMore(false);
    } else {
      setRecords(records + itemsPerPage);
    }
  };

  const showItems = (funcs) => {
    var items = [];
    for (let i = 0; i < Math.min(records, data.length); i++) {
      items.push(
        <span key={funcs[i].idx}>
          <a>{`${funcs[i].name}()`}</a>
          {funcs[i].idx < data.length - 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          )}
        </span>
      );
    }
    return items;
  };

  return data.length > 0 ? (
    <div className="sequence">
      <h5>Call Sequence:</h5>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        // loader={<h4>Loading...</h4>}
        loader={<Loading type={SPINNER_TYPES.BORDER} size="1rem" />}
        useWindow={false}
      >
        {showItems(data)}
      </InfiniteScroll>
    </div>
  ) : (
    <div></div>
  );
};

export default Sequence;
