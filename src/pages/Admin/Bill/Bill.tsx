import { Pagination } from "components";
import { UrlConstants } from "../../../constants";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "store";
import { loadBillPaging, deleteBills } from "store/bills/actions";
import { ItemBill } from "store/bills/types";
import { toast } from "react-toastify";
import { loadUserPaging } from "store/users/action";

const Bill = () => {
  const bills: ItemBill[] = useSelector((state: AppState) => state.bills.items);
  const totalItem = useSelector((state: AppState) => state.bills.total);
  const pageSize = useSelector((state: AppState) => state.bills.pageSize);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBillPaging(searchKeyword, currentPage) as any);
  }, [dispatch, currentPage, searchKeyword]);

  const users = useSelector((state: AppState) => state.users.items);

  useEffect(() => {
    dispatch(loadUserPaging("", null) as any);
  }, [dispatch]);

  const handleSelectRow = (id: string) => {
    let newSelectedItems = [...selectedItem];
    selectedItem.indexOf(id) !== -1
      ? (newSelectedItems = selectedItem.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItem(newSelectedItems);
  };

  const handleDelete = () => {
    if (selectedItem) {
      dispatch(deleteBills(selectedItem) as any);
      setSelectedItem([]);
      handleClose();
      toast.success("Xóa hóa đơn thành công!");
    }
  };

  const handleShowNameUser = (userId: number | string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Không tìm thấy";
  };

  const customDate = (dateOld: any) => {
    const dateString = dateOld;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;
    return formattedDateString;
  };

  const billElements = bills.map((bill, index) => {
    return (
      <tr
        key={`bill_${bill.id}`}
        className={
          "table-row" +
          (selectedItem.indexOf(bill.id) !== -1 ? " selected" : "")
        }
        onClick={() => handleSelectRow(bill.id)}
      >
        <td className="text-center">
          <input
            type="checkbox"
            value={`${bill.id}`}
            onChange={() => handleSelectRow(bill.id)}
            checked={selectedItem.indexOf(bill.id) !== -1}
          ></input>
        </td>
        <td>{index + 1}</td>
        <td>{bill.id}</td>
        <td>{bill.userId}</td>
        <td>{handleShowNameUser(bill.userId)}</td>
        <td>{customDate(bill.purchaseDate)}</td>
        <td>{bill.totalMoney}</td>
        <td className="text-center">
          <Link
            to={UrlConstants.BILL_DETAIL + "/" + bill.id + "/1"}
            className="btn btn-outline-primary btn-sm col-auto align-items-center"
          >
            <span className="fa fa-info-circle"></span> Chi tiết
          </Link>
        </td>
        {/* <td className="text-center">
          <Link
            to={UrlConstants.PRODUCT_TYPE_EDIT + "/" + bill.id}
            className="btn btn-outline-warning btn-sm col-auto align-items-center"
          >
            <span className="fa fa-pen"></span> Sửa
          </Link>
        </td> */}
      </tr>
    );
  });

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(loadBillPaging(searchKeyword, pageNumber) as any);
  };

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <>
      <div>
        <h1 className="h3 mb-2 text-gray-800">Danh sách hóa đơn</h1>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách hóa đơn
            </h6>
          </div>
          <div className="header-buttons row">
            <input
              type="number"
              value={searchKeyword}
              onChange={handleKeywordPress}
              className="form-control col mr-3"
              placeholder="Mã khách hàng"
              min={2}
            />
            {/* <Link
              to={UrlConstants.PRODUCT_TYPE_ADD}
              className="btn btn-outline-success btn-sm col-auto mr-3 align-items-center d-flex"
            >
              <span className="fa fa-plus"></span> Thêm mới
            </Link> */}

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
                    <th>Mã hóa đơn</th>
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Ngày mua</th>
                    <th>Tổng tiền</th>
                    <th>Chi tiết</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>{billElements}</tbody>
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
                Xóa hóa đơn
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

export default Bill;
