import { Pagination } from "components";
import { UrlConstants } from "../../../constants";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppState } from "store";
import { deleteProductBills, getBillDetail } from "store/bills/actions";
import { ItemBillDetail } from "store/bills/types";
import { toast } from "react-toastify";
import { loadProductPaging } from "store/products/action";

const DetailBill = () => {
  let id = useParams().id as string;
  const billDetailDetails: ItemBillDetail[] = useSelector(
    (state: AppState) => state.bills.billDetail
  );
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
    dispatch(getBillDetail(id, searchKeyword, currentPage) as any);
  }, [dispatch, id, currentPage, searchKeyword]);

  const products = useSelector((state: AppState) => state.products.items);

  useEffect(() => {
    dispatch(loadProductPaging("", null) as any);
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
      dispatch(deleteProductBills(selectedItem) as any);
      setSelectedItem([]);
      handleClose();
      toast.success("Xóa chi tiết hóa đơn thành công!");
    }
  };

  const handleShowNameProduct = (productId: number | string) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Không tìm thấy sản phẩm";
  };

  const billDetailElements = billDetailDetails.map((billDetail, index) => {
    return (
      <tr
        key={`billDetail_${billDetail.id}`}
        className={
          "table-row" +
          (selectedItem.indexOf(billDetail.id) !== -1 ? " selected" : "")
        }
        onClick={() => handleSelectRow(billDetail.id)}
      >
        <td className="text-center">
          <input
            type="checkbox"
            value={`${billDetail.id}`}
            onChange={() => handleSelectRow(billDetail.id)}
            checked={selectedItem.indexOf(billDetail.id) !== -1}
          ></input>
        </td>
        <td>{index + 1}</td>
        {/* <td>{billDetail.id}</td> */}
        <td>{billDetail.billId}</td>
        <td>{billDetail.productId}</td>
        <td>{handleShowNameProduct(billDetail.productId)}</td>
        <td>{billDetail.quantity}</td>
      </tr>
    );
  });

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(getBillDetail(id, searchKeyword, pageNumber) as any);
  };

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <>
      <div>
        <h1 className="h3 mb-2 text-gray-800">Danh sách chi tiết hóa đơn</h1>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách chi tiết hóa đơn
            </h6>
          </div>
          <div className="header-buttons row">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleKeywordPress}
              className="form-control col mr-3"
              placeholder="Mã sản phẩm"
            />

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
                    {/* <th>Mã chi tiết</th> */}
                    <th>Mã hóa đơn</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>{billDetailElements}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer ">
            <div className="row justify-content-between">
              <Pagination
                totalRecords={totalItem}
                pageLimit={5}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
              ></Pagination>
              <Link
                className="col-auto btn btn-primary align-self-start mr-3"
                to={UrlConstants.BILL_LIST}
              >
                <i className="fas fa-undo-alt"></i> Quay lại
              </Link>
            </div>
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
                Xóa chi tiết hóa đơn
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
                OK
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBill;
