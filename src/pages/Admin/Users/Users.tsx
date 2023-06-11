import { Pagination } from "components";
import { UrlConstants } from "../../../constants";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "store";
import { deleteUsers, loadUserPaging } from "store/users/action";
import { ItemUser } from "store/users/types";
import { toast } from "react-toastify";

const Users = () => {
  const users: ItemUser[] = useSelector((state: AppState) => state.users.items);
  const totalItem = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserPaging(searchKeyword, currentPage) as any);
  }, [dispatch, currentPage, searchKeyword]);

  const handleSelectRow = (id: string) => {
    let newSelectedItems = [...selectedItem];
    selectedItem.indexOf(id) !== -1
      ? (newSelectedItems = selectedItem.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItem(newSelectedItems);
  };

  const handleDelete = () => {
    if (selectedItem) {
      dispatch(deleteUsers(selectedItem) as any);
      setSelectedItem([]);
      handleClose();
      toast.success("Xóa người dùng thành công!");
    }
  };

  const userElements = users.map((user, index) => {
    return (
      <tr
        key={`user_${user.id}`}
        className={
          "table-row" +
          (selectedItem.indexOf(user.id) !== -1 ? " selected" : "")
        }
        onClick={() => handleSelectRow(user.id)}
      >
        <td className="text-center">
          <input
            type="checkbox"
            value={`${user.id}`}
            onChange={() => handleSelectRow(user.id)}
            checked={selectedItem.indexOf(user.id) !== -1}
          ></input>
        </td>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address}</td>
        <td>{user.phone}</td>
        <td>{user.roleId === 1 ? "Admin" : "User"}</td>
        <td className="text-center">
          <Link
            to={UrlConstants.USER_EDIT + "/" + user.id}
            className="btn btn-outline-warning btn-sm col-auto align-items-center"
          >
            <span className="fa fa-pen"></span> Sửa
          </Link>
        </td>
      </tr>
    );
  });

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(loadUserPaging(searchKeyword, pageNumber) as any);
  };

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <>
      <div>
        <h1 className="h3 mb-2 text-gray-800">Danh sách người dùng</h1>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách người dùng
            </h6>
          </div>
          <div className="header-buttons row">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleKeywordPress}
              className="form-control col mr-3"
              placeholder="Từ khóa"
            />
            <Link
              to={UrlConstants.USER_ADD}
              className="btn btn-outline-success btn-sm col-auto mr-3 align-items-center d-flex"
            >
              <span className="fa fa-plus"></span> Thêm mới
            </Link>

            {selectedItem.length > 0 && (
              <>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleShow()}
                >
                  <span className="fa fa-trash"></span> Xóa
                </button>
                <button
                  className="btn btn-outline-primaty btn-sm"
                  onClick={() => setSelectedItem([])}
                >
                  <i className="fas fa-check"></i> Bỏ chọn
                </button>
              </>
            )}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>SĐT</th>
                    <th>Chức vụ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{userElements}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Pagination
              totalRecords={totalItem}
              pageLimit={5}
              pageSize={pageSize}
              onPageChanged={onPageChanged}
            ></Pagination>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show overlay" : ""}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={showModal ? "false" : "true"}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Xóa người dùng
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete()}
              >
                Xóa
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
