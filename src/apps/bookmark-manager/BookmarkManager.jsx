import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmark, selectBookmarkList, selectStatus } from "./bookmarkSlice";

const BookmarkManager = () => {
  const [state, setState] = useState({
    isReady: false,
    items: [],
    currentPage: 0,
    totalPage: 0,
  });
  const dispatch = useDispatch();
  const bookmarkList = useSelector(selectBookmarkList);
  const status = useSelector(selectStatus);

  const bookmarkFormEle = useRef(null);

  const addNewBookmark = (e) => {
    e.preventDefault();
    bookmarkFormEle.current.openModal();
  };

  // const loadItems = (page = 1) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const items = [
  //         {
  //           title: "Google" + Math.floor(Math.random() * 10),
  //           link: "https://google.com",
  //           group: "Business",
  //         },
  //         {
  //           title: "Facebook",
  //           link: "https://facebook.com",
  //           group: "Business",
  //         },
  //         { title: "Youtube", link: "https://youtube.com", group: "Business" },
  //         {
  //           title: "JSBaseVietnam",
  //           link: "https://jsbasevietnam.com",
  //           group: "Technical",
  //         },
  //         {
  //           title: "NextJSVietnam",
  //           link: "https://nextjsvietnam.com",
  //           group: "Technical",
  //         },
  //       ];
  //       resolve({
  //         totalPage: 10,
  //         currentPage: page,
  //         items,
  //       });
  //     }, 1000);
  //   });
  // };

  const infiniteScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      state.currentPage < state.totalPage
    ) {
      // loadItems(state.currentPage + 1).then((res) => {
      //   const { totalPage, currentPage, items } = res;
      //   setState({
      //     ...state,
      //     ready: true,
      //     totalPage,
      //     currentPage,
      //     items: [...state.items, ...items],
      //   });
      // });
    }
  });

  useEffect(() => {
    console.log('Component DidMount, componentDidUpdate : only once');
    if(!bookmarkList){ // null
      dispatch(fetchBookmark());
    }
    // componentDidMount, componentDidUpdate
    // console.log("BookmarkManager componentDidMount, componentDidUpdate");
    // if (!state.ready) {

    // } else {
    //   const { scrollTop, scrollHeight, clientHeight } =
    //     document.documentElement;

    //   if (scrollHeight === clientHeight) {

    //   }
    // }

    // componentWillUnmount
    return () => {
      console.log("BookmarkManager componentWillUnmount");
      // clearInterval(intervalId);
    };
  });

  useLayoutEffect(() => {
    window.addEventListener("scroll", infiniteScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", infiniteScroll, { passive: true });
    };
  });

  return (
    <div className="container">
      <div className="row">
        <h1>Bookmark Manager</h1>
        <p>Status: {status}</p>
        {bookmarkList ? (<>
        <p>
          {bookmarkList.page}/{bookmarkList.totalPage}
        </p>
        <div className="cta d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={(e) => addNewBookmark(e)}
          >
            Add new bookmark
          </button>
        </div>
        <BookmarkForm ref={bookmarkFormEle} />
        <BookmarkList itemJSON={JSON.stringify(bookmarkList.items)}></BookmarkList>
        </>) : '' }
      </div>
    </div>
  );
};

const BookmarkList = React.memo(({ itemJSON }) => {
  console.log("list render");
  const items = JSON.parse(itemJSON);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <td scope="col" data-colname="name">
            Title
          </td>
          <td scope="col" data-colname="link">
            Link
          </td>
          <td scope="col" data-colname="group">
            Group
          </td>
          <td scope="col" data-colname="action">
            Action
          </td>
        </tr>
      </thead>

      <tbody>
        {items.map((item, idx) => (
          <BookmarkRow bookmark={item} key={idx} />
        ))}
      </tbody>
    </table>
  );
});

const BookmarkRow = (props) => {
  const { bookmark } = props;
  useEffect(() => {
    // console.log(
    //   "BookmarkRow: componentDidMount | componentDidUpdate | componentWillUnmount "
    // );
  });
  return (
    <tr>
      <td scope="row">{bookmark.title}</td>
      <td scope="row">
        <a target="_blank" href="{{ bookmark.toObject().link }}">
          {bookmark.link}
        </a>
      </td>
      <td scope="row">{bookmark.group}</td>
      <td scope="row" data-colname="action">
        <div>
          <button className="btn-icon" title="Edit">
            <span className="material-icons icon icon-warning">edit</span>
          </button>
          <button className="btn-icon" title="Delete">
            <span className="material-icons icon icon-danger">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

const BookmarkForm = forwardRef((props, ref) => {
  const [state, setState] = useState({ mode: "add", open: false });
  const _closeModal = () => {
    setState({ ...state, open: false });
  };
  const _openModal = () => {
    setState({ ...state, open: true });
  };

  useImperativeHandle(ref, () => ({
    openModal() {
      _openModal();
    },
    closeModal() {
      _closeModal();
    },
  }));

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      _closeModal();
    }
  });

  useLayoutEffect(() => {
    console.log("BookmarkForm");
    document.addEventListener("keydown", escFunction, false);
    // console.log(
    //   "BookmarkForm: componentDidMount | componentDidUpdate | componentWillUnmount "
    // );
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  const { open } = state;
  return (
    <div
      className={open ? "modal fade show" : "modal fade"}
      id="exampleModal"
      tabIndex={"-1"}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {state?.mode} Bookmark {state?.open}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => _closeModal()}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3 d-flex flex-column-reverse">
                <input
                  required
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                />
                <label htmlFor="title" className="form-label">
                  Title
                </label>
              </div>
              <div className="mb-3 d-flex flex-column-reverse">
                <input
                  required
                  name="link"
                  type="link"
                  className="form-control"
                  id="link"
                />
                <label htmlFor="link" className="form-label">
                  Link
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => _closeModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BookmarkManager;
